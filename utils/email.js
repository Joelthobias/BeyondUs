const nodemailer = require('nodemailer');
const htmlToText=require('html-to-text');
var handlebars = require('handlebars');
var layouts = require('handlebars-layouts');
const fs=require('fs')
const path = require('path');
const { log } = require('util');
const Transport = require("nodemailer-brevo-transport");


const partialPath = path.join(__dirname, '..', 'views', 'emails', 'baseEmail.hbs');

// Register helpers
handlebars.registerHelper(layouts(handlebars));
handlebars.registerPartial('layout', fs.readFileSync(partialPath, 'utf8'));







// new Email(user,url).sendWelcome();
module.exports=class Email{
    constructor(user,url){
        this.to=user.email;
        this.firstName=user.name.split(' ')[0];
        this.url=url;
        this.from=`Joel ${process.env.Email_From}`;
        
    }
    newTransport(){
        if(process.env.NODE_ENV==='pro'){
            return nodemailer.createTransport(new Transport({apiKey: process.env.bervoApiKey}));

            
        }else{
            return nodemailer.createTransport({
                host: 'sandbox.smtp.mailtrap.io',
                port: 25,
                auth: {
                    user: process.env.Email_UserName,
                    pass: process.env.Email_UserPassword
                }
            })
        }
    }
    async send(template,subject){
        // Compile template
        const templatePath = path.join(__dirname, '..', 'views', 'emails', `${template}.hbs`);
        var temp = handlebars.compile(fs.readFileSync(templatePath, 'utf8'));
        const html=temp({
            firstName:this.firstName,
            url:this.url,
            subject
        })
        const mailOptions={
            from:this.from,
            to:this.to,
            subject,
            html,
            text:htmlToText.convert(html)
        }
        await this.newTransport().sendMail(mailOptions)
    }
    async sendWelcome(){
        await this.send('welcome','Welcome to the Naturos Family');

    }
    async sendPasswordReset(){
        console.log('Api key:',process.env.bervoApiKey);
        await this.send('ResetPassWord','Your password reset token (only valid for 10 minutes)');

    }

}

