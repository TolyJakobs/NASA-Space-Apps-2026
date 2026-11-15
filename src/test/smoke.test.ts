import { describe, it, expect } from 'vitest';
import type { MissionConfiguration } from "../domain/types";
import { resetConfiguration } from "../engine/configuration";

describe('smoke test', () => {
    it('verifies that Vitest runs and passes a basic check', () => {
        expect(2 + 2).toBe(4);
    });
});

it("M3-05: resets edited configuration without shared references", () => {

    // Test factory representing the M3-01 default contract.
    function makeDefaults(): MissionConfiguration {
        return {
            missionId: "mission-default",
            selectedComponentIds: [
                "instrument-default",
                "panel-default"
            ],
            selectedOrbitId: "orbit-default",
            selectedLaunchOptionId: "launch-default"
        };
    }

    const defaults = makeDefaults();

    // Simulate changes to all three selections.
    let current: MissionConfiguration = {
        ...defaults,
        selectedComponentIds: ["instrument-changed"],
        selectedOrbitId: "orbit-changed",
        selectedLaunchOptionId: "launch-changed"
    };

    const edited = current;

    // Reset using the default factory.
    current = resetConfiguration(() => defaults);

    // Compare with a newly generated default.
    const freshDefault = makeDefaults();

    expect(current).toEqual(freshDefault);

    // Confirm independent object references.
    expect(current).not.toBe(edited);
    expect(current).not.toBe(defaults);

    // Confirm independent component arrays.
    expect(current.selectedComponentIds)
        .not.toBe(edited.selectedComponentIds);

    expect(current.selectedComponentIds)
        .not.toBe(defaults.selectedComponentIds);

    // Check that changing reset state does not affect defaults.
    current.selectedComponentIds.push("extra-component");

    expect(defaults).toEqual(freshDefault);
    expect(edited.selectedOrbitId).toBe("orbit-changed");
    expect(edited.selectedLaunchOptionId).toBe("launch-changed");
});


