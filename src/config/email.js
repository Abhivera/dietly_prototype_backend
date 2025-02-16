import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter with exact Brevo configuration
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: '84fe15001@smtp-brevo.com', // This must match exactly
        pass: process.env.EMAIL_PASS // Your Master Password from Brevo
    },
    debug: true,
    logger: true
});

export const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: '"Fitness App" <84fe15001@smtp-brevo.com>', // Must match the SMTP login
            to,
            subject,
            text,
            headers: {
                'X-Mailin-Tag': 'fitness-app-notification'
            }
        };

        console.log('📧 Attempting to send email:', {
            to,
            subject,
            textLength: text.length
        });

        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Email sent successfully:', {
            messageId: info.messageId,
            response: info.response,
            accepted: info.accepted,
            rejected: info.rejected
        });

        return info;
    } catch (error) {
        console.error('❌ Error sending email:', {
            error: error.message,
            code: error.code,
            command: error.command,
            response: error.response
        });
        throw error;
    }
};