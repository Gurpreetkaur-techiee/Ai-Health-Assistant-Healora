const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.BREVO_LOGIN,
        pass: process.env.BREVO_SMTP_KEY
    }
});

const sendEmail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            // Replace this with your VERIFIED sender email in Brevo
            from: '"Healora Team" <healora.ai.helpdesk@gmail.com>',
            to,
            subject,
            html
        });

        console.log("Email sent:", info.response);
    } catch (err) {
        console.error("EMAIL ERROR:", err);
        throw err;
    }
};

module.exports = {
    sendEmail
};