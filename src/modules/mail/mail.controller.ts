import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';
import Email from '../../emails/invoice.email';

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService){}
    @Post('sendEmail')
    async getEmail( @Body() sendeEmailDto: {email: string; subject: string;}): Promise<string>{
        await this.mailService.sendEmail({
      ...sendeEmailDto,
      template: Email({ url: 'http://example.com' }),
    });

    return 'Email sent successfully';
        
    }
}
