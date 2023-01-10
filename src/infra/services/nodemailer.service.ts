import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class NodeMailerService {
  private transporter: any;
  constructor() {
    this.transporter = createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.HOTMAIL_USER,
        pass: process.env.HOTMAIL_PASSWORD,
      },
    });
  }

  async send(mail: any) {
    this.transporter.sendMail(mail).then(
      (res) => {
        console.log('Email sent -->', res);
        return;
      },
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
        return error;
      },
    );
  }
}
