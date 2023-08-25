import db from "../models/index";
import doctorService from "../services/doctorService";

const getTopDoctorHome = async (req, res) => {
  const numOfDoctors = req.query.numOfDoctors || 10; // Default to 10 doctors if not provided
  try {
    const response = await doctorService.getTopDoctorHomeService(+numOfDoctors);
    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in getTopDoctorHome:", error);
    return res.status(500).json({
      errCode: -1,
      errMessage: "An error occurred at get doctor",
    });
  }
};

let getAllDoctors = async (req, res) => {
  try {
    let data = await doctorService.getAllDoctors();
    return res.status(200).json(data);
  } catch (err) {
    console.log("Get all doctor service error: ", err);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error getting all doctor service",
    });
  }
};
let postInfoDoctor = async (req, res) => {
  try {
    let data = await doctorService.saveInfoDoctor(req.body);
    return res.status(200).json(data);
  } catch (err) {
    console.log("Get all doctor service error: ", err);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error getting all doctor controllers",
    });
  }
};

let getDetailDoctorById = async (req, res) => {
  try {
    let data = await doctorService.getDetailDoctorByIdService(req.query.id);
    return res.status(200).json(data);
  } catch (err) {
    console.log("Get detail doctor error: ", err);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error getting doctor by id service",
    });
  }
};
module.exports = {
  getTopDoctorHome,
  getAllDoctors,
  postInfoDoctor,
  getDetailDoctorById,
};
