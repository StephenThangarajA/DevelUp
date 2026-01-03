import jwt from "jsonwebtoken";
import prisma from "../prisma/client.js";

export const authenticate = async (req, res, next) => {
  try {
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
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export const requireRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};
