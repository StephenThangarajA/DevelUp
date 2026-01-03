import { Router } from "express";
import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const router = Router();

router.post("/signup", async (req, res) => {
  const { email, password, name, role, company } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: "Email exists" });
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash: hash, name, role, company }
  });
  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
});

router.post("/google", async (req, res) => {
  try {
    const { credential, idToken } = req.body || {};
    const token = credential || idToken;
    if (!token) {
      return res.status(400).json({ error: "Missing Google token" });
    }
    const clientId = process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      return res.status(500).json({ error: "Google Client ID not configured" });
    }
    const client = new OAuth2Client(clientId);
    const ticket = await client.verifyIdToken({ idToken: token, audience: clientId });
    const payload = ticket.getPayload();
    const email = payload?.email;
    const name = payload?.name || (email ? email.split("@")[0] : "");
    if (!email) {
      return res.status(400).json({ error: "Google account missing email" });
    }
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const randomSecret = `${payload.sub}:${Date.now()}`;
      const hash = await bcrypt.hash(randomSecret, 10);
      user = await prisma.user.create({
        data: { email, passwordHash: hash, name, role: "STARTUP_ADMIN" }
      });
    } else if (!user.name && name) {
      user = await prisma.user.update({ where: { id: user.id }, data: { name } });
    }
    const appToken = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", appToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.json({ token: appToken, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (e) {
    res.status(401).json({ error: "Google authentication failed" });
  }
});

router.get("/me", async (req, res) => {
  try {
    // Reuse authenticate logic inline to avoid extra middleware dependency here
    const header = req.headers.authorization || "";
    let token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token && req.headers.cookie) {
      const cookies = Object.fromEntries((req.headers.cookie || "").split(";").map(c => {
        const idx = c.indexOf("=");
        const k = c.slice(0, idx).trim();
        const v = decodeURIComponent(c.slice(idx + 1));
        return [k, v];
      }));
      token = cookies.token || null;
    }
    if (!token) return res.status(200).json(null);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) return res.status(200).json(null);
    res.json({ id: user.id, email: user.email, name: user.name, role: user.role });
  } catch {
    res.status(200).json(null);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", { sameSite: "lax", secure: process.env.NODE_ENV === "production" });
  res.json({ ok: true });
});

export default router;
