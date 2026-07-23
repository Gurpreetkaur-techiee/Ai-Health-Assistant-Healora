const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;

    sendSmtpEmail.sender = {
      name: "Healora Team",
      email: "healora.ai.helpdesk@gmail.com"
    };

    sendSmtpEmail.to = [
      {
        email: to
      }
    ];

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("Email sent successfully:", response.body);
    return response.body;
  } catch (err) {
    console.error(
      "EMAIL API ERROR:",
      err.response?.body || err.message || err
    );
    throw err;
  }
};

module.exports = {
  sendEmail
};