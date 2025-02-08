import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: `"Your Name" <${process.env.EMAIL_USER}>`, // Sender's email
      to, // Recipient's email
      subject, // Email subject
      text, // Email body (plain text)
    });
    console.log(`✅ Email sent: ${info.messageId}`);
  } catch (error) {
    console.error(`❌ Error sending email: ${error}`);
  }
};
