const e = require('cors');
const nodemailer = require('nodemailer');

const sendMailForOrder = async (fullname, email,order) => {
  console.log(fullname, email);
  const transporter = nodemailer.createTransport({
    host: 'mail.webluna.org',
    port: 587,
    secure: false,
    auth: {
      user: 'order@webluna.org',
      pass: '',
    },
  });

  try {
    const info = await transporter.sendMail({
      from: 'order@webluna.org',
      to: `${fullname} <${email}>`,
      subject: 'Order approved!',
      text: 'Your order has been successfully approved!',
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border:1px solid #eee; border-radius: 10px; overflow: hidden;">
        <div style="background:#4CAF50; padding: 20px; text-align: center; color: white;">
          <h2>✅ Sifarişiniz təsdiqləndi!</h2>
        </div>
        <div style="padding: 20px;">
          <p>Salam <b>${order.customerName}</b>,</p>
          <p>Sizin sifarişiniz uğurla qeydə alındı. Sifariş detalları aşağıdadır:</p>

          <table style="width:100%; border-collapse: collapse; margin-top: 15px;">
            <thead>
              <tr style="background:#f2f2f2;">
                <th style="padding:10px; border:1px solid #ddd; text-align:left;">Məhsul</th>
                <th style="padding:10px; border:1px solid #ddd; text-align:center;">Say</th>
                <th style="padding:10px; border:1px solid #ddd; text-align:right;">Qiymət</th>
              </tr>
            </thead>
            <tbody>
              ${order?.items?.map(
                  (item) => `
                <tr>
                  <td style="padding:10px; border:1px solid #ddd;">${item?.name}</td>
                  <td style="padding:10px; border:1px solid #ddd; text-align:center;">${item?.qty}</td>
                  <td style="padding:10px; border:1px solid #ddd; text-align:right;">${item?.price} ₼</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>

          <h3 style="text-align:right; margin-top:20px;">Cəmi: ${order.total} ₼</h3>

          <p style="margin-top:20px;">Çatdırılma ünvanı:</p>
          <p><b>${order.address}</b></p>

          <p style="margin-top:20px;">Əlavə suallarınız olarsa, bizimlə əlaqə saxlaya bilərsiniz.</p>
        </div>
        <div style="background:#f2f2f2; padding: 15px; text-align:center; font-size: 12px; color: #555;">
          © ${new Date().getFullYear()} Stardecor – Bütün hüquqlar qorunur.
        </div>
      </div>
    `,
    });

    console.log('Message sent:', info.messageId);
  } catch (err) {
    console.error('Mail göndərilmədi:', err);
  }
};
module.exports = { sendMailForOrder };
