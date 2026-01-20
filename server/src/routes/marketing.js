import { Router } from "express";
import prisma from "../prisma/client.js";
import { authenticate, requireRole } from "../middlewares/auth.js";

const router = Router();

const ensureWorkspace = async (userId) => {
  let solution = await prisma.startupSolution.findFirst({ where: { ownerId: userId, name: "Marketing" } });
  if (!solution) {
    solution = await prisma.startupSolution.create({ data: { ownerId: userId, name: "Marketing" } });
  }
  let workspace = await prisma.marketingWorkspace.findUnique({ 
    where: { solutionId: solution.id },
    include: { customers: true }
  });
  if (!workspace) {
    workspace = await prisma.marketingWorkspace.create({ 
      data: { solutionId: solution.id },
      include: { customers: true }
    });
  }
  return workspace;
};

router.use(authenticate, requireRole("STARTUP_ADMIN"));

// Get full workspace data
router.get("/", async (req, res) => {
  try {
    const ws = await ensureWorkspace(req.user.id);
    res.json(ws);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update workspace-level fields (brandFoundation, contentPlans, socialMedia, businessAnalyses)
router.patch("/", async (req, res) => {
  try {
    const ws = await ensureWorkspace(req.user.id);
    const updatedWs = await prisma.marketingWorkspace.update({
      where: { id: ws.id },
      data: req.body,
      include: { customers: true }
    });
    res.json(updatedWs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Customers
router.get("/customers", async (req, res) => {
  try {
    const ws = await ensureWorkspace(req.user.id);
    const customers = await prisma.marketingCustomer.findMany({
      where: { workspaceId: ws.id }
    });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/customers", async (req, res) => {
  try {
    const ws = await ensureWorkspace(req.user.id);
    const { id, ...data } = req.body;
    const customer = await prisma.marketingCustomer.create({
      data: { ...data, workspaceId: ws.id }
    });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/customers/:id", async (req, res) => {
  try {
    const customer = await prisma.marketingCustomer.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/customers/:id", async (req, res) => {
  try {
    await prisma.marketingCustomer.delete({
      where: { id: Number(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
