import cron from "node-cron";
import { sendEmail } from "../config/email.js";

// Define email recipients
const recipients = ["moviesabhijit@gmail.com"]; 

// Helper function to validate email
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Test email sending immediately on startup
console.log('🧪 Running test email...');
try {
    await sendEmail(
        "moviesabhijit@gmail.com", // Must be an authorized recipient
        "Test Email",
        "This is a test email to verify the Mailgun configuration."
    );
    console.log('✅ Test email sent successfully');
} catch (error) {
    console.error('❌ Test email failed:', error);
}

// Helper function to send email with error handling
async function sendDailyEmail(recipient) {
    try {
        if (!isValidEmail(recipient)) {
            throw new Error(`Invalid email format: ${recipient}`);
        }

        const subject = "Daily Fitness Reminder";
        const message = `
            Hello!
            
            This is your daily reminder to track your fitness goals.
            Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            
            Best regards,
            Your Fitness App Team
        `;

        const result = await sendEmail(recipient, subject, message);
        return result;
    } catch (error) {
        console.error(`❌ Failed to send email to ${recipient}:`, error);
        throw error;
    }
}

// For 6:03 PM IST, we need minutes=03, hours=18 in IST
const cronSchedule = "3 18 * * *";

// Validate cron expression
if (!cron.validate(cronSchedule)) {
    console.error("❌ Invalid cron schedule expression");
    process.exit(1);
}

const emailJob = cron.schedule(cronSchedule, async () => {
    const currentTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    console.log(`⏳ Running cron job at ${currentTime}`);
    
    try {
        const results = await Promise.allSettled(
            recipients.map(recipient => sendDailyEmail(recipient))
        );
        
        // Log results for each recipient
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`✅ Email sent successfully to ${recipients[index]}`);
            } else {
                console.error(`❌ Failed to send email to ${recipients[index]}:`, result.reason);
            }
        });
        
    } catch (error) {
        console.error("❌ Daily email job failed:", error);
    }
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});

emailJob.start();

console.log(`✅ Cron job scheduled for 6:03 PM IST daily (${cronSchedule})`);

// Export the job for potential manipulation
export default emailJob;