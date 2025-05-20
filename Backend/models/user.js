import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      Minlength: 4,
      Maxlength: 20,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password is not strong");
        }
      },
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Invalid Data");
        }
      },
    },
    photoUrl: {
      type: String,
      default: "https://www.w3schools.com/howto/img_avatar.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL");
        }
      },
    },
    about: {
      type: String,
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

UserSchema.methods.getJWT = function () {
  const user = this;
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

UserSchema.methods.validatePassword = function (password) {
  const user = this;
  const isMatch = bcrypt.compare(password, user.password);
  return isMatch;
};
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
