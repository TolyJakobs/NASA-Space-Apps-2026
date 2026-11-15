// Update path if MissionConfiguration is in a specific file, e.g. '../domain/mission'
import type { MissionConfiguration } from '../domain/types.ts'

/**
 * Assumptions (Issue #21):
 * 1. Duplicate IDs: Per MissionConfiguration, repeated IDs represent multiple copies
 *    of a component. Adding a valid duplicate ID appends another copy; removing an ID
 *    removes a single copy (the first matching occurrence).
 * 2. Unknown / unselected IDs: Component IDs must exist in `validComponentIds`
 *    (such as `mission.componentIds`). Unknown, empty, or unselected IDs throw an
 *    Error rather than silently mutating state or ignoring invalid operations.
 */

function toIdSet(validComponentIds: Iterable<string>): Set<string> {
    return validComponentIds instanceof Set
        ? validComponentIds
        : new Set(validComponentIds)
}

/**
 * Returns a new MissionConfiguration with `componentId` appended to `selectedComponentIds`.
 * Leaves the input configuration and its `selectedComponentIds` array unchanged.
 */
export function addComponentSelection(
    configuration: MissionConfiguration,
    componentId: string,
    validComponentIds: Iterable<string>,
): MissionConfiguration {
    const validIds = toIdSet(validComponentIds)

    if (!componentId || !validIds.has(componentId)) {
        throw new Error(`Unknown component ID: "${componentId}"`)
    }

    return {
        ...configuration,
        selectedComponentIds: [...configuration.selectedComponentIds, componentId],
    }
}

/**
 * Returns a new MissionConfiguration with one occurrence of `componentId` removed
 * from `selectedComponentIds`. Leaves the input configuration unchanged.
 */
export function removeComponentSelection(
    configuration: MissionConfiguration,
    componentId: string,
    validComponentIds: Iterable<string>,
): MissionConfiguration {
    const validIds = toIdSet(validComponentIds)

    if (!componentId || !validIds.has(componentId)) {
        throw new Error(`Unknown component ID: "${componentId}"`)
    }

    const removeIndex = configuration.selectedComponentIds.indexOf(componentId)
    if (removeIndex === -1) {
        throw new Error(`Component ID is not currently selected: "${componentId}"`)
    }

    return {
        ...configuration,
        selectedComponentIds: [
            ...configuration.selectedComponentIds.slice(0, removeIndex),
            ...configuration.selectedComponentIds.slice(removeIndex + 1),
        ],
    }
}