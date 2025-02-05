import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (to, subject, text) => {
  try {
    const msg = {
      to,
      from: process.env.EMAIL_FROM, // Your verified SendGrid sender email
      subject,
      text,
    };

    await sgMail.send(msg);
    console.log(`📩 Email sent to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error.response?.body || error);
  }
};
