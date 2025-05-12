// src/mail/mail.service.ts

import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // ou smtp.mailgun.org etc.
      auth: {
        user: process.env.MAIL_USER,  // ton adresse Gmail
        pass: process.env.MAIL_PASS,  // ton mot de passe ou App Password
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject,
      text,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
