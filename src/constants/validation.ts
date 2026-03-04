// Validation rules and regex patterns

export const VALIDATION_RULES = {
  NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z\s'-]+$/,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    // At least one uppercase, one lowercase, one number
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  },
  SEARCH: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 100,
  },
} as const

export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL_INVALID: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} characters`,
  PASSWORD_INVALID: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  NAME_TOO_SHORT: `Name must be at least ${VALIDATION_RULES.NAME.MIN_LENGTH} characters`,
  NAME_TOO_LONG: `Name must be less than ${VALIDATION_RULES.NAME.MAX_LENGTH} characters`,
  NAME_INVALID: 'Name can only contain letters, spaces, hyphens, and apostrophes',
} as const
