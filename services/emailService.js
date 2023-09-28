const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("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");

const sendEmail = async (from, to, subject, text, html) => {
  const msg = {
    from,
    to,
    subject,
    text,
    html,
  };

  try {
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
        return true;
      })
      .catch((error) => {
        throw error;
      });
  
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

module.exports = {
  sendEmail,
};
