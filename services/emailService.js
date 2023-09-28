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
