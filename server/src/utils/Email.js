const mailer = require('nodemailer');
const MyConstant = require('./MyConstant');
// const randomNumber = require('./RandomString')
const hbs = require('handlebars');
const expressHbs = require('express-handlebars');
const transporter = mailer.createTransport({
    host: 'smtp.gmail.com', // SMTP server của gmail
    port: '465', // port của SMTP server
    secure: 'true', // sử dụng SSL/TLS
    auth: { 
        user: MyConstant.EMAIL_USER,
        pass: MyConstant.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false // bỏ qua lỗi self-signed certificate
    }
});
const EmailUtil = {
    send(email, username, code) {
        return new Promise(function(resolve, reject) {
            const mailOptions = {
                from: MyConstant.EMAIL_USER,
                to: email,
                subject: 'SignUp | Verification | Active',
                html: hbs.compile(`
                <style>
                * {
                    font-family: Arial, Helvetica, sans-serif;
                    padding: 0;
                    box-sizing: border-box;
                }
                .background{
                    background: linear-gradient(45deg, #F1755C, transparent);
                    text-align:center;
                    padding:50px;
                }
            
                .background .code{
                    width: 100%;
                }
            
                .background .code .cover{
                    width: 50%;
                    margin: 0 auto;
                    background-color:#F1755C;
                    padding:20px
                }
                .background .code .cover p{
                    margin: 10px 0px
                }
            </style>
            <body style="font-family: Arial, Helvetica, sans-serif; padding: 0; box-sizing: border-box;">
                <div style="background: linear-gradient(45deg, #F1755C, transparent); text-align:center; padding:50px;">
                    <div style="width: 100%;">
                        <img src="https://demo3.ltheme.com/wordpress/lt-baby-shop/wp-content/uploads/2020/04/cropped-logo-color-1.png" alt="logo">
                    </div>
                    <div>
                      <h2>Hello ${username}</h2>
                      <p>Thanks for signing up, please input these information to activate your account</p>
                      <div style="width: 100%; text-align:center">
                        <div style="width: 50%; margin: 0 auto; background-color:#F1755C; padding:20px">
                            <h3 style="margin: 10px 0px">Your verification code is</h3>
                            <h1 style="margin: 10px 0px">${code}</h1>
                        </div>
                      </div>
                    </div>
                </div>
            </body>
                `)() 
            };
            transporter.sendMail(mailOptions, function(err, result){
                if(err) reject(err);
                resolve(true);
            });
        });
    }
}
module.exports = EmailUtil;