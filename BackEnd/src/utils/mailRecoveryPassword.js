import nodemailer from "nodemailer";
import { config } from "../config.js";

// Configurar el transporter => ¿quién lo envía?
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: config.emailUser.user_email,
    pass: config.emailUser.user_pass,
  },
});

// ¿A quién le voy a mandar el correo?
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: '"Soporte EPA" <ricardo.mayorga.ck@gmail.com>',
      to,
      subject,
      text,
      html,
    });

    return info;
  } catch (error) {
    console.log("Error: " + error);
  }
};

// Función para generar el HTML del correo de recuperación de contraseña con mejor diseño
const HTMLRecoveryEmail = (code) => {
  return `
      <div style="font-family: Arial, sans-serif; text-align: center; background-color: #f4f4f9; padding: 20px; border-radius: 10px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <h1 style="color: #2c3e50; font-size: 24px;">Recuperación de Contraseña</h1>
        <p style="font-size: 16px; color: #555; line-height: 1.5;">
          Hola, hemos recibido una solicitud para restablecer tu contraseña. Usa el siguiente código de verificación para proceder:
        </p>
        <div style="display: inline-block; padding: 15px; margin: 20px 0; font-size: 18px; font-weight: bold; color: #fff; background: linear-gradient(to right, #ff7f50, #ff6347); border-radius: 5px;">
          ${code}
        </div>
        <p style="font-size: 14px; color: #777; line-height: 1.5;">
          Este código es válido por los próximos <strong>15 minutos</strong>. Si no solicitaste este correo, puedes ignorarlo.
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <footer style="font-size: 12px; color: #aaa;">
          Si necesitas más ayuda, contáctanos en 
          <a href="mailto:soporte@example.com" style="color: #3498db; text-decoration: none;">soporte@example.com</a>.
        </footer>
      </div>
    `;
};

export { sendEmail, HTMLRecoveryEmail };