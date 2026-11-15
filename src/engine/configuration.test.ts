import { describe, expect, it } from 'vitest'
import type { MissionConfiguration } from '../domain/types.ts'
import {
    addComponentSelection,
    removeComponentSelection,
} from './configuration'

const VALID_IDS = ['comp-a', 'comp-b', 'comp-c']

function createBaseConfig(
    selectedComponentIds: string[] = ['comp-a'],
): MissionConfiguration {
    return {
        missionId: 'mission-earth-obs',
        selectedComponentIds,
        selectedOrbitId: 'orbit-leo',
        selectedLaunchOptionId: 'launch-small',
    }
}

describe('component selection helpers', () => {
    it('adds a valid component ID immutably', () => {
        const original = createBaseConfig(['comp-a'])
        const updated = addComponentSelection(original, 'comp-b', VALID_IDS)

        expect(updated.selectedComponentIds).toEqual(['comp-a', 'comp-b'])
        expect(original.selectedComponentIds).toEqual(['comp-a'])
        expect(updated).not.toBe(original)
        expect(updated.selectedComponentIds).not.toBe(original.selectedComponentIds)
    })

    it('allows valid duplicate component IDs as multiple copies', () => {
        const original = createBaseConfig(['comp-a'])
        const updated = addComponentSelection(original, 'comp-a', VALID_IDS)

        expect(updated.selectedComponentIds).toEqual(['comp-a', 'comp-a'])
        expect(original.selectedComponentIds).toEqual(['comp-a'])
    })

    it('removes only one copy of a component ID immutably', () => {
        const original = createBaseConfig(['comp-a', 'comp-a', 'comp-b'])
        const updated = removeComponentSelection(original, 'comp-a', VALID_IDS)

        expect(updated.selectedComponentIds).toEqual(['comp-a', 'comp-b'])
        expect(original.selectedComponentIds).toEqual(['comp-a', 'comp-a', 'comp-b'])
        expect(updated).not.toBe(original)
    })

    it('throws on unknown or empty component IDs without mutating input', () => {
        const original = createBaseConfig(['comp-a'])

        expect(() =>
            addComponentSelection(original, 'comp-unknown', VALID_IDS),
        ).toThrow(/Unknown component ID/)
        expect(() =>
            removeComponentSelection(original, 'comp-unknown', VALID_IDS),
        ).toThrow(/Unknown component ID/)
        expect(() =>
            removeComponentSelection(original, 'comp-b', VALID_IDS),
        ).toThrow(/not currently selected/)

        expect(original.selectedComponentIds).toEqual(['comp-a'])
    })
})