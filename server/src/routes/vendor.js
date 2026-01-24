import { Router } from "express";
import prisma from "../prisma/client.js";
import { authenticate, requireRole } from "../middlewares/auth.js";

const router = Router();

const ensureWorkspace = async (userId) => {
  let solution = await prisma.startupSolution.findFirst({ where: { ownerId: userId, name: "Vendor Management" } });
  if (!solution) {
    solution = await prisma.startupSolution.create({ data: { ownerId: userId, name: "Vendor Management" } });
  }
  let workspace = await prisma.vendorWorkspace.findUnique({ 
    where: { solutionId: solution.id },
    include: { vendors: true, tools: true }
  });
  if (!workspace) {
    workspace = await prisma.vendorWorkspace.create({ 
      data: { solutionId: solution.id },
      include: { vendors: true, tools: true }
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

// Update workspace-level fields (budgets)
router.patch("/", async (req, res) => {
  try {
    const ws = await ensureWorkspace(req.user.id);
    const updatedWs = await prisma.vendorWorkspace.update({
      where: { id: ws.id },
      data: req.body,
      include: { vendors: true, tools: true }
    });
    res.json(updatedWs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Vendors
router.get("/vendors", async (req, res) => {
  try {
    const ws = await ensureWorkspace(req.user.id);
    const vendors = await prisma.vendor.findMany({
      where: { workspaceId: ws.id },
      include: { tools: true }
    });
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/vendors", async (req, res) => {
  try {
    const ws = await ensureWorkspace(req.user.id);
    const { id, ...data } = req.body;
    const vendor = await prisma.vendor.create({
      data: { ...data, workspaceId: ws.id }
    });
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/vendors/:id", async (req, res) => {
  try {
    const vendor = await prisma.vendor.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/vendors/:id", async (req, res) => {
  try {
    await prisma.vendor.delete({
      where: { id: Number(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tools
router.get("/tools", async (req, res) => {
  try {
    const ws = await ensureWorkspace(req.user.id);
    const tools = await prisma.tool.findMany({
      where: { workspaceId: ws.id },
      include: { vendor: true }
    });
    res.json(tools);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/tools", async (req, res) => {
  try {
    const ws = await ensureWorkspace(req.user.id);
    const { id, ...data } = req.body;
    const tool = await prisma.tool.create({
      data: { ...data, workspaceId: ws.id }
    });
    res.json(tool);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/tools/:id", async (req, res) => {
  try {
    const tool = await prisma.tool.update({
      where: { id: Number(req.params.id) },
      data: req.body
    });
    res.json(tool);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/tools/:id", async (req, res) => {
  try {
    await prisma.tool.delete({
      where: { id: Number(req.params.id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
