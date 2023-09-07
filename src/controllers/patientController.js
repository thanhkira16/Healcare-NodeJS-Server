import patientService from "../services/patientService";
let postBookAppointment = async (req, res) => {
  try {
    console.log("check req", req.body.doctorId, req.body);
    let data = await patientService.postBookAppointmentService(req.body);
    console.log(data);
    return res.status(200).json(data);
  } catch (err) {
    console.log("postBookAppointment error: ", err);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error postBookAppointment: " + err,
    });
  }
};
module.exports = {
  postBookAppointment,
};
