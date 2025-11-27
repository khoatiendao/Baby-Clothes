import mailer from 'nodemailer';
import dotenv from 'dotenv';
import hbs from 'handlebars';
import path from 'path';
import { readFile } from 'fs/promises';
import hbs from 'handlebars';
import { genCodeActive } from './codeActive';
import { transporter } from '../config/gmail';
dotenv.config();

const __dirname = path.dirname(__filename);

export const create = {
  async mailVertification(email, username) {
    try {
      const templatePath = path.join(
        __dirname,
        '../../resource/hbs/mailTemplate.hbs'
      );
      const readHtml = await readFile(templatePath, 'utf-8');
      const code = genCodeActive();
      const template = hbs.compile(readHtml);
      const htmlToSend = template({ username, code });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verification',
        html: htmlToSend,
      };

      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
        console.error('Send mail error', error);
        throw error;
    }
  },  
};
