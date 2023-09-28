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
