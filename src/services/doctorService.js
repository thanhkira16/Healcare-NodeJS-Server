import db from "../models/index";
require("dotenv").config();
import _ from "lodash";
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
const getTopDoctorHomeService = async (numOfdoctors) => {
  return new Promise(async (resolve, reject) => {
    try {
      const doctors = await db.User.findAll({
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        limit: numOfdoctors,
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        doctors: doctors,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getAllDoctors = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = [];
      data = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve({
        errCode: 0,
        doctors: data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let saveInfoDoctor = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !inputData.doctorId ||
        !inputData.selectedPrice ||
        !inputData.selectedPayment ||
        !inputData.selectedProvince ||
        !inputData.nameClinic ||
        !inputData.addressClinic ||
        !inputData.note
      ) {
        resolve({
          errCode: 1,
          errMsg: "Missing one or more required fields",
        });
      } else {
        //upsert markdown
        if (inputData.action === "CREATE") {
          await db.Markdown.create({
            contentHTML: inputData.contentHTML,
            contentMarkdown: inputData.contentMarkdown,
            description: inputData.description,
            doctorId: inputData.doctorId,
          });
        } else if (inputData.action === "EDIT") {
          const doctorMarkdown = await db.Markdown.findOne({
            where: { doctorId: inputData.doctorId },
            raw: false,
          });
          let markdownID = doctorMarkdown.id;
          if (doctorMarkdown) {
            const updatedData = {
              contentHTML: inputData.contentHTML,
              contentMarkdown: inputData.contentMarkdown,
              description: inputData.description,
            };
            // console.log("update markdown", updatedData);
            // console.log("markdown", markdownID);
            await db.Markdown.update(updatedData, {
              where: { id: markdownID },
            });
          }
        }

        //upsert doctor information
        let doctorInfo = await db.Doctor_Infor.findOne({
          where: {
            doctorId: inputData.doctorId,
            // raw: true,
          },
        });
        if (doctorInfo) {
          // If Doctor_Infor exists, update it
          await db.Doctor_Infor.update(
            {
              priceId: inputData.selectedPrice,
              paymentId: inputData.selectedPayment,
              provinceId: inputData.selectedProvince,
              nameClinic: inputData.nameClinic,
              addressClinic: inputData.addressClinic,
              note: inputData.note,
            },
            {
              where: {
                doctorId: inputData.doctorId,
              },
            }
          );
        } else {
          // If Doctor_Infor doesn't exist, create it
          await db.Doctor_Infor.create({
            doctorId: inputData.doctorId,
            priceId: inputData.selectedPrice,
            provinceId: inputData.selectedPayment,
            paymentId: inputData.selectedProvince,
            nameClinic: inputData.nameClinic,
            addressClinic: inputData.addressClinic,
            note: inputData.note,
          });
        }
        resolve({
          errCode: 0,
          errMsg: "Save information seccessfully",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailDoctorByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMsg: "Missing required parameter",
        });
      } else {
        let dataDb = await db.User.findOne({
          where: { id: inputId },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },

            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueVi", "valueEn"],
            },
            {
              model: db.Doctor_Infor,

              attributes: {
                exclude: ["id", "doctorId", "createdAt", "updatedAt"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueVI", "valueEN"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueVI", "valueEN"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueVI", "valueEN"],
                },
              ],
            },
          ],
          attributes: {
            exclude: ["password"],
          },
          raw: false,
          nest: true,
        });

        if (dataDb && dataDb.image) {
          dataDb.image = Buffer.from(dataDb.image, "base64").toString("binary");
        }

        resolve({
          errCode: 0,
          data: dataDb,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

const bulkCreateScheduleService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arraySchedule || !data.doctorId || !data.formatedDate) {
        resolve({
          errCode: 1,
          errMsg: "Missing array schedule",
        });
      } else {
        let schedule = data.arraySchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
        }
        //get all existing schedules
        let existing = await db.Schedule.findAll({
          where: { doctorId: data.doctorId, date: data.formatedDate },
          attributes: ["timeType", "date", "doctorId", "maxNumber"],
          raw: true,
        });

        //compare different
        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        });

        // console.log("to create", toCreate);

        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }
        resolve({
          errCode: 0,
          errMsg: "Save schedule successfully",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getScheduleDoctorByDateService = (doctorId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!doctorId || !date) {
        resolve({
          errCode: 1,
          errMsg: "Missing required parameters",
        });
      } else {
        let dataSchedule = await db.Schedule.findAll({
          where: {
            doctorId: doctorId,
            date: date,
          },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueVi", "valueEn"],
            },
          ],
          raw: false,
          nest: true,
        });
        console.log(dataSchedule);
        if (!dataSchedule) dataSchedule = [];
        resolve({
          errCode: 0,
          data: dataSchedule,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getExtraInforDoctorByIDService = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    console.log(doctorId);
    try {
      if (!doctorId) {
        resolve({
          errCode: 1,
          errMsg: "Missing required parameters",
        });
      } else {
        let doctor_infor = await db.Doctor_Infor.findOne({
          where: {
            doctorId: doctorId,
          },
          attributes: {
            exclude: ["id", "doctorId", "createdAt", "updatedAt"],
          },
          include: [
            {
              model: db.Allcode,
              as: "priceTypeData",
              attributes: ["valueVI", "valueEN"],
            },
            {
              model: db.Allcode,
              as: "provinceTypeData",
              attributes: ["valueVI", "valueEN"],
            },
            {
              model: db.Allcode,
              as: "paymentTypeData",
              attributes: ["valueVI", "valueEN"],
            },
          ],
          raw: false,
          nest: true,
        });
        console.log(doctor_infor);
        if (!doctor_infor) doctor_infor = {};
        resolve({
          errCode: 0,
          data: doctor_infor,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getProfileDoctorByIDService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMsg: "Missing required parameter",
        });
      } else {
        let dataDb = await db.User.findOne({
          where: { id: inputId },
          include: [
            {
              model: db.Markdown,
              // attributes: ["description", "contentHTML", "contentMarkdown"],
              attributes: ["description"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueVi", "valueEn"],
            },
            {
              model: db.Doctor_Infor,

              attributes: {
                exclude: ["id", "doctorId", "createdAt", "updatedAt"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueVI", "valueEN"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueVI", "valueEN"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueVI", "valueEN"],
                },
              ],
            },
          ],
          attributes: {
            exclude: ["password"],
          },
          raw: false,
          nest: true,
        });

        if (dataDb && dataDb.image) {
          dataDb.image = Buffer.from(dataDb.image, "base64").toString("binary");
        }

        resolve({
          errCode: 0,
          data: dataDb,
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getTopDoctorHomeService,
  getAllDoctors,
  saveInfoDoctor,
  getDetailDoctorByIdService,
  bulkCreateScheduleService,
  getScheduleDoctorByDateService,
  getExtraInforDoctorByIDService,
  getProfileDoctorByIDService,
};
