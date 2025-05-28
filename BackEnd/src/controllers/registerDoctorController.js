doctorController = {}

// INSERT
doctorController.postDoctors = async (req, res) => {
    const { name, specialism, email, password } = req.body;
    const newDoctor = new doctorModel({ name, specialism, email, password });
    await newDoctor.save();
    res.json({ message: "Doctor saved" });
  };