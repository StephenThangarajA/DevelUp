import prisma from "../prisma/client.js";

export const ensureProductExists = async (key, name, type, trialDays, trialUnitLimit) => {
  const existing = await prisma.product.findUnique({ where: { key } });
  if (existing) return existing;
  return prisma.product.create({ data: { key, name, type, trialDays, trialUnitLimit } });
};

export const startTrialIfAllowed = async (userId, productKey) => {
  const product = await prisma.product.findUnique({ where: { key: productKey } });
  if (!product) throw new Error("Product not found");
  const active = await prisma.productTrial.findFirst({ where: { userId, productId: product.id, active: true } });
  if (active) return active;
  const days = product.trialDays ?? 7;
  const limit = product.trialUnitLimit ?? 10;
  const expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  return prisma.productTrial.create({ data: { userId, productId: product.id, expiresAt, limitUnits: limit } });
};

export const consumeTrialUnit = async (userId, productKey) => {
  const product = await prisma.product.findUnique({ where: { key: productKey } });
  if (!product) throw new Error("Product not found");
  const trial = await prisma.productTrial.findFirst({ where: { userId, productId: product.id, active: true } });
  if (!trial) throw new Error("No active trial");
  if (trial.expiresAt < new Date()) {
    await prisma.productTrial.update({ where: { id: trial.id }, data: { active: false } });
    throw new Error("Trial expired");
  }
  if (trial.consumedUnits >= trial.limitUnits) {
    await prisma.productTrial.update({ where: { id: trial.id }, data: { active: false } });
    throw new Error("Trial limit reached");
  }
  return prisma.productTrial.update({ where: { id: trial.id }, data: { consumedUnits: trial.consumedUnits + 1 } });
};

