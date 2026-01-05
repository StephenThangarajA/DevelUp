import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/products.js";
import helpdeskRoutes from "./routes/helpdesk.js";
import auditRoutes from "./routes/audit.js";
import payrollRoutes from "./routes/payroll.js";
import studentRoutes from "./routes/students.js";
import aptitudeMentorRoutes from "./routes/aptitudeMentor.js";
import mockAssessmentRoutes from "./routes/mockAssessment.js";

dotenv.config();

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/helpdesk", helpdeskRoutes);
app.use("/audit", auditRoutes);
app.use("/payroll", payrollRoutes);
app.use("/students", studentRoutes);
app.use("/aptitude-mentor", aptitudeMentorRoutes);
app.use("/mock-assessment", mockAssessmentRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
});

export default app;

