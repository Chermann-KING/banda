export interface PasswordCriteria {
  readonly minLength: boolean;
  readonly lowercase: boolean;
  readonly uppercase: boolean;
  readonly digit: boolean;
  readonly symbol: boolean;
}

export interface PasswordStrength {
  /** 0 (vide/très faible) → 4 (fort). */
  readonly score: 0 | 1 | 2 | 3 | 4;
  readonly criteria: PasswordCriteria;
}

export const PASSWORD_MIN_LENGTH = 8;

export function evaluatePasswordStrength(
  password: string,
  minLength: number = PASSWORD_MIN_LENGTH,
): PasswordStrength {
  const criteria: PasswordCriteria = {
    minLength: password.length >= minLength,
    lowercase: /\p{Ll}/u.test(password),
    uppercase: /\p{Lu}/u.test(password),
    digit: /\d/.test(password),
    symbol: /[^\p{L}\p{N}\s]/u.test(password),
  };

  const satisfied = Object.values(criteria).filter(Boolean).length;
  const score = password.length === 0 ? 0 : Math.max(1, Math.min(4, satisfied - 1)) as 1 | 2 | 3 | 4;
  return { score: password.length === 0 ? 0 : score, criteria };
}
