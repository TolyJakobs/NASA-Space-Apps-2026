import { describe, it, expect } from 'vitest';

describe('smoke test', () => {
    it('verifies that Vitest runs and passes a basic check', () => {
        expect(2 + 2).toBe(4);
    });
});