import type { MissionConfiguration } from "../domain/types";
/**
 * Updates the selected orbit.
 *
 * @param config - Current mission configuration.
 * @param orbitId - ID of the requested orbit.
 * @param allowedOrbitIds - Orbit IDs permitted for selection.
 * @returns New mission configuration with the selected orbit.
 * @throws RangeError when the orbit ID is not allowed.
 */
export function selectOrbit(
    config: MissionConfiguration,
    orbitId: string,
    allowedOrbitIds: readonly string[]
): MissionConfiguration {

    // Validate the requested orbit ID.
    if (!allowedOrbitIds.includes(orbitId)) {
        throw new RangeError(`Invalid orbit ID: ${orbitId}`);
    }

    // Return a new configuration without modifying the original.
    return {
        ...config,
        selectedComponentIds: [...config.selectedComponentIds],
        selectedOrbitId: orbitId
    };
}

/**
 * Updates the selected launch option.
 *
 * @param config - Current mission configuration.
 * @param launchId - ID of the requested launch option.
 * @param allowedLaunchIds - Launch IDs permitted for selection.
 * @returns New mission configuration with the selected launch.
 * @throws RangeError when the launch ID is not allowed.
 */
export function selectLaunch(
    config: MissionConfiguration,
    launchId: string,
    allowedLaunchIds: readonly string[]
): MissionConfiguration {

    // Validate the requested launch ID.
    if (!allowedLaunchIds.includes(launchId)) {
        throw new RangeError(`Invalid launch ID: ${launchId}`);
    }

    // Return a new configuration without modifying the original.
    return {
        ...config,
        selectedComponentIds: [...config.selectedComponentIds],
        selectedLaunchOptionId: launchId
    };
}
