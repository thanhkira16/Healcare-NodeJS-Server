import db from "../models/index";

let getAllClinicsService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const clinics = await db.Clinic.findAll();

      if (clinics && clinics.length > 0) {
        clinics.forEach((specialty) => {
          specialty.image = Buffer.from(specialty.image, "base64").toString(
            "binary"
          );
        });
        resolve({
          errCode: 0,
          errMsg: "Get all clinics successfully",
          data: clinics,
        });
      } else {
        resolve({
          errCode: 1,
          errMsg: "Get all clinics failed",
          data: clinics,
        });
      }
    } catch (error) {
      reject(new Error(`Error fetching clinics: ${error.message}`));
    }
  });
};
let createClinicService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        name,
        address,
        imageBase64,
        descriptionHTML,
        descriptionMarkdown,
      } = data;

      // Check if any of the required fields are empty or undefined
      if (
        !name ||
        !address ||
        !imageBase64 ||
        !descriptionHTML ||
        !descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMsg: "Missing required parameter from patient serviece",
        });
      }

      // Create a new Clinic record in the database
      const newClinic = await db.Clinic.create({
        name,
        image: imageBase64, // Assuming imageBase64 contains the binary image data
        descriptionHTML,
        descriptionMarkdown,
        address,
      });

      // If the Clinic was created successfully, resolve with the created Clinic
      resolve({
        errCode: 0,
        errMsg: "Successfully clinic created",
        Clinic: newClinic,
      });
    } catch (error) {
      reject(error);
    }
  });
};

let getDetailClinicByIdService = async (inputId) => {
  try {
    if (!inputId) {
      return {
        errCode: 1,
        errMsg: "Missing required parameter from getDetailClinicByIdService",
      };
    }

    // Find specialty details
    let data = await db.Clinic.findOne({
      where: { id: inputId },
      raw: false,
      attributes: ["descriptionHTML", "descriptionMarkdown", "image"],
    });

    if (!data) {
      return {
        errCode: 2,
        errMsg: "No clinic found for the given input",
        data: {},
      };
    }

    let doctorClinic = [];
    doctorClinic = await db.Doctor_Infor.findAll({
      where: { clinicId: inputId },
      attributes: ["doctorId", "clinicId"],
    });
    return {
      errCode: 0,
      errMsg: "Successfully getDetailClinicByIdService",
      data: data,
      listDoctors: doctorClinic,
    };
  } catch (error) {
    console.error("Error in getDetailClinicByIdService:", error);
    return {
      errCode: 3,
      errMsg: "An error occurred while processing the request",
    };
  }
};

module.exports = {
  createClinicService,
  getAllClinicsService,
  getDetailClinicByIdService,
};
