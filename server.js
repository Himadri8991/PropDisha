import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "dist")));



// Verify SMTP settings are loaded
if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.warn("WARNING: SMTP credentials (SMTP_USER/SMTP_PASS) are not fully configured in your .env file!");
}

// Nodemailer SMTP Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "465", 10),
  secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports like 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify connection configuration
transporter.verify((error) => {
  if (error) {
    console.error("SMTP Connection Error:", error.message);
  } else {
    console.log("SMTP Server is successfully configured and ready to transmit emails.");
  }
});

// ----------------------------------------------------
// Responsive Premium HTML Email Templates
// ----------------------------------------------------

// 1. Property Details Form -> User Confirmation Email
function getPropertyUserEmailHtml({ name, propertyName, type, phone, email }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You for Connecting with PropDisha</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #f3f4f6;
      padding: 40px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    }
    .header {
      background-color: #0A1128;
      padding: 40px 30px;
      text-align: center;
      border-bottom: 3px solid #C5A880;
    }
    .logo {
      color: #C5A880;
      font-size: 26px;
      font-weight: 700;
      letter-spacing: 4px;
      text-transform: uppercase;
      margin: 0;
    }
    .tagline {
      color: #94A3B8;
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-top: 8px;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 20px;
      font-weight: 600;
      color: #0A1128;
      margin-top: 0;
      margin-bottom: 16px;
    }
    .intro-text {
      color: #4B5563;
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .property-card {
      background: linear-gradient(135deg, #0A1128 0%, #1E293B 100%);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 30px;
      text-align: center;
      border-left: 4px solid #C5A880;
    }
    .property-label {
      color: #C5A880;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 700;
      margin-bottom: 6px;
    }
    .property-value {
      color: #ffffff;
      font-size: 20px;
      font-weight: 600;
      margin: 0;
    }
    .section-title {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #64748B;
      font-weight: 700;
      border-bottom: 1px solid #E2E8F0;
      padding-bottom: 8px;
      margin-bottom: 16px;
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    .details-table td {
      padding: 12px 0;
      font-size: 14px;
      border-bottom: 1px solid #F1F5F9;
    }
    .details-label {
      color: #64748B;
      font-weight: 500;
      width: 35%;
    }
    .details-value {
      color: #1E293B;
      font-weight: 600;
    }
    .next-steps {
      background-color: #F8FAFC;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 30px;
      border: 1px solid #E2E8F0;
    }
    .next-steps-title {
      font-size: 13px;
      font-weight: 600;
      color: #0A1128;
      margin: 0 0 6px 0;
    }
    .next-steps-desc {
      color: #4B5563;
      font-size: 13px;
      line-height: 1.5;
      margin: 0;
    }
    .footer {
      background-color: #F8FAFC;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #E2E8F0;
    }
    .footer-text {
      color: #94A3B8;
      font-size: 12px;
      line-height: 1.5;
      margin: 0 0 10px 0;
    }
    .brand-signature {
      color: #0A1128;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 1px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1 class="logo">PropDisha</h1>
        <div class="tagline">Exquisite Real Estate Advisory</div>
      </div>
      <div class="content">
        <h2 class="greeting">Dear ${name},</h2>
        <p class="intro-text">
          Thank you for showing interest in PropDisha.<br/><br/>
          We have successfully received your property inquiry regarding:
        </p>
        
        <div class="property-card">
          <div class="property-label">Property Reference</div>
          <h3 class="property-value">${propertyName}</h3>
        </div>

        <p class="intro-text">
          Our team will review your request and get in touch with you shortly.
        </p>

        <div class="section-title">Your Submitted Details</div>
        <table class="details-table">
          <tr>
            <td class="details-label">Inquiry Type</td>
            <td class="details-value">${type}</td>
          </tr>
          <tr>
            <td class="details-label">Phone</td>
            <td class="details-value">${phone}</td>
          </tr>
          <tr>
            <td class="details-label">Email</td>
            <td class="details-value">${email}</td>
          </tr>
        </table>

        <div class="next-steps">
          <h4 class="next-steps-title">What happens next?</h4>
          <p class="next-steps-desc">
            One of our senior consultants is already compiling the brochure and market reports for this asset. Expect a call or WhatsApp text from us shortly to take this forward.
          </p>
        </div>

        <p class="intro-text" style="text-align: center; font-style: italic; margin-bottom: 0; color: #64748B;">
          We appreciate your trust in PropDisha.
        </p>
      </div>
      <div class="footer">
        <p class="footer-text">
          This email was sent by PropDisha. If you did not make this request, please contact our support desk.
        </p>
        <div class="brand-signature">PropDisha Team</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

// 2. Property Details Form -> Admin Alert Email
function getPropertyAdminEmailHtml({ name, propertyName, type, phone, email, message }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Property Inquiry Received – PropDisha</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
    }
    .wrapper {
      width: 100%;
      background-color: #f3f4f6;
      padding: 40px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    }
    .header {
      background-color: #0A1128;
      padding: 30px;
      text-align: center;
      border-bottom: 3px solid #C5A880;
    }
    .logo {
      color: #C5A880;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin: 0;
    }
    .content {
      padding: 40px 30px;
    }
    .alert-banner {
      background-color: #FEF3C7;
      border-left: 4px solid #F59E0B;
      color: #92400E;
      padding: 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 30px;
    }
    .property-highlight {
      background-color: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 30px;
      border-left: 4px solid #C5A880;
    }
    .label {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #64748B;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .value {
      font-size: 18px;
      color: #0A1128;
      font-weight: 700;
      margin: 0;
    }
    .section-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #64748B;
      font-weight: 700;
      border-bottom: 1px solid #E2E8F0;
      padding-bottom: 6px;
      margin-bottom: 16px;
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    .details-table td {
      padding: 10px 0;
      font-size: 14px;
      border-bottom: 1px solid #F1F5F9;
    }
    .details-label {
      color: #64748B;
      font-weight: 500;
      width: 35%;
    }
    .details-value {
      color: #1E293B;
      font-weight: 600;
    }
    .message-box {
      background-color: #F8FAFC;
      border-radius: 8px;
      padding: 16px;
      border: 1px solid #E2E8F0;
      font-size: 14px;
      color: #334155;
      line-height: 1.5;
      white-space: pre-wrap;
    }
    .footer {
      background-color: #F8FAFC;
      padding: 24px;
      text-align: center;
      border-top: 1px solid #E2E8F0;
    }
    .brand-signature {
      color: #64748B;
      font-weight: 600;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1 class="logo">PropDisha Admin</h1>
      </div>
      <div class="content">
        <p style="margin-top:0; font-size:15px; color:#334155;">Hello Team,</p>
        <div class="alert-banner">
          A new property inquiry has been submitted on PropDisha.
        </div>
        
        <div class="property-highlight">
          <div class="label">Property Reference</div>
          <h3 class="value">${propertyName}</h3>
        </div>

        <div class="section-title">Inquiry Details</div>
        <table class="details-table">
          <tr>
            <td class="details-label">Property Reference</td>
            <td class="details-value">${propertyName}</td>
          </tr>
          <tr>
            <td class="details-label">Inquiry Type</td>
            <td class="details-value">${type}</td>
          </tr>
          <tr>
            <td class="details-label">Full Name</td>
            <td class="details-value">${name}</td>
          </tr>
          <tr>
            <td class="details-label">Email Address</td>
            <td class="details-value">${email}</td>
          </tr>
          <tr>
            <td class="details-label">Phone Number</td>
            <td class="details-value">${phone}</td>
          </tr>
        </table>

        ${message ? `
        <div class="section-title">Message</div>
        <div class="message-box">${message}</div>
        ` : ''}

        <p style="font-size: 14px; color: #4B5563; font-weight: 500; margin-top: 30px;">
          Please connect with the client as soon as possible.
        </p>
      </div>
      <div class="footer">
        <div class="brand-signature">Regards,<br>PropDisha Website</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

// 3. Contact Form -> User Confirmation Email
function getContactUserEmailHtml({ name, type, phone, email }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We Received Your Inquiry – PropDisha</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #f3f4f6;
      padding: 40px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    }
    .header {
      background-color: #0A1128;
      padding: 40px 30px;
      text-align: center;
      border-bottom: 3px solid #C5A880;
    }
    .logo {
      color: #C5A880;
      font-size: 26px;
      font-weight: 700;
      letter-spacing: 4px;
      text-transform: uppercase;
      margin: 0;
    }
    .tagline {
      color: #94A3B8;
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-top: 8px;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 20px;
      font-weight: 600;
      color: #0A1128;
      margin-top: 0;
      margin-bottom: 16px;
    }
    .intro-text {
      color: #4B5563;
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .badge-card {
      background-color: #F8FAFC;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 30px;
      border: 1px solid #E2E8F0;
      text-align: center;
      border-top: 3px solid #C5A880;
    }
    .badge-title {
      font-size: 12px;
      font-weight: 700;
      color: #64748B;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin: 0 0 6px 0;
    }
    .badge-subtitle {
      font-size: 18px;
      color: #0A1128;
      font-weight: 700;
      margin: 0;
    }
    .section-title {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #64748B;
      font-weight: 700;
      border-bottom: 1px solid #E2E8F0;
      padding-bottom: 8px;
      margin-bottom: 16px;
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    .details-table td {
      padding: 12px 0;
      font-size: 14px;
      border-bottom: 1px solid #F1F5F9;
    }
    .details-label {
      color: #64748B;
      font-weight: 500;
      width: 35%;
    }
    .details-value {
      color: #1E293B;
      font-weight: 600;
    }
    .footer {
      background-color: #F8FAFC;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #E2E8F0;
    }
    .footer-text {
      color: #94A3B8;
      font-size: 12px;
      line-height: 1.5;
      margin: 0 0 10px 0;
    }
    .brand-signature {
      color: #0A1128;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 1px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1 class="logo">PropDisha</h1>
        <div class="tagline">Exquisite Real Estate Advisory</div>
      </div>
      <div class="content">
        <h2 class="greeting">Dear ${name},</h2>
        <p class="intro-text">
          Thank you for contacting PropDisha.<br/><br/>
          We have received your inquiry successfully, and our team will get back to you within 24 hours.
        </p>

        <div class="badge-card">
          <div class="badge-title">Response Commitment</div>
          <h4 class="badge-subtitle">Within 24 Hours</h4>
        </div>

        <div class="section-title">Your Submitted Details</div>
        <table class="details-table">
          <tr>
            <td class="details-label">Inquiry Type</td>
            <td class="details-value">${type}</td>
          </tr>
          <tr>
            <td class="details-label">Phone</td>
            <td class="details-value">${phone}</td>
          </tr>
          <tr>
            <td class="details-label">Email</td>
            <td class="details-value">${email}</td>
          </tr>
        </table>

        <p class="intro-text" style="text-align: center; font-style: italic; margin-bottom: 0; color: #64748B;">
          We look forward to assisting you.
        </p>
      </div>
      <div class="footer">
        <p class="footer-text">
          This email was sent by PropDisha. If you did not make this request, please contact our support desk.
        </p>
        <div class="brand-signature">PropDisha Team</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

// 4. Contact Form -> Admin Alert Email
function getContactAdminEmailHtml({ name, type, phone, email, message }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission – PropDisha</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f3f4f6;
      margin: 0;
      padding: 0;
    }
    .wrapper {
      width: 100%;
      background-color: #f3f4f6;
      padding: 40px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
    }
    .header {
      background-color: #0A1128;
      padding: 30px;
      text-align: center;
      border-bottom: 3px solid #C5A880;
    }
    .logo {
      color: #C5A880;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 3px;
      text-transform: uppercase;
      margin: 0;
    }
    .content {
      padding: 40px 30px;
    }
    .alert-banner {
      background-color: #FEF3C7;
      border-left: 4px solid #F59E0B;
      color: #92400E;
      padding: 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #64748B;
      font-weight: 700;
      border-bottom: 1px solid #E2E8F0;
      padding-bottom: 6px;
      margin-bottom: 16px;
    }
    .details-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    .details-table td {
      padding: 10px 0;
      font-size: 14px;
      border-bottom: 1px solid #F1F5F9;
    }
    .details-label {
      color: #64748B;
      font-weight: 500;
      width: 35%;
    }
    .details-value {
      color: #1E293B;
      font-weight: 600;
    }
    .message-box {
      background-color: #F8FAFC;
      border-radius: 8px;
      padding: 16px;
      border: 1px solid #E2E8F0;
      font-size: 14px;
      color: #334155;
      line-height: 1.5;
      white-space: pre-wrap;
    }
    .footer {
      background-color: #F8FAFC;
      padding: 24px;
      text-align: center;
      border-top: 1px solid #E2E8F0;
    }
    .brand-signature {
      color: #64748B;
      font-weight: 600;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <h1 class="logo">PropDisha Admin</h1>
      </div>
      <div class="content">
        <p style="margin-top:0; font-size:15px; color:#334155;">Hello Team,</p>
        <div class="alert-banner">
          A new inquiry has been submitted through the Contact Form.
        </div>

        <div class="section-title">Inquiry Details</div>
        <table class="details-table">
          <tr>
            <td class="details-label">Inquiry Type</td>
            <td class="details-value">${type}</td>
          </tr>
          <tr>
            <td class="details-label">Full Name</td>
            <td class="details-value">${name}</td>
          </tr>
          <tr>
            <td class="details-label">Email Address</td>
            <td class="details-value">${email}</td>
          </tr>
          <tr>
            <td class="details-label">Phone Number</td>
            <td class="details-value">${phone}</td>
          </tr>
        </table>

        ${message ? `
        <div class="section-title">Message</div>
        <div class="message-box">${message}</div>
        ` : ''}

        <p style="font-size: 14px; color: #4B5563; font-weight: 500; margin-top: 30px;">
          Please respond to the inquiry promptly.
        </p>
      </div>
      <div class="footer">
        <div class="brand-signature">Regards,<br>PropDisha Website</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
}

// Helper: Quick email pattern check
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// ----------------------------------------------------
// API Endpoints
// ----------------------------------------------------

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "healthy", message: "API server is operational" });
});

// Contact Form Endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message, type } = req.body;

  // 1. Validation
  if (!name || !email || !phone || !type) {
    return res.status(400).json({
      success: false,
      message: "Required fields are missing. Full Name, Email, Phone Number, and Inquiry Type are mandatory.",
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "The email address provided is invalid.",
    });
  }

  const senderEmail = process.env.SMTP_USER || "noreply.propdisha@gmail.com";
  const adminEmail = process.env.ADMIN_EMAIL || "inquiry@propdisha.com";

  try {
    // 2. Transmit Admin and User emails in parallel
    const adminMailOptions = {
      from: `"PropDisha Website" <${senderEmail}>`,
      to: adminEmail,
      subject: "New Contact Form Submission – PropDisha",
      html: getContactAdminEmailHtml({ name, type, phone, email, message }),
    };

    const userMailOptions = {
      from: `"PropDisha Team" <${senderEmail}>`,
      to: email,
      subject: "We Received Your Inquiry – PropDisha",
      html: getContactUserEmailHtml({ name, type, phone, email }),
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    console.log(`[Success] Contact form dual emails sent for ${name} (${email})`);

    return res.status(200).json({
      success: true,
      message: "Your inquiry has been successfully sent.",
    });
  } catch (error) {
    console.error("[Error] Sending contact emails failed:", error);
    return res.status(500).json({
      success: false,
      message: "An internal error occurred while processing your request. Please try again later.",
      error: error.message,
    });
  }
});

// Property Details Inquiry Endpoint
app.post("/api/inquiry", async (req, res) => {
  const { name, email, phone, message, type, propertyName } = req.body;

  // 1. Validation
  if (!name || !email || !phone || !type || !propertyName) {
    return res.status(400).json({
      success: false,
      message: "Required fields are missing. Full Name, Email, Phone Number, Inquiry Type, and Property Name are mandatory.",
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "The email address provided is invalid.",
    });
  }

  const senderEmail = process.env.SMTP_USER || "noreply.propdisha@gmail.com";
  const adminEmail = process.env.ADMIN_EMAIL || "inquiry@propdisha.com";

  try {
    // 2. Transmit Admin and User emails in parallel
    const adminMailOptions = {
      from: `"PropDisha Website" <${senderEmail}>`,
      to: adminEmail,
      subject: "New Property Inquiry Received – PropDisha",
      html: getPropertyAdminEmailHtml({ name, propertyName, type, phone, email, message }),
    };

    const userMailOptions = {
      from: `"PropDisha Team" <${senderEmail}>`,
      to: email,
      subject: "Thank You for Connecting with PropDisha",
      html: getPropertyUserEmailHtml({ name, propertyName, type, phone, email }),
    };

    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(userMailOptions),
    ]);

    console.log(`[Success] Property details dual emails sent for ${name} (${email}) on ${propertyName}`);

    return res.status(200).json({
      success: true,
      message: "Your property inquiry has been successfully sent.",
    });
  } catch (error) {
    console.error("[Error] Sending property inquiry emails failed:", error);
    return res.status(500).json({
      success: false,
      message: "An internal error occurred while processing your request. Please try again later.",
      error: error.message,
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`PropDisha API Server is running on port ${PORT}`);
});
