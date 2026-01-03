import { Router } from "express";
import prisma from "../prisma/client.js";
import { authenticate } from "../middlewares/auth.js";
import { ensureProductExists, startTrialIfAllowed, consumeTrialUnit } from "../services/trialService.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

router.post("/seed", async (req, res) => {
  await ensureProductExists("helpdesk", "HelpDesk System", "startup", 7, 20);
  await ensureProductExists("audit", "Audit System", "startup", 7, 20);
  await ensureProductExists("payroll", "Payroll System", "startup", 7, 20);
  await ensureProductExists("resume", "Resume Builder", "student", 7, 10);
  await ensureProductExists("ats", "ATS Resume Checker", "student", 7, 10);
  await ensureProductExists("coverletter", "Cover Letter Generator", "student", 7, 10);
  res.json({ ok: true });
});

router.post("/:key/trial/start", authenticate, async (req, res) => {
  try {
    const trial = await startTrialIfAllowed(req.user.id, req.params.key);
    res.json(trial);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.post("/:key/trial/consume", authenticate, async (req, res) => {
  try {
    const trial = await consumeTrialUnit(req.user.id, req.params.key);
    res.json(trial);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;

