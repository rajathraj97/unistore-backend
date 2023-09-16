let nodemailer = require("nodemailer");
const pick = require("../../node_modules/lodash/pick")
require('dotenv').config()
const mailer={}

mailer.create = async(req,res) =>{
    try{
        console.log(req.body,'node-mmailer')
        const body = pick(req.body,['email','subject','text'])
        let transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD,
              
            }
          });
        
          let mailOptions = {
            from: process.env.EMAIL,
            to: body.email,
            subject: body.subject,
            text: body.text
          };
          
          transporter.sendMail(mailOptions, function(err, data) {
            if (err) {
              console.log("Error " + err);
              res.status(201)
            } else {
              console.log("Email sent successfully");
              res.status(200).json('sent')
            }
          });
        
    }
    catch(e){
        res.json(e)
    }
}

module.exports = mailer