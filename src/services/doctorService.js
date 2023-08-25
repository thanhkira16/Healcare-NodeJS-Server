import db from "../models/index";

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
        !inputData.contentHTML ||
        !inputData.contentMarkdown
      ) {
        resolve({
          errCode: 1,
          errMsg: "Missing content",
        });
      } else {
        await db.Markdown.create({
          contentHTML: inputData.contentHTML,
          contentMarkdown: inputData.contentMarkdown,
          description: inputData.description,
          doctorId: inputData.doctorId,
        });
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
      console.log("service", inputId);
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
          ],
          attributes: {
            exclude: ["password", "image"],
          },
          raw: true,
          nest: true,
        });
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
};
