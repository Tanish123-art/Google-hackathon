import nodemailer from 'nodemailer';
import 'dotenv/config';

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER || process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USERNAME || process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD || process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: 'Your App <noreply@yourapp.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

export default sendEmail;
