import { describe, expect, it } from 'vitest';
import { isThemePreference, resolveTheme } from './theme';

describe('resolveTheme', () => {
  it('suit le système quand la préférence est "system"', () => {
    expect(resolveTheme('system', true)).toBe('dark');
    expect(resolveTheme('system', false)).toBe('light');
  });

  it('respecte une préférence explicite quel que soit le système', () => {
    expect(resolveTheme('dark', false)).toBe('dark');
    expect(resolveTheme('light', true)).toBe('light');
  });
});

describe('isThemePreference', () => {
  it('valide uniquement les valeurs connues', () => {
    expect(isThemePreference('dark')).toBe(true);
    expect(isThemePreference('system')).toBe(true);
    expect(isThemePreference('sepia')).toBe(false);
    expect(isThemePreference(null)).toBe(false);
  });
});
