module.exports = (otp) => {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>bevysquare</title>
    </head>
    <body
      style="
        width: 100% !important;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        margin: 0;
        padding: 0;
        font-family: sans-serif;
      "
    >
      <main
        style="
          max-width: 600px;
          margin: 0 auto;
          padding: 5px;
          background-color: #ffffff;
        "
      >
        <!-- Head -->
        <div style="border-bottom: 3px solid #b3b3b3; padding-bottom: 15px">
          <img
            src="https://bevysquareblobstorage.blob.core.windows.net/otptemplate/logo.png"
            alt=""
            style="width: 170px"
          />
          <div
            style="
              padding-left: 30px;
              display: flex;
              margin-top: 5px;
              color: #808080;
            "
          >
            <p style="margin: 0">Social that Pays</p>
            <p style="margin: 0 0 0 auto">One Time Passcode</p>
          </div>
        </div>
        <!-- Content -->
        <div>
          <h2 style="width: fit-content; margin: 25px auto 0; color: #000000">
            Verify your login
          </h2>
          <p
            style="
              max-width: 42ch;
              margin: 15px auto;
              text-align: center;
              color: #808080;
              line-height: 150%;
            "
          >
            Thank you for choosing bevysquare. Below is your One Time Passcode
          </p>
          <h1 style="width: fit-content; margin: 0 auto; color: #000000">
            ${otp}
          </h1>
          <p
            style="
              max-width: 50ch;
              text-align: center;
              margin: 15px auto 0;
              color: #808080;
              line-height: 150%;
            "
          >
            Remember, Please do not share this passcode (OTP) with anyone. If this
            wasn’t you, contact our support team at <br />
            <a href="mailto:contact@bevysquare.com" style="color: #174aff"
              >contact@bevysquare.com</a
            >
          </p>
        </div>
        <!-- Footer -->
        <div style="width: fit-content; margin: 30px auto 0">
          <a href="https://instagram.com/bevysquare"
            ><img
              style="width: 35px; height: 35px; margin-right: 5px"
              src="https://bevysquareblobstorage.blob.core.windows.net/otptemplate/instagram.png"
              alt=""
          /></a>
          <a href="https://facebook.com/bevysquare"
            ><img
              style="width: 35px; height: 35px; margin-right: 5px"
              src="https://bevysquareblobstorage.blob.core.windows.net/otptemplate/facebook.png"
              alt=""
          /></a>
          <a href="https://twitter.com/bevysquare"
            ><img
              style="width: 35px; height: 35px; margin-right: 5px"
              src="https://bevysquareblobstorage.blob.core.windows.net/otptemplate/twitter.png"
              alt=""
          /></a>
          <a href="mailto:contact@bevysquare.com"
            ><img
              style="width: 35px; height: 35px; margin-right: 5px"
              src="https://bevysquareblobstorage.blob.core.windows.net/otptemplate/email.png"
              alt=""
          /></a>
          <a href="https://youtube.com/bevysquare"
            ><img
              style="width: 35px; height: 35px; margin-right: 5px"
              src="https://bevysquareblobstorage.blob.core.windows.net/otptemplate/youtube.png"
              alt=""
          /></a>
          <a href="https://linkedin.com/bevysquare"
            ><img
              style="width: 35px; height: 35px"
              src="https://bevysquareblobstorage.blob.core.windows.net/otptemplate/linkedin.png"
              alt=""
          /></a>
        </div>
      </main>
    </body>
  </html>  
    `;
};
