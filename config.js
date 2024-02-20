const nodemailer = require("nodemailer");
require("dotenv").config();

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const config = {
      host: "smtp.meta.ua",
      port: 465,
      secure: true,
      auth: {
        user: "bohdanluckyman@meta.ua",
        pass: process.env.PASSWORD,
      },
    };

    const transporter = nodemailer.createTransport(config);

    const emailOptions = {
      from: "bohdanluckyman@meta.ua",
      to: email,
      subject: "Verification Email",
      html: `<p>Привіт. Будь ласка, перейдіть за посиланням нижче, щоб підтвердити свою електронну адресу:</p>
             <a href="http://yourwebsite.com/users/verify/${verificationToken}">Підтвердити електронну адресу</a>`,
    };

    await transporter.sendMail(emailOptions);
    console.log("Verification email sent");
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Error sending verification email");
  }
};

module.exports = sendVerificationEmail;
