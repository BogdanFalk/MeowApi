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
    console.error(error);
    return false;
  }
};

module.exports = {
  sendEmail,
};
