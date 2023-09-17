import db from "../models/index";
import emailService from "../services/emailService";
require("dotenv").config();
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (doctorId, token) => {
  let results = `${process.env.REACT_URL}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return results;
};

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
        !data.language ||
        !data.reason
      ) {
        resolve({
          errCode: 1,
          errMsg: "Missing required parameter from patient serviece",
        });
      } else {
        let token = uuidv4();
        await emailService.sendBookingEmail({
          receiverEmail: data.email,
          patientName: data.fullname,
          time: data.time,
          doctorName: data.doctorName,
          language: data.language,
          reason: data.reason,
          redirectLink: buildUrlEmail(data.doctorId, token),
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
              token: token,
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
let postVerifyBookAppointmentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("data service: ", data);
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMsg:
            "Missing required parameter from verify booking patient serviece",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });

        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMsg: "Successfully verify booking patient",
          });
        } else {
          resolve({
            errCode: 2,
            errMsg: "verifying booking patient failed",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  postBookAppointmentService,
  postVerifyBookAppointmentService,
};
