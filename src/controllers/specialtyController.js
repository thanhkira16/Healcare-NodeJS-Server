import specialtyService from "../services/specialtyService";
let createSpecialty = async (req, res) => {
  try {
    //   console.log("check req", req.body.doctorId, req.body);
    let data = await specialtyService.createSpecialtyService(req.body);

    return res.status(200).json(data);
  } catch (err) {
    console.log("createSpecialty error: ", err);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error createSpecialty: " + err,
    });
  }
};

let getAllSpecialties = async (req, res) => {
  try {
    let data = await specialtyService.getAllSpecialtiesService();
    return res.status(200).json(data);
  } catch (err) {
    console.log("getAllSpecialties error: ", err);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error getAllSpecialties: " + err,
    });
  }
};
module.exports = {
  createSpecialty,
  getAllSpecialties,
};
