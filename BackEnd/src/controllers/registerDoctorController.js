import jsonwebtoken from "jsonwebtoken"; //Token
import bcryptjs from "bcryptjs"; //Encriptar
import nodemailer from "nodemailer"; //Enviar correos
import crypto from "crypto"; // Codigo aleatorio

import DoctorModel from "../models/Doctor.js";
import { config } from "../config.js";

//Array de funciones
const registerClientsController = {};

registerClientsController.register = async (req, res) => {
  const {
      name,
      specialism,
      email,
      password
  } = req.body;

  try {
    const existingClient = await DoctorModel.findOne({ email });
    if (existingClient) {
      return res.json({ message: "Doctor already exists" });
    }

    const passwordHash = await bcryptjs.hash(password, 10);

    const newClient = new DoctorModel({
      name,
      specialism,
      email,
      password: passwordHash
    });

    await newClient.save();

    const verificationCode = crypto.randomBytes(3).toString("hex");

    const tokenCode = jsonwebtoken.sign(
      { email, verificationCode },
      config.JWT.secret,
      { expiresIn: "2h" }
    );

    res.cookie("verificationToken", tokenCode, { maxAge: 2 * 60 * 60 * 1000 });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: config.emailUser.user_email, // antes: email_user ❌
          pass: config.emailUser.user_pass,  // antes: email_pass ❌
        },
      });
      console.log("EMAIL:", config.emailUser.user_email);
      console.log("PASS:", config.emailUser.user_pass);
    const mailOptions = {
      from: config.emailUser.email_user,
      to: email,
      subject: "Verificación de correo",
      text:
        "Para verificar tu cuenta, utiliza el siguiente codigo: " +
        verificationCode +
        "\n expira en dos horas",
    };

      await transporter.sendMail(mailOptions);
      res.json({
        message: "Doctor registered, Please verify your email with the code sent",
      });
  } catch (error) {
    console.log("error" + error);
  }
};

registerClientsController.verifyCodeEmail = async (req, res) => {
  const { requireCode } = req.body;

  const token = req.cookies.verificationToken;

  try {
    const decoded = jsonwebtoken.verify(token, config.JWT.secret);
    const { email, verificationCode: storedCode } = decoded;

    if (requireCode !== storedCode) {
      return res.json({ message: "Invalid code" });
    }
    await DoctorModel.updateOne({ email }, { verified: true });

    res.clearCookie("verificationToken");

    res.json({ message: "Email verified Successfuly" });
  } catch (error) {
    console.log("error" + error);
  }
};

export default registerClientsController;