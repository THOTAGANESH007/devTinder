import UserModel from "../models/user.js";

export const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, age } = req.body;
  if (!firstName || !lastName || !email || !password || !age) {
    return res.status(400).json({
      message: "Please fill all the fields",
    });
  }
  try {
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password,
      age,
    });
    return res.status(201).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
