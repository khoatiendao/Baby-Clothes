import mailer from 'nodemailer'
import { dotenv } from 'dotenv';
dotenv.config()

export const transporter = mailer.createTransport({
  host: 'smtp.gmail.com', // SMTP server của gmail
  port: '465', // port của SMTP server
  secure: 'true', // sử dụng SSL/TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // bỏ qua lỗi self-signed certificate
  },
});
