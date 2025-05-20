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

export const validateProfile = (req) => {
  const { firstName, lastName, age, about, skills, photoUrl } = req.body;
  const ALLOWED_UPDATES = [
    "firstName",
    "lastName",
    "age",
    "skills",
    "about",
    "photoUrl",
  ];
  const updateFields = Object.keys(req.body);
  const invalidFields = updateFields.filter(
    (field) => !ALLOWED_UPDATES.includes(field)
  );
  if (invalidFields.length > 0) {
    throw new Error("Invalid fields provided");
  }
  if (firstName && firstName.length < 4) {
    throw new Error("First name must be at least 4 characters");
  }
  if (lastName && lastName.length < 4) {
    throw new Error("Last name must be at least 4 characters");
  }
  if (about && about.length < 10) {
    throw new Error("About must be at least 10 characters");
  }
  if (skills && !Array.isArray(skills) && skills.length > 10) {
    throw new Error("Skills must be an array and contain at most 10 items");
  }
};
export const validatePassword = (req) => {
  const { password, confirmPassword } = req.body;
  if (!password || !confirmPassword) {
    throw new Error("Please fill all the fields");
  }
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    );
  }
};
