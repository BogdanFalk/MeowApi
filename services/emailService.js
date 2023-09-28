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
