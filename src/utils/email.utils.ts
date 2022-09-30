import ISendEmailBody from "../interface/email";
import nodemailer from 'nodemailer'

export const sendEmail = async ({
  to,
  subject,
  text
}: ISendEmailBody) => {
    var transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'ara.swift@ethereal.email',
          pass: 'X7t62vKRKyPkzaPJJx'
        }
      });
      var mailOptions = {
        from: 'ara.swift@ethereal.email',
        to,
        subject,
        text
      };
      console.log(mailOptions);
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
};
