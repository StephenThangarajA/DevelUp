import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("products", () => {
  it.skipIf(!process.env.DATABASE_URL)("seed and list", async () => {
    const seed = await request(app).post("/products/seed");
    expect(seed.status).toBe(200);
    const res = await request(app).get("/products");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

