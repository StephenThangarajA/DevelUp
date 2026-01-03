import { Router } from "express";
import prisma from "../prisma/client.js";
import { authenticate, requireRole } from "../middlewares/auth.js";

const router = Router();

const ensureWorkspace = async (userId) => {
  let solution = await prisma.startupSolution.findFirst({ where: { ownerId: userId, name: "Audit" } });
  if (!solution) {
    solution = await prisma.startupSolution.create({ data: { ownerId: userId, name: "Audit" } });
  }
  let workspace = await prisma.auditWorkspace.findUnique({ where: { solutionId: solution.id } });
  if (!workspace) {
    workspace = await prisma.auditWorkspace.create({ data: { solutionId: solution.id } });
  }
  return workspace;
};

router.use(authenticate, requireRole("STARTUP_ADMIN"));

router.get("/audits", async (req, res) => {
  const ws = await ensureWorkspace(req.user.id);
  const items = await prisma.audit.findMany({ where: { workspaceId: ws.id } });
  res.json(items);
});

const normalizeAuditDates = (body) => {
  const toDate = (value) => {
    if (!value) return null;
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  };
  return {
    ...body,
    startDate: toDate(body.startDate),
    dueDate: toDate(body.dueDate),
  };
};

router.post("/audits", async (req, res) => {
  const ws = await ensureWorkspace(req.user.id);
  const data = { workspaceId: ws.id, ...normalizeAuditDates(req.body) };
  const item = await prisma.audit.create({ data });
  res.json(item);
});

router.patch("/audits/:id", async (req, res) => {
  const id = Number(req.params.id);
  const data = normalizeAuditDates(req.body);
  const item = await prisma.audit.update({ where: { id }, data });
  res.json(item);
});

router.delete("/audits/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.audit.delete({ where: { id } });
  res.json({ ok: true });
});

router.get("/findings", async (req, res) => {
  const ws = await ensureWorkspace(req.user.id);
  const audits = await prisma.audit.findMany({ where: { workspaceId: ws.id } });
  const items = await prisma.finding.findMany({ where: { auditId: { in: audits.map(a => a.id) } } });
  res.json(items);
});

router.post("/findings", async (req, res) => {
  const { dueDate, ...body } = req.body; // Remove dueDate as it's not in the schema
  const data = {
    ...body,
    auditId: Number(body.auditId),
    date: body.date ? new Date(body.date) : null,
  };
  const item = await prisma.finding.create({ data });
  res.json(item);
});

router.patch("/findings/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { dueDate, ...body } = req.body; // Remove dueDate as it's not in the schema
  const data = {
    ...body,
    auditId: body.auditId ? Number(body.auditId) : undefined,
    date: body.date ? new Date(body.date) : undefined,
  };
  const item = await prisma.finding.update({ where: { id }, data });
  res.json(item);
});

router.delete("/findings/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.finding.delete({ where: { id } });
  res.json({ ok: true });
});

router.get("/settings", async (req, res) => {
  const ws = await ensureWorkspace(req.user.id);
  let settings = await prisma.auditSettings.findUnique({ where: { workspaceId: ws.id } });
  if (!settings) {
    settings = await prisma.auditSettings.create({
      data: { workspaceId: ws.id }
    });
  }
  res.json(settings);
});

router.patch("/settings", async (req, res) => {
  const ws = await ensureWorkspace(req.user.id);
  let settings = await prisma.auditSettings.findUnique({ where: { workspaceId: ws.id } });
  if (!settings) {
    settings = await prisma.auditSettings.create({
      data: { workspaceId: ws.id, ...req.body }
    });
  } else {
    settings = await prisma.auditSettings.update({
      where: { workspaceId: ws.id },
      data: req.body
    });
  }
  res.json(settings);
});

export default router;
