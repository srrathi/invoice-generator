const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports.sendInvoiceEmail = function (invoice) {
  const { items, status, dueDate, invoiceId, notes, date, emails, companyName } = invoice;
  var Total = 0;

  var mailOptions = {
    from: process.env.EMAIL,
    to: ["srrathi2000@gmail.com", emails].join(","),
    subject: "Service Invoice for your services",
    html: `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
    
        <title>Service Invoice</title>
    
    
        <!-- Invoice styling -->
        <style>
          body {
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            text-align: center;
            color: #777;
          }
    
          body h1 {
            font-weight: 300;
            margin-bottom: 0px;
            padding-bottom: 0px;
            color: #000;
          }
    
          body h3 {
            font-weight: 300;
            margin-top: 10px;
            margin-bottom: 20px;
            font-style: italic;
            color: #555;
          }
    
          body a {
            color: #06f;
          }
    
          .invoice-box {
            max-width: 800px;
            margin: auto;
            padding: 30px;
            border: 1px solid #eee;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
            font-size: 16px;
            line-height: 24px;
            font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
            color: #555;
          }
    
          .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
            border-collapse: collapse;
          }
    
          .invoice-box table td {
            padding: 5px;
            vertical-align: top;
          }
    
          .invoice-box table tr td:nth-child(2) {
            text-align: right;
          }
    
          .invoice-box table tr.top table td {
            padding-bottom: 20px;
          }
    
          .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
          }
    
          .invoice-box table tr.information table td {
            padding-bottom: 40px;
          }
    
          .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
          }
    
          .invoice-box table tr.details td {
            padding-bottom: 20px;
          }
    
          .invoice-box table tr.item td {
            border-bottom: 1px solid #eee;
          }
    
          .invoice-box table tr.item.last td {
            border-bottom: none;
          }
    
          .invoice-box table tr.total td:nth-child(2) {
            border-top: 2px solid #eee;
            font-weight: bold;
          }
    
          @media only screen and (max-width: 600px) {
            .invoice-box table tr.top table td {
              width: 100%;
              display: block;
              text-align: center;
            }
    
            .invoice-box table tr.information table td {
              width: 100%;
              display: block;
              text-align: center;
            }
          }
        </style>
      </head>
    
      <body>
        <h3>Please Clear your Payment as per below Invoice</h3>
        <br /><br />
    
        <div class="invoice-box">
          <table>
            <tr class="top">
              <td colspan="2">
                <table>
                  <tr>
                    <td class="title">
                      <img src="https://cdn2.iconfinder.com/data/icons/commerce-48/64/Icon_Color_8-512.png" alt="Company logo" style="width: 100%; max-width: 150px" />
                    </td>
    
                    <td>
                      Invoice: #${invoiceId}<br />
                      Created: ${date}<br />
                      Due: ${dueDate}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>${companyName}</h3>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
    
            <tr class="information">
              <td colspan="2">
                <table>
                  <tr>
                    <td>
                      Outside Jassusar Gate<br />
                      Bikaner-334001 , Rajasthan
                    </td>
    
                    <td>
                      Rathi Group of Industries<br />
                      Sitaram Rathi<br />
                      srrathi2000@gmail.com
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
    
            <tr class="heading">
              <td>Notes</td>
    
              <td>Payment Status</td>
            </tr>
    
            <tr class="details">
              <td>${notes}</td>
    
              <td>${status}</td>
            </tr>
    
            <tr class="heading">
              <td>Service</td>
              <td>Hour</td>
              <td>Rate/Hr.</td>
              <td>Exp.</td>
            </tr>

            ${items.map((item) => {
              Total += item.expenses;
              return (`<tr class="item">
                  <td>${item.name}</td>
                  <td>${item.hoursOfWork}</td>
                  <td>$${item.rate}/hr.</td>
                  <td>$${item.expenses}</td>
                </tr>`)
            })}
    
            
    
            <tr class="total">
              <td></td>
              <td></td>
              <td>Total: </td>
              <td>$${Total}/-</td>
            </tr>
          </table>
        </div>
      </body>
    </html>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      return info.response;
    }
  });
};
