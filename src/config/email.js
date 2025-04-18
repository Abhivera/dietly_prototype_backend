import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter with Mailgun configuration
const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAILGUN_USER, // Your Mailgun SMTP credentials
        pass: process.env.MAILGUN_PASSWORD // Your Mailgun SMTP password
    },
    debug: true,
    logger: true
});

export const sendEmail = async (to, subject, text) => {
    try {
        // Check if recipient is in authorized list for sandbox domain
        if (!isAuthorizedRecipient(to)) {
            console.warn(`⚠️ Warning: ${to} is not an authorized recipient for sandbox domain. Email may not be delivered.`);
        }

        const mailOptions = {
            from: `"Fitness App" <${process.env.MAILGUN_FROM}>`,
            to,
            subject,
            text,
            headers: {
                'X-Service-Tag': 'fitness-app-notification'
            }
        };

        console.log('📧 Attempting to send email via Mailgun:', {
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
        console.error('❌ Error sending email via Mailgun:', {
            error: error.message,
            code: error.code,
            command: error.command,
            response: error.response
        });
        throw error;
    }
};

// Helper function to check if recipient is authorized (for sandbox domains)
function isAuthorizedRecipient(email) {
    // Currently you have only one authorized recipient
    const authorizedRecipients = ['moviesabhijit@gmail.com'];
    return authorizedRecipients.includes(email);
}