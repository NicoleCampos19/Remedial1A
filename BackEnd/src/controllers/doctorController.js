//Array de metodos (C R U D)
const doctorController = {};
import doctorModel from "../models/Doctor.js";

// SELECT
doctorController.getDoctors = async (req, res) => {
  const doctors = await doctorModel.find();
  res.json(doctors);
};

// DELETE
doctorController.deleteDoctors = async (req, res) => {
const doctorDeleted = await doctorModel.findByIdAndDelete(req.params.id);
  if (!doctorDeleted) {
    return res.status(404).json({ message: "Doctor not found" });
  }
  res.json({ message: "Doctor deleted" });
};

// UPDATE
doctorController.putDoctors = async (req, res) => {
  // Solicito todos los valores
  const { name, specialism, email, password  } = req.body;
  // Actualizo
  await doctorModel.findByIdAndUpdate(
    req.params.id,
    {
        name, specialism, email, password
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "Doctor updated" });
};

export default doctorController;