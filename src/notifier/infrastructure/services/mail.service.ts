import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendEmailUpdate(to: string, code: string): Promise<void> {
        await this.mailerService.sendMail({
            to,
            subject: 'Смена почты',
            template: 'email-update.hbs',
            context: {
                code,
            },
        });
    }
}
