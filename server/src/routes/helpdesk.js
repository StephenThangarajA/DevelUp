import { Router } from "express";
import prisma from "../prisma/client.js";
import { authenticate, requireRole } from "../middlewares/auth.js";

const router = Router();

const ensureWorkspace = async (userId) => {
  let solution = await prisma.startupSolution.findFirst({ where: { ownerId: userId, name: "HelpDesk" } });
  if (!solution) {
    solution = await prisma.startupSolution.create({ data: { ownerId: userId, name: "HelpDesk" } });
  }
  let workspace = await prisma.helpdeskWorkspace.findUnique({ where: { solutionId: solution.id } });
  if (!workspace) {
    workspace = await prisma.helpdeskWorkspace.create({ data: { solutionId: solution.id } });
  }
  return workspace;
};

router.use(authenticate, requireRole("STARTUP_ADMIN"));

router.get("/agents", async (req, res) => {
  const ws = await ensureWorkspace(req.user.id);
  const items = await prisma.agent.findMany({ where: { workspaceId: ws.id } });
  res.json(items);
});

router.post("/agents", async (req, res) => {
  const ws = await ensureWorkspace(req.user.id);
  const item = await prisma.agent.create({ data: { workspaceId: ws.id, ...req.body } });
  res.json(item);
});

router.get("/customers", async (req, res) => {
  const ws = await ensureWorkspace(req.user.id);
  const items = await prisma.customer.findMany({ where: { workspaceId: ws.id } });
  res.json(items);
});

router.post("/customers", async (req, res) => {
  const ws = await ensureWorkspace(req.user.id);
  const { id, ...data } = req.body;
  const item = await prisma.customer.create({ data: { workspaceId: ws.id, ...data } });
  res.json(item);
});

router.get("/tickets", async (req, res) => {
  const ws = await ensureWorkspace(req.user.id);
  const items = await prisma.ticket.findMany({ where: { workspaceId: ws.id }, include: { customer: true, assignee: true } });
  res.json(items);
});

router.post("/tickets", async (req, res) => {
  const ws = await ensureWorkspace(req.user.id);
  const code = `TKT-${String(Date.now()).slice(-6)}`;
  const {
    title,
    description,
    priority,
    category,
    status,
    customer,
    customerEmail,
    customerId,
    assignee,
    assigneeId,
  } = req.body;

  let resolvedCustomerId = null;
  if (customerId) {
    resolvedCustomerId = Number(customerId);
  } else if (customerEmail || customer) {
    const foundCustomer = await prisma.customer.findFirst({
      where: {
        workspaceId: ws.id,
        ...(customerEmail ? { email: customerEmail } : { name: customer })
      }
    });
    resolvedCustomerId = foundCustomer?.id ?? null;
  }

  let resolvedAssigneeId = null;
  if (assigneeId) {
    resolvedAssigneeId = Number(assigneeId);
  } else if (assignee) {
    const foundAgent = await prisma.agent.findFirst({
      where: { workspaceId: ws.id, name: assignee }
    });
    resolvedAssigneeId = foundAgent?.id ?? null;
  }

  const data = {
    workspaceId: ws.id,
    code,
    title,
    description,
    status: status || "open",
    priority,
    category,
    customerId: resolvedCustomerId,
    assigneeId: resolvedAssigneeId,
  };

  const item = await prisma.ticket.create({ data, include: { customer: true, assignee: true } });

  if (resolvedCustomerId) {
    await prisma.customer.update({
      where: { id: resolvedCustomerId },
      data: { ticketsCount: { increment: 1 } }
    });
  }

  res.json(item);
});

router.patch("/tickets/:id", async (req, res) => {
  const id = Number(req.params.id);
  const item = await prisma.ticket.update({ 
    where: { id }, 
    data: req.body,
    include: { customer: true, assignee: true }
  });
  res.json(item);
});

export default router;
