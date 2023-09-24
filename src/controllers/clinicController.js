import ClinicService from "../services/clinicService";

let getAllClinics = async (req, res) => {
  try {
    let data = await ClinicService.getAllClinicsService();
    return res.status(200).json(data);
  } catch (err) {
    console.log("getAllClinics error: ", err);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error getAllClinics: " + err,
    });
  }
};
let createClinic = async (req, res) => {
  try {
    //   console.log("check req", req.body.doctorId, req.body);
    let data = await ClinicService.createClinicService(req.body);

    return res.status(200).json(data);
  } catch (err) {
    console.log("createClinic error: ", err);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error createClinic: " + err,
    });
  }
};
let getDetailClinicById = async (req, res) => {
  try {
    let data = await ClinicService.getDetailClinicByIdService(req.query.id);
    return res.status(200).json(data);
  } catch (err) {
    console.log("getDetailClinicById error: ", err);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error getDetailClinicById: " + err,
    });
  }
};
module.exports = {
  createClinic,
  getAllClinics,
  getDetailClinicById,
};
