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
      errMessage: error,
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
    // console.log(req.body);
    // console.log(req.query);
    let data = await doctorService.saveInfoDoctor(req.body);
    return res.status(200).json(data);
  } catch (err) {
    console.log("post infor doctor service error: ", err);
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
let getScheduleDoctorByDate = async (req, res) => {
  try {
    // console.log(req.query);
    let data = await doctorService.getScheduleDoctorByDateService(
      req.query.doctorId,
      req.query.date.trim()
    );
    return res.status(200).json(data);
  } catch (err) {
    console.log("Get getScheduleDoctorByDate: ", err);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error getScheduleDoctorByDate service" + err,
    });
  }
};

let bulkCreateSchedule = async (req, res) => {
  try {
    let data = await doctorService.bulkCreateScheduleService(req.body);
    // console.log(req.body);
    return res.status(200).json(data);
  } catch (err) {
    console.log("bulkCreateSchedule error: ", err);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error bulkCreateSchedule",
    });
  }
};
module.exports = {
  getTopDoctorHome,
  getAllDoctors,
  postInfoDoctor,
  getDetailDoctorById,
  bulkCreateSchedule,
  getScheduleDoctorByDate,
};
