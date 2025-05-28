// Importo todo lo de la libreria de Express
import express from "express";
import cookieParser from "cookie-parser";
import doctorRoutes from "./src/routes/doctorRoutes.js";
import recoveryPasswordRoutes from "./src/routes/recoveryPassword.js";
import registerDoctor from "./src/routes/registerDoctor.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/doctors", doctorRoutes);

app.use("/api/register", registerDoctor);

app.use("/api/RecoveryPassword", recoveryPasswordRoutes);

export default app;