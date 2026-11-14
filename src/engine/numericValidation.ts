/** Returns whether a value satisfies the shared finite, nonnegative numeric convention. */
export function isFiniteNonnegative(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
}
