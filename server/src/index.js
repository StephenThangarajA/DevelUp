import dotenv from "dotenv";
import app from "./app.js";
import { ensureProductExists } from "./services/trialService.js";

dotenv.config();

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
  (async () => {
    try {
      await ensureProductExists("helpdesk", "HelpDesk System", "startup", 7, 20);
      await ensureProductExists("audit", "Audit System", "startup", 7, 20);
      await ensureProductExists("payroll", "Payroll System", "startup", 7, 20);
      await ensureProductExists("resume", "Resume Builder", "student", 7, 10);
      await ensureProductExists("ats", "ATS Resume Checker", "student", 7, 10);
      await ensureProductExists("coverletter", "Cover Letter Generator", "student", 7, 10);
      await ensureProductExists("aptitudementor", "Aptitude Mentor", "student", 7, 10);
      await ensureProductExists("mockassesment", "Mock Assessment", "student", 7, 10);
    } catch (e) {
      console.error("Product seeding failed:", e.message);
    }
  })();
});
