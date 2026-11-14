import { describe, expect, it } from 'vitest'
import { isFiniteNonnegative } from '../engine/numericValidation'

describe('isFiniteNonnegative', () => {
  it.each([0, 42.5])('accepts finite nonnegative value %s', (value) => {
    expect(isFiniteNonnegative(value)).toBe(true)
  })

  it('rejects a negative value', () => {
    expect(isFiniteNonnegative(-0.01)).toBe(false)
  })

  it('rejects NaN', () => {
    expect(isFiniteNonnegative(Number.NaN)).toBe(false)
  })

  it.each([Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY])(
    'rejects infinite value %s',
    (value) => {
      expect(isFiniteNonnegative(value)).toBe(false)
    },
  )
})
