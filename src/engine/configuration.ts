import type { MissionConfiguration } from "../domain/types";

/**
 * Select a new orbit.
 *
 * @param config - Current mission configuration.
 * @param orbitId - ID of the orbit to select.
 * @param validOrbitIds - IDs that may be selected.
 * @returns A new mission configuration.
 * @throws RangeError if the orbit ID is invalid.
 */
export function selectOrbit(
    config: MissionConfiguration,
    orbitId: string,
    validOrbitIds: readonly string[]
): MissionConfiguration {

    // Check whether the requested orbit is allowed.
    if (!validOrbitIds.includes(orbitId)) {
        throw new RangeError(`Invalid orbit ID: ${orbitId}`);
    }

    // Copy the existing configuration and replace only the orbit.
    return {
        ...config,
        selectedOrbitId: orbitId
    };
}

/**
 * Select a new launch option.
 *
 * @param config - Current mission configuration.
 * @param launchId - ID of the launch option to select.
 * @param validLaunchIds - IDs that may be selected.
 * @returns A new mission configuration.
 * @throws RangeError if the launch ID is invalid.
 */
export function selectLaunch(
    config: MissionConfiguration,
    launchId: string,
    validLaunchIds: readonly string[]
): MissionConfiguration {

    // Check whether the requested launch is allowed.
    if (!validLaunchIds.includes(launchId)) {
        throw new RangeError(`Invalid launch ID: ${launchId}`);
    }

    // Copy the existing configuration and replace only the launch.
    return {
        ...config,
        selectedLaunchOptionId: launchId
    };
}
