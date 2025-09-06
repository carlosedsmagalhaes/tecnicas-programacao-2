import * as dotenv from "dotenv";
import nodemailer from "nodemailer";
import Dado from "../interfaces/IDados";

dotenv.config();

const sendEmail = async (dados: Dado[]) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  for (const e of dados) {
    try {
      const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: e.email,
        subject: "PARABÉNS",
        html: e.arquivoHTML,
        attachments: [
          {
            filename: "logo.png",
            path: "./docs/imagens/logo.png",
            cid: "logo",
          },
          {
            filename: "assinatura.png",
            path: "./docs/imagens/assinatura.png",
            cid: "assinatura",
          }
        ],
      });

      console.log(`Mensagem enviada para ${e.email}`);
      console.log("Message ID:", info.messageId);
    } catch (error: any) {
      console.error(`Erro ao enviar e-mail para ${e.email}:`, error.message);
    }
  }

  transporter.close();
};

export default sendEmail;
