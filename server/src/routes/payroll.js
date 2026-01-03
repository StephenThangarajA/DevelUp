import { Router } from "express";
import prisma from "../prisma/client.js";
import { authenticate, requireRole } from "../middlewares/auth.js";

const router = Router();

const ensureWorkspace = async (userId) => {
  let solution = await prisma.startupSolution.findFirst({ where: { ownerId: userId, name: "Payroll" } });
  if (!solution) {
    solution = await prisma.startupSolution.create({ data: { ownerId: userId, name: "Payroll" } });
  }
  let workspace = await prisma.payrollWorkspace.findUnique({ where: { solutionId: solution.id } });
  if (!workspace) {
    workspace = await prisma.payrollWorkspace.create({ data: { solutionId: solution.id } });
    await prisma.settings.create({ data: { workspaceId: workspace.id } });
  }
  return workspace;
};

router.use(authenticate, requireRole("STARTUP_ADMIN"));

router.get("/employees", async (req, res) => {
  const ws = await ensureWorkspace(req.user.id);
  const items = await prisma.employee.findMany({ where: { workspaceId: ws.id } });
  res.json(items);
});

router.post("/employees", async (req, res) => {
  const ws = await ensureWorkspace(req.user.id);

  // Convert joinDate to ISO-8601 format if present
  let employeeData = { workspaceId: ws.id, ...req.body };
  if (employeeData.joinDate) {
    // Convert YYYY-MM-DD to ISO-8601 DateTime
    employeeData.joinDate = new Date(employeeData.joinDate).toISOString();
  }

  const item = await prisma.employee.create({ data: employeeData });
  res.json(item);
});

router.patch("/employees/:id", async (req, res) => {
  const id = Number(req.params.id);
  const item = await prisma.employee.update({ where: { id }, data: req.body });
  res.json(item);
});

router.delete("/employees/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.employee.delete({ where: { id } });
  res.json({ ok: true });
});

router.get("/payslips", async (req, res) => {
  const ws = await ensureWorkspace(req.user.id);
  const items = await prisma.payslip.findMany({ where: { workspaceId: ws.id } });
  res.json(items);
});

router.post("/payslips/generate", async (req, res) => {
  const ws = await ensureWorkspace(req.user.id);
  const { employeeId, month } = req.body;
  const emp = await prisma.employee.findUnique({ where: { id: employeeId } });
  if (!emp) return res.status(404).json({ error: "Employee not found" });
  const net = emp.baseSalary + emp.allowances - emp.deductions;
  const item = await prisma.payslip.create({
    data: {
      workspaceId: ws.id,
      employeeId,
      month,
      baseSalary: emp.baseSalary,
      allowances: emp.allowances,
      deductions: emp.deductions,
      netSalary: net,
      generatedDate: new Date()
    }
  });
  res.json(item);
});

router.get("/settings", async (req, res) => {
  const ws = await ensureWorkspace(req.user.id);
  const settings = await prisma.settings.findUnique({ where: { workspaceId: ws.id } });
  res.json(settings);
});

router.patch("/settings", async (req, res) => {
  const ws = await ensureWorkspace(req.user.id);
  const settings = await prisma.settings.update({ where: { workspaceId: ws.id }, data: req.body });
  res.json(settings);
});

export default router;

