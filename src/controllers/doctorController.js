import db from "../models/index";
import doctorService from "../services/doctorService";

const getTopDoctorHome = async (req, res) => {
  const numOfDoctors = req.query.numOfDoctors || 10; // Default to 10 doctors if not provided
  try {
    const response = await doctorService.getTopDoctorHome(+numOfDoctors);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in getTopDoctorHome:", error);
    return res.status(500).json({
      errCode: -1,
      errMessage: "An error occurred at get doctor",
    });
  }
};

module.exports = {
  getTopDoctorHome,
};
