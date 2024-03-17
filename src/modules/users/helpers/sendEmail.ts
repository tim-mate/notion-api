import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

import { COMPANY_EMAIL } from "../constants";

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

dotenv.config();
const { SENDGRID_API_KEY } = process.env;
if (!SENDGRID_API_KEY) {
  console.error("Please provide SENDGRID_API_KEY in the environment variables");
  process.exit(1);
}

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendEmail = async (data: EmailData): Promise<boolean> => {
  const email = { ...data, from: COMPANY_EMAIL };
  await sgMail.send(email);
  return true;
};
