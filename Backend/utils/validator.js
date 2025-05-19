import validator from "validator";

export const validateSignUp = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || firstName.length < 4 || firstName.length > 20) {
    throw new Error("First name must be between 4 and 20 characters");
  }
  if (lastName && lastName.length < 4) {
    throw new Error("Last name must be at least 4 characters");
  }
  if (!email || !validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
  if (!password || !validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }
};
