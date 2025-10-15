// Simple email validation (regex based)
export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Password validation (example: at least 8 chars, one uppercase, one number, one special char)
export function validatePassword(password) {
  const lengthValid = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    isValid: lengthValid && hasUpper && hasNumber && hasSpecial,
    lengthValid,
    hasUpper,
    hasNumber,
    hasSpecial,
  };
}

// Block disposable email domains
const disposableDomains = [
  "mailinator.com",
  "tempmail.com",
  "10minutemail.com",
  "guerrillamail.com",
  "yopmail.com",
];

export function isDisposableEmail(email) {
  const domain = email.split("@")[1]?.toLowerCase();
  return disposableDomains.includes(domain);
}
