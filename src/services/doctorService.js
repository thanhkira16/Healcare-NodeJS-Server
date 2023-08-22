import db from "../models/index";

const getTopDoctorHome = async (numOfDoctors) => {
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
        limit: numOfDoctors,
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

module.exports = {
  getTopDoctorHome,
};
