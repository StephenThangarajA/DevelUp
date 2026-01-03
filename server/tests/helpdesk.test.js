import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

let token;

describe("helpdesk", () => {
  it.skipIf(!process.env.DATABASE_URL)("signup", async () => {
    const res = await request(app).post("/auth/signup").send({ email: `hd_${Date.now()}@example.com`, password: "pass", role: "STARTUP_ADMIN" });
    expect(res.status).toBe(200);
    token = res.body.token;
  });

  it.skipIf(!process.env.DATABASE_URL)("create agent", async () => {
    const res = await request(app).post("/helpdesk/agents").set("Authorization", `Bearer ${token}`).send({ name: "Agent A", email: "a@example.com", role: "Support", department: "Support" });
    expect(res.status).toBe(200);
  });
});

