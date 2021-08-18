const  nodemailer = require('nodemailer')


const sendEmail = async (options) => {
  

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    ignoreTLS: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    
  });


  // send mail with defined transport object
  const message = {
    from: `${options.from} <${options.from}>`,
    to: options.email, 
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(message)
  console.log("Message sent: %s", info.messageId);
  
}


module.exports = sendEmail