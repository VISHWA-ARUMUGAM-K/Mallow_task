const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export function validateEmail(email) {
  if (!emailPattern.test(email)) {
    return "Email must be in correct format";
  }
  return true;
}

export const passwordValidation = (password) => {
  const validations = [
    { rule: /.{8,}/, message: "Password must be at least 8 characters" },
    { rule: /.{1,20}/, message: "Password must not exceed 20 characters" },
    {
      rule: /(?=.*[A-Z])/,
      message: "Password must contain at least one uppercase letter",
    },
    {
      rule: /(?=.*[a-z])/,
      message: "Password must contain at least one lowercase letter",
    },
  ];

  for (const validation of validations) {
    if (!validation.rule.test(password)) {
      return validation.message;
    }
  }

  return true;
};
