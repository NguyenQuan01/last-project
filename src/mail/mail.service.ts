import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }

  async sendMailVerify(url: string, email: string) {
    try {
      const result = await this.mailerService.sendMail({
        to: email,
        from: 'quanto261@gmail.com',
        subject: 'Cảm ơn bạn đã đăng ký tài khoản',
        html: `
          <p>Hey ${email},</p>
          <p>Please click below to confirm your email</p>
          <p>
          <a href="${url}"">Confirm</a>
          </p>

          <p>If you did not request this email you can safely ignore it.</p>
        `,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }





  async sendMailForgotPassword(url: string, email: string) {
    try {
      const result = await this.mailerService.sendMail({
        to: email,
        from: 'quanto261@gmail.com',
        subject: 'Link quên mật khẩu',
        html: `
            <p>Hey ${email},</p>
          <p>Please click below to confirm change your email</p>
          <p>
          <a href="${url}"">Confirm</a>
          </p>

          <p>If you did not request this email you can safely ignore it.</p>
            `,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
