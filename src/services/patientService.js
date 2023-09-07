import db from "../models/index";
import emailService from "../services/emailService";
let postBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("data service: ", data);
      if (
        !data.email ||
        !data.doctorId ||
        !data.time ||
        !data.date ||
        !data.fullname ||
        !data.doctorName ||
        !data.language
      ) {
        resolve({
          errCode: 1,
          errMsg: "Missing required parameter from patient serviece",
        });
      } else {
        await emailService.sendBookingEmail({
          receiverEmail: data.email,
          patientName: data.fullname,
          time: data.time,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: "https://nodemailer.com/",
        });

        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
          },
        });
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
            },
          });
        }
        resolve({
          errCode: 0,
          errMsg: "Successfully patient created",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  postBookAppointmentService,
};
