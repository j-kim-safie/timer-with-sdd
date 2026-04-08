import { describe, it, expect } from 'vitest';
import { formatTime } from './app.js';

describe('formatTime', () => {
  it('formats a normal time with zero-padding', () => {
    const date = new Date(2026, 0, 1, 1, 2, 3);
    expect(formatTime(date)).toBe('01:02:03');
  });

  it('formats midnight as 00:00:00', () => {
    const date = new Date(2026, 0, 1, 0, 0, 0);
    expect(formatTime(date)).toBe('00:00:00');
  });

  it('formats afternoon time correctly', () => {
    const date = new Date(2026, 0, 1, 14, 30, 59);
    expect(formatTime(date)).toBe('14:30:59');
  });

  it('formats 23:59:59 correctly', () => {
    const date = new Date(2026, 0, 1, 23, 59, 59);
    expect(formatTime(date)).toBe('23:59:59');
  });
});
