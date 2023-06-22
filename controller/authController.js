import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderSchema.js";
import JWT from "jsonwebtoken";

// order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "error get order list",
      error,
    });
  }
};

// order list admin
export const orderListAdminController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "error get order list",
      error,
    });
  }
};

// order list
export const orderListController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "error get order list",
      error,
    });
  }
};

// register
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    // validation
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }

    //check user
    const existinguser = await userModel.findOne({ email });
    //existing user
    if (existinguser) {
      return res.status(200).send({
        succes: false,
        message: "Email already register ,please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    // save
    const user = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();
    res.status(201).send({
      succes: true,
      message: "User Sukses registrasi",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "error registration",
      error,
    });
  }
};

// POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(404).send({
        succes: false,
        message: "invalid email or password",
      });
    }
    // cek user
    const user = await userModel.findOne({ email });
    if (!email) {
      return res.status(404).send({
        succes: false,
        message: "email is not registred",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        succes: false,
        message: "invalid password",
      });
    }
    //  token
    const token = await JWT.sign({ _id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      succes: true,
      message: "Login Berhasil",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        test: user._id,
        address: user.address,
        role: user.role,
        password: user.password,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: true,
      message: "Error Login",
      error,
    });
  }
};

//forgot password
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is Required" });
    }
    if (!answer) {
      res.status(400).send({ message: "Answer is Required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is Required" });
    }

    // check
    const user = await userModel.findOne({ email, answer });
    // conditions
    if (!user) {
      return res.status(404).send({
        succes: false,
        message: "Wrong Email or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      succes: true,
      message: "Sukses reset password",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      succes: false,
      message: "Something went wrong",
      error,
    });
  }
};

// testController
export const testController = (req, res) => {
  res.send("protected route");
};

// admin acces
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        succes: false,
        message: "unauthorized acces",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      succes: false,
      error,
      message: "error admin middleware ",
    });
  }
};

export const isUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role === 1) {
      return res.status(401).send({
        succes: false,
        messaage: "Youre Admin Only",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      succes: false,
      error,
      message: "error admin middleware ",
    });
  }
};

export const editProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    // password
    const hasheddPassword = password ? await hashPassword(password) : undefined;
    if (password && password.length < 8) {
      return res.json({ error: "Password required, and min 8 character" });
    }
    const updateUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hasheddPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messaage: "Sukses",
      updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      succes: false,
      error,
      message: "error update profile ",
    });
  }
};
