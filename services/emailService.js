const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

const sendEmail = async (from, to, subject, text, html) => {
  const msg = {
    from,
    to,
    subject,
    text,
    html,
  };

  result = await sgMail.send(msg);
  console.log(result);
};

module.exports = {
  sendEmail,
};
