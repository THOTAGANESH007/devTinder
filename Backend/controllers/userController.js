import UserModel from "../models/user.js";
import { validateSignUp } from "../utils/validator.js";
import bcrypt from "bcrypt";
export const registerUser = async (req, res) => {
  try {
    validateSignUp(req);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  const { firstName, lastName, email, password, age } = req.body;
  if (!firstName || !email || !password) {
    return res.status(400).json({
      message: "Please fill all the fields",
    });
  }
  const alreadyExists = await UserModel.findOne({ email });
  if (alreadyExists) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
      age,
    });
    return res.status(201).json({
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please fill all the fields",
    });
  }
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const isPasswordValid = await user.validatePassword(password);
    //console.log(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Credentials are invalid",
      });
    }
    const token = await user.getJWT();
    res.cookie("token", token, {
      expires: new Date(Date.now() + 3600 * 10 * 1000),
    });
    return res.status(200).json({
      message: "User logged in successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  const userId = req.params?.userId;
  const isUserExist = await UserModel.findById(userId);
  if (!isUserExist) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "age",
      "skills",
      "gender",
      "photoUrl",
      "about",
    ];
    const updateFields = Object.keys(data);
    const invalidFields = updateFields.filter(
      (field) => !ALLOWED_UPDATES.includes(field)
    );

    if (invalidFields.length > 0) {
      return res.status(400).json({
        message: "Invalid fields provided",
        invalidFields: invalidFields,
      });
    }

    if (
      "skills" in data &&
      Array.isArray(data.skills) &&
      data.skills.length > 10
    ) {
      return res.status(400).json({
        message: "Skills should be less than 10",
      });
    }
    const updates = {};
    ALLOWED_UPDATES.forEach((update) => {
      updates[update] = req.body[update];
    });
    const user = await UserModel.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    return res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};
