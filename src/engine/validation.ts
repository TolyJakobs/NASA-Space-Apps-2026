import type {
    MissionConfiguration,
    ValidationIssue
} from "../domain/types";

// Every catalog item must have an ID.
// Other catalog properties are not needed for completeness checks.
type CatalogItem = {
    readonly id: string;
};

export interface ConfigurationCatalogs {
    missions: readonly CatalogItem[];
    components: readonly CatalogItem[];
    orbits: readonly CatalogItem[];
    launches: readonly CatalogItem[];
}

export function validateConfigurationCompleteness(
    configuration: Partial<MissionConfiguration> | null | undefined,
    catalogs: ConfigurationCatalogs
): ValidationIssue[] {

    const issues: ValidationIssue[] = [];

    // Validate one required catalog ID.
    function checkId(
        value: unknown,
        available: readonly CatalogItem[],
        field: string,
        label: string,
        code: string
    ): void {

        // Missing or empty selection.
        if (
            typeof value !== "string" ||
            value.trim().length === 0
        ) {
            issues.push({
                code: `MISSING_${code}`,
                severity: "error",
                field,
                message:
                    `Missing ${label}. Select a ${label} ` +
                    "from the available options."
            });

            return;
        }

        // Selection does not exist in the catalog.
        if (!available.some(item => item.id === value)) {
            issues.push({
                code: `UNKNOWN_${code}`,
                severity: "error",
                field,
                message:
                    `Unknown ${label} ID "${value}". ` +
                    `Select a ${label} from the available options.`
            });
        }
    }

    // 1. Validate mission.
    checkId(
        configuration?.missionId,
        catalogs.missions,
        "missionId",
        "mission",
        "MISSION_ID"
    );

    // 2. Validate selected components.
    const selectedComponentIds =
        configuration?.selectedComponentIds;

    if (
        !Array.isArray(selectedComponentIds) ||
        selectedComponentIds.length === 0
    ) {
        issues.push({
            code: "MISSING_COMPONENT_SELECTION",
            severity: "error",
            field: "selectedComponentIds",
            message:
                "No components selected. " +
                "Select at least one component."
        });
    } else {

        selectedComponentIds.forEach((componentId, index) => {
            checkId(
                componentId,
                catalogs.components,
                `selectedComponentIds[${index}]`,
                "component",
                "COMPONENT_ID"
            );
        });
    }

    // 3. Validate orbit.
    checkId(
        configuration?.selectedOrbitId,
        catalogs.orbits,
        "selectedOrbitId",
        "orbit",
        "ORBIT_ID"
    );

    // 4. Validate launch option.
    checkId(
        configuration?.selectedLaunchOptionId,
        catalogs.launches,
        "selectedLaunchOptionId",
        "launch option",
        "LAUNCH_OPTION_ID"
    );

    return issues;
}
