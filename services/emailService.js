const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(
  process.env.SENDGRID_KEY
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

    console.log(process.env.SENDGRID_KEY);
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
