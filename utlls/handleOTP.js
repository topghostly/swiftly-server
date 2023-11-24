const nodemailer = require("nodemailer");
const Otp = require("../models/otpModels");

const generateOTP = async (userMail) => {
  const OTP = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    const otpResponse = await Otp.create({
      usermail: userMail,
      otp: OTP,
    });

    if (!otpResponse) {
      console.error("Error generating OTP");
      return null;
    }

    return OTP;
  } catch (error) {
    console.error("Error generating OTP:", error);
    return null;
  }
};

const sendOTP = async (userMail) => {
  console.log("This has started", userMail);

  const OTP = await generateOTP(userMail);

  if (!OTP) {
    console.log("Wn error occured while generating the OTP");
    return mull;
  }

  const mailConfig = nodemailer.createTransport({
    host: "smtp.elasticemail.com",
    port: 2525,
    secure: false,
    auth: {
      user: "temitopeabolaji0327@gmail.com",
      pass: process.env.ELASTIC_MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "temitopeabolaji0327@gmail.com",
    to: userMail,
    subject: "Swifty One-Time Password Authentication Request",
    html: `
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        .container {
          margin: 0px auto;
          background-color: rgb(252, 252, 252);
          display: grid;
          place-content: center;
          text-align: center;
          padding: 20px;
          border-radius: 10px;
          width: fit-content;
        }
        svg {
          display: grid;
          place-content: center;
          margin: 0px auto;
          width: 50px;
        }
        h1 {
          color: #330ba6;
        }
      </style>
    </head>
    <body>
    <svg
          xmlns="http://www.w3.org/2000/svg"
          width="153"
          height="70"
          viewBox="0 0 153 173"
          fill="none"2
        >
          <path
            d="M69.1671 89.9982L36.7424 153.005C36.7424 153.005 19.3712 141.943 12.4238 131.266C7.81755 124.187 6.05801 119.547 3.9491 111.369C1.85401 103.244 1.00006 98.3886 1.00006 89.9982C1.00006 81.6078 1.6072 76.6842 3.9491 68.6273C6.0625 61.3565 8.37861 57.5643 12.2881 51.1631L12.4238 50.941C16.1736 44.8008 18.425 41.3244 23.4777 36.2025C29.0356 30.5684 32.8253 27.9814 39.6901 24.0432C45.5576 20.6771 49.0187 18.8618 55.534 17.0424C62.2382 15.1703 73.2202 14.8316 73.2202 14.8316L78.3774 10.0416L87.2219 0.461548L39.6901 89.9982H69.1671Z"
            fill="#413A55"
            fill-opacity="0.28"
            stroke="#D9D9D9"
            stroke-width="0.736927"
          />
          <path
            d="M92.3806 61.9951L126.279 7.46252L122.963 29.5703C122.963 29.5703 127.604 33.6884 130.332 36.5711C137.715 44.3702 141.762 49.2576 146.176 59.0474C150.322 68.2417 151.817 74.0363 152.44 84.1029C152.986 92.906 152.255 97.9951 150.229 106.579C148.063 115.759 146.372 121.048 141.386 129.055C136.699 136.582 132.973 140.19 126.279 146.005C119.379 151.998 115.144 155.284 106.751 158.901C99.2512 162.133 94.5827 163 86.4852 164.06C77.6393 165.217 72.3836 165.834 63.6405 164.06C57.6643 162.846 48.9019 158.901 48.9019 158.901L27.1626 172.534L29.3734 168.85L92.3806 99.5784L126.279 61.9951L92.3806 64.2059V61.9951Z"
            fill="#330BA6"
            stroke="#D9D9D9"
            stroke-width="0.736927"
          />
        </svg>
      <div class="container">
        <p>Hello,</p>
        <p>Please use the verification code below to log into Swifty.</p>
        <br/>
        <h1>${OTP}</h1>
        <br/>
        <p>If you didn't request this, you can ignore it or let us know</p>
        <small>This OTP would expire on <code>the expire date</code></small>
      </div>
    </body>
  </html>
    `,
  };

  mailConfig.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent successfully:", info.response);
    }
  });
};

module.exports = sendOTP;
