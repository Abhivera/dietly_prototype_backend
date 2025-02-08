import cron from "node-cron";
import { sendEmail } from "../config/email.js";

// Define email recipients
const recipients = ["abhijitakadeveloper@gmail.com"];

// Schedule the cron job to run at 12:45 AM every day
cron.schedule("45 0 * * *", () => {
  console.log("⏳ Running cron job: Sending daily email at 12:45 AM ist...");
  recipients.forEach((email) => {
    sendEmail(email, "Daily Reminder", "This is your daily scheduled email!");
  });
});

console.log("✅ Cron job scheduled for 9:38 AM daily.");
