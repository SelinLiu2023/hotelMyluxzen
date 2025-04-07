// Zahra - utils/emailService.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Base URL nach Umgebung
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://myluxzen.com"
    : "http://localhost:5173";

// GmailTransporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Hauptfunktion zum Versenden von E-Mails
export const sendEmailToClient = async ({ to, subject, text, bookingLink = null }) => {
  // Link zum Kundenkonto 
  const accountLink = `
    <p style="margin-top: 20px;">
      <a href="${BASE_URL}/account-booking?view=account" target="_blank" style="color:#116769; text-decoration: none;">
        Hier klicken, um Ihre Reservierungen in Ihrem Konto zu verwalten
      </a>
    </p>`;

  // Link zur Buchung oder zu allgemeiner Buchungsseite
  const linkToUse = bookingLink
    ? bookingLink.replace("http://localhost:5173", BASE_URL)
    : `${BASE_URL}/booking`;

  const directBookingLink = `
    <p style="margin-top: 10px;">
      <a href="${linkToUse}" target="_blank" style="color:#116769; text-decoration: none;">
        Hier klicken, um Ihre Buchung anzusehen
      </a>
    </p>`;

  // HTML Template
  const htmlTemplate = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; color: #333;">
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="cid:logoMyLuxZen" alt="MyLuxZen Logo" style="width: 100px;" />
      </div>

      <h2 style="color: #116769;">Ihre Anfrage bei MyLuxZen</h2>

      <p>Liebe Kundin, lieber Kunde,</p>
      <p>vielen Dank für Ihre Nachricht. Hier ist unsere Antwort:</p>

      <blockquote style="border-left: 4px solid #ccc; padding-left: 12px; color: #555; margin: 20px 0;">
        ${text.replace(/\n/g, "<br/>")}
      </blockquote>

      ${directBookingLink}
      ${accountLink}

      <p style="margin-top: 30px;">
        Bei Fragen stehen wir Ihnen jederzeit gerne zur Verfügung.
      </p>

      <p style="margin-top: 30px;">
        Mit freundlichen Grüßen<br/>
        <strong>Ihr MyLuxZen Team</strong>
      </p>

      <hr style="margin: 30px 0;" />

      <div style="font-size: 14px; color: #555; line-height: 1.6;">
        <p><strong>Telefon:</strong> +66 2 123 4567</p>
        <p><strong>Website:</strong> <a href="https://myluxzen.com" target="_blank" style="color: #116769;">www.myluxzen.com</a></p>
        <p>

  <p>
  <strong>E-Mail:</strong> 
  <a href="${BASE_URL}/?contact=open" target="_blank" style="color: #116769; text-decoration: none;">
    info@myluxzen.com
  </a>
</p>
  
      </div>

      <hr style="margin: 30px 0;" />
      <p style="font-size: 12px; color: #888; text-align: center;">
        Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht auf diese Adresse.
      </p>
    </div>
  `;

  // E-Mail-Optionen
  const mailOptions = {
    from: `"MyLuxZen Support" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
    html: htmlTemplate,
    attachments: [
      {
        filename: "logo.png",
        path: path.join(__dirname, "../assets/images/logo.png"),
        cid: "logoMyLuxZen",
      },
    ],
  };

  // E-Mail versenden
  const info = await transporter.sendMail(mailOptions);
  console.log("E-Mail erfolgreich gesendet:", info.response);
};
