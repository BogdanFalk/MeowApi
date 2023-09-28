const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  "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"
);

const sendEmail = async (from, to, subject, text, html) => {
  try {
    const msg = {
      from,
      to,
      subject,
      text,
      html,
    };
    result = await sgMail.send(msg);
    console.log(result);
  } catch (error) {
    console.error(JSON.stringify(error));
    return false;
  }
};

module.exports = {
  sendEmail,
};
