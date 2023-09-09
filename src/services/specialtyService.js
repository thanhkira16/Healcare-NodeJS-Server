import db from "../models/index";

let getAllSpecialtiesService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const specialties = await db.Specialty.findAll();

      if (specialties && specialties.length > 0) {
        specialties.forEach((specialty) => {
          specialty.image = Buffer.from(specialty.image, "base64").toString(
            "binary"
          );
        });
        resolve({
          errCode: 0,
          errMsg: "Get all specialties successfully",
          data: specialties,
        });
      } else {
        resolve({
          errCode: 1,
          errMsg: "Get all specialties failed",
          data: specialties,
        });
      }
    } catch (error) {
      reject(new Error(`Error fetching specialties: ${error.message}`));
    }
  });
};

let createSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { name, imageBase64, descriptionHTML, descriptionMarkdown } = data;

      // Check if any of the required fields are empty or undefined
      if (!name || !imageBase64 || !descriptionHTML || !descriptionMarkdown) {
        resolve({
          errCode: 1,
          errMsg: "Missing required parameter from patient serviece",
        });
      }

      // Create a new specialty record in the database
      const newSpecialty = await db.Specialty.create({
        name,
        image: imageBase64, // Assuming imageBase64 contains the binary image data
        descriptionHTML,
        descriptionMarkdown,
      });

      // If the specialty was created successfully, resolve with the created specialty
      resolve({
        errCode: 0,
        errMsg: "Successfully patient created",
        Specialty: newSpecialty,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createSpecialtyService,
  getAllSpecialtiesService,
};
