import { Router } from "express";
import prisma from "../prisma/client.js";
import { authenticate, requireRole } from "../middlewares/auth.js";

const router = Router();

router.use(authenticate, requireRole("STUDENT"));

router.get("/resume", async (req, res) => {
  const item = await prisma.resume.findFirst({ where: { userId: req.user.id } });
  res.json(item || null);
});

router.post("/resume", async (req, res) => {
  const existing = await prisma.resume.findFirst({ where: { userId: req.user.id } });
  if (existing) {
    const updated = await prisma.resume.update({ where: { id: existing.id }, data: { data: req.body } });
    return res.json(updated);
  }
  const created = await prisma.resume.create({ data: { userId: req.user.id, data: req.body } });
  res.json(created);
});

export default router;

