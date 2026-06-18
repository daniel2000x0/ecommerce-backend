import { Injectable } from '@nestjs/common';
import { render } from '@react-email/render';
import * as nodemailer from 'nodemailer';
import Email from '../../emails/welcome.email';
interface  EmailConfig {
    email: string;
  subject: string;
  text?: string;
  template: any;
}
@Injectable()
export class MailService {
private transporter: nodemailer.Transporter;

    constructor(){
 this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'replace_with_your_email',
          pass: 'replace_with_your_email_password',
        },
 },{from:{
name: 'Ecommerce App',
address: 'replace_with_your_email'
 }});
    }

    private  generalEmail = (template)=>{
        return render(template)
    }
    async sendEmail({email, subject, template}: EmailConfig){
     const  html = this.generalEmail(template);

      try {
        await this.transporter.sendMail({
          to: email,
          subject: subject,
          html: html,
        });
      } catch (error) {
        console.error('Error sending email:', error);
      }
    
    }
    async  vericationRegisterEmail(appname:string, email:string, url: string) {
  const html = await  render(Email({ appname,email,url }));
  const  info =await this.transporter.sendEmail({
    to: email,
    subject: 'Welcome to Our App',
    html: html
  });

  if(info.rejected.length > 0){ 
    return true
    }
       return false 
    }
  }