import cron from "node-cron";
import { sendEmail } from "../config/email.js";

// Define email recipients
const recipients = ["abhijitakadeveloper@gmail.com"];

// Schedule the cron job to run at 9:38 AM every day
cron.schedule("38 9 * * *", () => {
  console.log("⏳ Running cron job: Sending daily email at 9:38 AM...");
  recipients.forEach((email) => {
    sendEmail(email, "Daily Reminder", "This is your daily scheduled email!");
  });
});

console.log("✅ Cron job scheduled for 9:38 AM daily.");
