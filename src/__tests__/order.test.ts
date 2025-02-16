import request from "supertest";
import app from "../app";

describe("Order API Tests", () => {
  it("should check order availability", async () => {
    const response = await request(app)
      .post("/api/order/check-availability")
      .send({
        order: [{ apparelCode: "TSHIRT001", size: "M", quantity: 2 }],
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Order can be fulfilled");
  });

  it("should return validation error for missing fields", async () => {
    const response = await request(app)
      .post("/api/order/check-availability")
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid request payload");
  });

  it("should return lowest order cost", async () => {
    const response = await request(app)
      .post("/api/order/lowest-cost")
      .send({
        order: [{ apparelCode: "TSHIRT001", size: "M", quantity: 3 }],
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Oder can be fulfilled");
  });

  it("should return validation error for missing fields", async () => {
    const response = await request(app)
      .post("/api/order/lowest-cost")
      .send({
        order: [{ apparelCode: "TSHIRT001" }],
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid request payload");
  });
});
