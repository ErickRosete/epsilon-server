
// // codigo ejemplo  https://nodemailer.com/about/
// // config zoho https://www.zoho.com/mail/help/zoho-smtp.html
// // email zoho https://mail.zoho.com/zm/#settings/all/mailaccounts
// // mxtoolbox https://mxtoolbox.com/SuperTool.aspx?action=mx%3azoho._domainkey.oscarrosete.com&run=toolpage#
// // mx lookup oscarrosete.com
// // namesilo manage domain name https://www.namesilo.com/account_domain_manage_dns.php
// // domain status https://mail.zoho.com/cpanel/index.do?tabmode=domain#domains
//oscar.rosete@oscarrosete.com
// LiaAshanti1!
// https://help.zoho.com/portal/community/topic/error-message-failed-553-relaying-disallowed-as

"use strict";
const nodemailer = require("nodemailer");

exports.sendEmail = async (emailInfo) => {
    try {
        const transporter = nodemailer.createTransport(
            emailInfo.smtpClient
        );

        // setup email data with unicode symbols
        const mailOptions = {
            // from: '"Oscar Rosete 👻" <oscar.rosete@oscarrosete.com>', // sender address
            from: '"noreply" <noreply@astradev.co>', // sender address
            to: emailInfo.to, // list of receivers
            subject: emailInfo.subject, // Subject line
            html: emailInfo.htmlContent ,// html body,
            attachments:emailInfo.attachments
        };
        console.log("dentro de sendEmail")
        console.log(mailOptions.subject)
        // console.log("====transporter")
        // console.log(transporter)
        // send mail with defined transport object
        const info = await transporter.sendMail(mailOptions)

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

