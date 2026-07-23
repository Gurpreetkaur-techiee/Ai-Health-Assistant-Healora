const { BrevoClient } = require("@getbrevo/brevo");

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY
});

const sendEmail = async ({ to, subject, html }) => {
    try {
        const response = await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: "Healora Team",
                email: "healora.ai.helpdesk@gmail.com"
            },
            to: [
                {
                    email: to
                }
            ],
            subject,
            htmlContent: html
        });

        console.log("Email sent successfully:", response);

        return response;
    } catch (err) {
        console.error(
            "EMAIL API ERROR:",
            err.response?.data || err.message || err
        );
        throw err;
    }
};

module.exports = {
    sendEmail
};