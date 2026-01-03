import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../src/app.js";

let tokenStudent;
let tokenStartup;

describe("auth", () => {
  it.skipIf(!process.env.DATABASE_URL)("signup student", async () => {
    const res = await request(app).post("/auth/signup").send({ email: `student_${Date.now()}@example.com`, password: "pass", role: "STUDENT" });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
    tokenStudent = res.body.token;
  });

  it.skipIf(!process.env.DATABASE_URL)("signup startup", async () => {
    const res = await request(app).post("/auth/signup").send({ email: `startup_${Date.now()}@example.com`, password: "pass", role: "STARTUP_ADMIN" });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
    tokenStartup = res.body.token;
  });
});

