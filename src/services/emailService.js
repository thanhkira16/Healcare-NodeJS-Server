require("dotenv").config();
import nodemailer from "nodemailer";

let sendBookingEmail = async (dataSend) => {
  console.log("Sending", dataSend);
  let transporter = nodemailer.createTransport({
    // host: "smtp.forwardemail.net",
    // port: 465,
    // secure: true,
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
    // tls: {
    //   // Use the TLS version you need (e.g., 'TLSv1.2')
    //   ciphers: "TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256",
    // },
  });

  let emailContent = {
    vi: {
      subject: "Xác nhận cuộc hẹn VKU Healcare ✔",
      text: `Chào bạn, ${dataSend.patientName}`,
      html: `
        <p>Chào bạn, ${dataSend.patientName}</p>
        <p>Lịch hẹn của bạn đã được xác nhận. Dưới đây là chi tiết:</p>
        <ul>
          <li><strong>Tên Bác sĩ:</strong> ${dataSend.doctorName}</li>
          <li><strong>Thời gian hẹn:</strong> ${dataSend.time}</li>
          <li><strong>Lý do khám:</strong> ${dataSend.reason}</li>
        </ul>
        <p>Để xem chi tiết cuộc hẹn và thực hiện bất kỳ thay đổi nào, vui lòng nhấp vào liên kết sau đây:</p>
        <p><a href="${dataSend.redirectLink}">Nhấn vào đây</a></p>
        <p>Cảm ơn bạn đã chọn VKU Healthcare.</p>
        <p>Trân trọng,<br>Đội ngũ VKU Healthcare</p>
      `,
    },
    en: {
      subject: "VKU Healcare Confirmation ✔",
      text: `Dear ${dataSend.patientName}`,
      html: `
        <p>Dear ${dataSend.patientName}</p>
        <p>Your appointment has been confirmed. Here are the details:</p>
        <ul>
          <li><strong>Doctor Name:</strong> ${dataSend.doctorName}</li>
          <li><strong>Appointment Time:</strong> ${dataSend.time}</li>
          <li><strong>Reason:</strong> ${dataSend.time}</li>
        </ul>
        <p>To view your appointment details and make any changes, please click the following link:</p>
        <p><a href="${dataSend.redirectLink}">Click here</a></p>
        <p>Thank you for choosing VKU Healthcare.</p>
        <p>Sincerely,<br>VKU Healthcare Team</p>
      `,
    },
  };

  let emailLanguage = emailContent[dataSend.language || "en"];

  let info = await transporter.sendMail({
    from: '"VKU Healcare 👻" <thanhtruong16092004@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: emailLanguage.subject,
    text: emailLanguage.text,
    html: emailLanguage.html,
  });
};

module.exports = {
  sendBookingEmail,
};
