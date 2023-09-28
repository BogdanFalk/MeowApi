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
