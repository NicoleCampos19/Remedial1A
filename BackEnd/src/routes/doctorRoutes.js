import express from "express";
import doctorController from "../controllers/doctorController.js";

const router = express.Router();

router.
route("/")
.get(doctorController.getDoctors);

router.
route("/:id")
.delete(doctorController.deleteDoctors)
.put(doctorController.putDoctors);

export default router;