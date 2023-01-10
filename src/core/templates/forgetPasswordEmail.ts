export type TypeTemplateForgetPassword = {
  email: string;
  code: string;
  name: string;
};

export const templateForgetPassword = async (
  forgetPassword: TypeTemplateForgetPassword,
) => {
  const mail = {
    to: forgetPassword.email,
    from: process.env.HOTMAIL_USER,
    subject: 'Recuperação de senha',
    html: `
    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office
        >
          <head>
            <title> </title>
            <!--[if !mso]><!-- -->
            <meta http-equiv=" X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style type="text/css">
      #outlook a {
          padding: 0;
      }

      .ReadMsgBody {
          width: 100%;
      }

      .ExternalClass {
          width: 100%;
      }

      .ExternalClass * {
          line-height: 100%;
      }

      body {
          margin: 0;
          padding: 0;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
      }

      table,
      td {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
      }

      img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
          -ms-interpolation-mode: bicubic;
      }

      p {
          display: block;
          margin: 13px 0;
      }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
      @media only screen and (max-width: 480px) {
          @-ms-viewport {
            width: 320px;
          }

          @viewport {
            width: 320px;
          }
      }
    </style>
    <!--<![endif]-->
    <!--[if mso]>
              <xml>
                <o:OfficeDocumentSettings>
                  <o:AllowPNG />
                  <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
              </xml>
            <![endif]-->
    <!--[if lte mso 11]>
              <style type="text/css">
                .outlook-group-fix {
                  width: 100% !important;
                }
              </style>
            <![endif]-->

    <style type="text/css">
      @media only screen and (min-width: 480px) {
          .mj-column-per-100 {
            width: 100% !important;
          }
      }
    </style>

    <style type="text/css"></style>
    </head>

    <body style="background-color: #f9f9f9">
      <div style="background-color: #f9f9f9">
          <!--[if mso | IE]>
              <table
                align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->

          <div style="
                  background: #f9f9f9;
                  background-color: #f9f9f9;
                  margin: 0px auto;
                  max-width: 600px;
                ">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background: #f9f9f9; background-color: #f9f9f9; width: 100%">
                <tbody>
                  <tr>
                      <td style="
                          border-bottom: #219653 solid 5px;
                          direction: ltr;
                          font-size: 0px;
                          padding: 20px 0;
                          text-align: center;
                          vertical-align: top;
                        ">
                        <!--[if mso | IE]>
                          <table
                            role="presentation"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                          >
                            <tr></tr>
                          </table>
                        <![endif]-->
                      </td>
                  </tr>
                </tbody>
            </table>
          </div>

          <!--[if mso | IE]>
                  </td>
                </tr>
              </table>
              
              <table
                align="center" border="0" cellpadding="0" cellspacing="0" style="width:600px;" width="600"
              >
                <tr>
                  <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
              <![endif]-->

          <div style="
                  background: #fff;
                  background-color: #fff;
                  margin: 0px auto;
                  max-width: 600px;
                ">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background: #fff; background-color: #fff; width: 100%">
                <tbody>
                  <tr>
                      <td style="
                          border: #dddddd solid 1px;
                          border-top: 0px;
                          direction: ltr;
                          font-size: 0px;
                          padding: 20px 0;
                          text-align: center;
                          vertical-align: top;
                        ">
                        <!--[if mso | IE]>
                          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        
                <tr>
              
                    <td
                      style="vertical-align:bottom;width:600px;"
                    >
                  <![endif]-->

                        <div class="mj-column-per-100 outlook-group-fix" style="
                            font-size: 13px;
                            text-align: left;
                            direction: ltr;
                            display: inline-block;
                            vertical-align: bottom;
                            width: 100%;
                          ">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                              style="vertical-align: bottom" width="100%">
                              <tr>
                                  <td align="center" style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  word-break: break-word;
                                ">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                        style="border-collapse: collapse; border-spacing: 0px">
                                        <tbody>
                                          <tr>
                                              <td style="width: 100px">
                                                <svg width="100" height="82" viewBox="0 0 100 82" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <g clip-path="url(#clip0_3_59)">
                                                      <path
                                                          d="M64.0841 66.5105L72.8748 57.7197L74.2637 56.3309L79.9755 50.6191C80.8121 49.7824 80.8121 48.4103 79.9755 47.568C79.1388 46.7313 77.7666 46.7313 76.9244 47.568L69.8237 54.6686L65.4674 59.025C64.6307 59.8616 63.2586 59.8616 62.4163 59.025C61.5796 58.1883 61.5796 56.8161 62.4163 55.9739L66.7726 51.6176L75.7865 42.6037L81.5986 36.7916C85.8099 32.5803 92.6372 32.5803 96.8429 36.7916C101.054 41.0029 101.054 47.8246 96.8429 52.0359L94.3887 54.4902L83.6513 65.2276L81.0185 67.8603C80.1818 68.697 78.8097 68.697 77.9674 67.8603C77.1307 67.0236 77.1307 65.6515 77.9674 64.8092L78.9714 63.8052L81.7771 60.9995C82.6138 60.1628 82.6138 58.7907 81.7771 57.9484C80.9404 57.1118 79.5683 57.1118 78.726 57.9484L77.3092 59.3652L75.9203 60.7541L67.1296 69.5448C66.2929 70.3815 64.9208 70.3815 64.0785 69.5448C63.2419 68.7081 63.2419 67.336 64.0785 66.4937L64.0841 66.5105Z"
                                                          fill="#026431" />
                                                      <path
                                                          d="M5.30455 70.2755L20.4596 55.1205L21.4246 54.1555L25.0112 50.5689C25.8534 49.7267 25.8534 48.3489 25.0112 47.5123C24.1689 46.67 22.7967 46.67 21.9545 47.5123L17.4029 52.0638L9.80589 59.6609C8.96363 60.5031 7.59148 60.5031 6.74922 59.6609C5.90696 58.8186 5.90696 57.4409 6.74922 56.6042L14.3463 49.0071L14.8483 48.5051C15.6905 47.6629 15.6905 46.2851 14.8483 45.4485C14.006 44.6062 12.6283 44.6062 11.7916 45.4485L11.2896 45.9505L3.69255 53.5475C2.85029 54.3898 1.47813 54.3898 0.635874 53.5475C-0.206384 52.7053 -0.206384 51.3275 0.635874 50.4908L9.86167 41.2651L16.7559 34.3708L47.9585 3.15706C52.1698 -1.05423 58.9915 -1.05423 63.2028 3.15706L89.2236 29.1778L96.8485 36.8028C92.6372 32.5915 85.8099 32.5915 81.6042 36.8028L53.7651 64.6419L43.5018 74.9052L37.6394 80.7675C36.7972 81.6098 35.425 81.6098 34.5828 80.7675C33.7405 79.9252 33.7405 78.5531 34.5828 77.7108L38.8164 73.4772L41.728 70.5656C42.5703 69.7233 42.5703 68.3456 41.728 67.5089C40.8858 66.6722 39.508 66.6667 38.6714 67.5089L35.7597 70.4206L26.9913 79.189C26.149 80.0312 24.7713 80.0312 23.9346 79.189C23.0924 78.3467 23.0924 76.969 23.9346 76.1323L32.703 67.3639C33.523 66.5216 33.5174 65.1606 32.6807 64.3295C31.8496 63.4984 30.4886 63.4929 29.6464 64.3072L18.0723 75.8757C17.23 76.718 15.8523 76.718 15.0156 75.8757C14.1734 75.0335 14.1734 73.6557 15.0156 72.819L26.5897 61.245L31.1412 56.6934L39.0897 48.745C39.9319 47.9027 39.9319 46.525 39.0897 45.6883C38.2474 44.846 36.8697 44.846 36.033 45.6883L24.498 57.2233L23.533 58.1883L8.37795 73.3434C7.5357 74.1856 6.16354 74.1856 5.32128 73.3434C4.47902 72.5011 4.47902 71.1234 5.32128 70.2867L5.30455 70.2755Z"
                                                          fill="#5EBB46" />
                                                      <path
                                                          d="M43.8978 40.6626C49.6932 46.458 59.0919 46.458 64.8929 40.6626C70.6883 34.8672 70.6883 25.4685 64.8929 19.6675C59.0975 13.8721 49.6988 13.8721 43.8978 19.6675C38.1024 25.4629 38.1024 34.8616 43.8978 40.6626Z"
                                                          fill="#026431" />
                                                      <path
                                                          d="M45.4987 39.0618C50.4128 43.9759 58.3724 43.9759 63.2865 39.0618C68.2006 34.1477 68.2006 26.1881 63.2865 21.274C58.3724 16.3654 50.4128 16.3654 45.4987 21.274C40.5901 26.1881 40.5901 34.1477 45.4987 39.0618Z"
                                                          stroke="#5EBB46" stroke-width="1.07" stroke-miterlimit="10" />
                                                      <path
                                                          d="M59.3262 28.2296C59.17 28.0901 58.9748 27.9562 58.7461 27.8335C58.5174 27.7052 58.2552 27.5993 57.954 27.5044C57.6528 27.4096 57.3237 27.3706 56.9611 27.3817C56.6153 27.3929 56.1747 27.4877 55.6392 27.6662C55.1316 27.8391 54.4678 28.1347 53.659 28.5419L51.0151 25.898C51.1211 25.8032 51.2271 25.7084 51.3387 25.6358C51.4948 25.5354 51.6733 25.4852 51.8853 25.4797C52.0917 25.4797 52.3315 25.5354 52.5937 25.6526C52.8558 25.7753 53.1515 25.9817 53.4917 26.2829L55.2989 24.4757C54.6296 23.8956 53.9993 23.533 53.4192 23.3768C52.8391 23.2206 52.298 23.1927 51.796 23.2764C51.2996 23.3657 50.8478 23.533 50.4518 23.7784C50.1059 23.996 49.8047 24.2023 49.5426 24.4087L48.6167 23.4828L48.5107 23.5888L47.8636 24.2302L47.7186 24.3808L48.639 25.3012C48.2262 25.753 47.925 26.2215 47.7354 26.6901C47.5234 27.22 47.4341 27.7331 47.4565 28.2463C47.4788 28.7539 47.6071 29.2447 47.8358 29.7133C48.0644 30.1818 48.3712 30.6113 48.7505 30.9962C49.2358 31.4815 49.7267 31.7938 50.2287 31.9388C50.7307 32.0839 51.2215 32.1229 51.7124 32.0504C52.2032 31.9779 52.6829 31.8329 53.1626 31.6097C53.5698 31.4201 53.9603 31.2081 54.3395 30.9962L57.2902 33.9469C57.0448 34.1031 56.8161 34.2202 56.6042 34.2704C56.342 34.3373 56.091 34.3373 55.8567 34.276C55.6169 34.2146 55.3826 34.1086 55.1428 33.9524C54.9029 33.7963 54.6575 33.6122 54.3953 33.3835L52.5602 35.2186C53.0845 35.7429 53.5977 36.139 54.0997 36.4067C54.6017 36.6744 55.1093 36.8195 55.6225 36.825C56.1356 36.8362 56.6655 36.7135 57.2121 36.4681C57.7086 36.2449 58.2385 35.8991 58.7907 35.4473L60.1796 36.8362L60.3246 36.6912L60.9716 36.0497L61.0776 35.9437L59.6999 34.566C60.1963 33.9971 60.5366 33.4337 60.7206 32.8759C60.9159 32.2791 60.9939 31.7157 60.9493 31.1914C60.9047 30.6671 60.7708 30.1762 60.5366 29.73C60.3023 29.2838 60.0234 28.8933 59.6999 28.5698C59.6162 28.4861 59.4935 28.3746 59.3373 28.2351L59.3262 28.2296ZM52.1251 29.3396C51.9243 29.4176 51.7179 29.4678 51.5116 29.479C51.2996 29.4957 51.0821 29.4567 50.8534 29.3674C50.6247 29.2782 50.396 29.122 50.1729 28.8989C50.0613 28.7873 49.9665 28.6423 49.8884 28.475C49.8103 28.3021 49.7657 28.118 49.7545 27.9228C49.7434 27.7275 49.7769 27.5156 49.8494 27.2925C49.9051 27.1251 50.0055 26.9634 50.1283 26.8016L52.4821 29.1555C52.365 29.2224 52.2534 29.2894 52.1251 29.3396ZM58.5062 31.3811C58.5955 31.6376 58.6289 31.8831 58.6066 32.1062C58.5843 32.3349 58.5229 32.5412 58.417 32.7309C58.3445 32.8648 58.2664 32.9652 58.1939 33.0656L55.5555 30.4272C55.695 30.3547 55.8344 30.2822 55.9962 30.2264C56.2081 30.1539 56.4312 30.1037 56.6544 30.087C56.8775 30.0703 57.1006 30.0981 57.3237 30.1707C57.5468 30.2432 57.7644 30.3826 57.9707 30.589C58.2385 30.8623 58.4225 31.1245 58.5062 31.3811Z"
                                                          fill="#5EBB46" />
                                                      <path
                                                          d="M51.0542 8.0098L16.6443 42.4252C16.3933 42.6762 15.9806 42.6762 15.7296 42.4252C15.473 42.1742 15.473 41.7615 15.7296 41.5105L50.1394 7.09503C53.8822 3.35228 59.2983 2.3148 63.9893 3.94354L66.7726 6.72689C63.4594 3.41364 55.5388 3.53635 51.0598 8.01538L51.0542 8.0098Z"
                                                          fill="#026431" />
                                                      <path
                                                          d="M44.8349 66.5272C44.5783 66.2762 44.5783 65.8634 44.8349 65.6124L78.1124 32.3293C81.197 29.2447 85.6203 28.2965 89.5303 29.4846L91.9734 31.9277C89.4188 29.373 82.7532 29.5236 79.0328 33.2497L45.7497 66.5328C45.4987 66.7838 45.0859 66.7838 44.8349 66.5328V66.5272Z"
                                                          fill="#026431" />
                                                    </g>
                                                    <defs>
                                                      <clipPath id="clip0_3_59">
                                                          <rect width="100" height="81.3922" fill="white" />
                                                      </clipPath>
                                                    </defs>
                                                </svg>
                                              </td>
                                          </tr>
                                        </tbody>
                                    </table>
                                  </td>
                              </tr>

                              <tr>
                                  <td align="center" style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  padding-bottom: 40px;
                                  word-break: break-word;
                                ">
                                    <div style="
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 38px;
                                    font-weight: bold;
                                    line-height: 1;
                                    text-align: center;
                                    color: #555;
                                  ">
                                        Olá ${forgetPassword.name},
                                    </div>
                                  </td>
                              </tr>

                              <tr>
                                  <td align="center" style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  padding-bottom: 40px;
                                  word-break: break-word;
                                ">
                                    <div style="
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 18px;
                                    line-height: 1;
                                    text-align: center;
                                    color: #555;
                                  ">
                                        Recebemos a solicitação para recuperar sua senha.
                                    </div>
                                  </td>
                              </tr>

                              <tr>
                                  <td align="center" style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  padding-bottom: 40px;
                                  word-break: break-word;
                                ">
                                    <div style="
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 18px;
                                    font-weight: bold;
                                    line-height: 1;
                                    text-align: center;
                                    color: #555;
                                  ">
                                        Para criar uma nova senha, forneça o código abaixo:
                                    </div>
                                  </td>
                              </tr>
                              <tr>
                                  <td align="center" style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  padding-top: 30px;
                                  padding-bottom: 50px;
                                  word-break: break-word;
                                ">
                                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                                        style="border-collapse: separate; line-height: 100%">
                                        <tr>
                                          <td align="center" style="
                                        font-size: 0px;
                                        padding: 10px 25px;
                                        padding-bottom: 40px;
                                        word-break: break-word;
                                      ">
                                              <div style="
                                          font-family: 'Helvetica Neue', Arial,
                                            sans-serif;
                                          font-size: 38px;
                                          font-weight: bold;
                                          line-height: 1;
                                          text-align: center;
                                          color: #219653;
                                        ">
                                                ${forgetPassword.code}
                                              </div>
                                          </td>
                                        </tr>
                                    </table>
                                  </td>
                              </tr>

                              <tr>
                                  <td align="center" style="
                                  font-size: 0px;
                                  padding: 10px 25px;
                                  padding-bottom: 40px;
                                  word-break: break-word;
                                ">
                                    <div style="
                                    font-family: 'Helvetica Neue', Arial, sans-serif;
                                    font-size: 16px;
                                    line-height: 20px;
                                    text-align: center;
                                    color: #7f8fa4;
                                  ">
                                        Se você não solicitou a recuperação de senha,
                                        desconsidere este e-mail e não se preocupe, seus dados
                                        continuam seguros.
                                    </div>
                                  </td>
                              </tr>
                            </table>
                        </div>
                      </td>
                  </tr>
                </tbody>
            </table>
          </div>
      </div>
    </body>

    </html>
    `,
  };

  return mail;
};
