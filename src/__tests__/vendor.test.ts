import request from "supertest";
import app from "../app";

describe("Vendor API Tests", () => {
  it("should update stock and price for a valid apparel", async () => {
    const response = await request(app).put("/api/vendor/apparel").send({
      apparelCode: "TSHIRT001",
      size: "M",
      stock: 10,
      price: 25.99,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Stock & price updated");
  });

  it("should return an error for an invalid apparelCode", async () => {
    const response = await request(app).put("/api/vendor/apparel").send({
      apparelCode: "INVALID",
      size: "M",
      stock: 10,
      price: 25.99,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Item not found");
  });

  it("should return validation error for missing fields", async () => {
    const response = await request(app).put("/api/vendor/apparel").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid request payload");
  });

  it("should update multiple apparel stock and price", async () => {
    const response = await request(app)
      .put("/api/vendor/apparel/bulk")
      .send({
        updates: [
          { apparelCode: "TSHIRT001", size: "M", stock: 10, price: 25.99 },
          { apparelCode: "HOODIE002", size: "L", stock: 5, price: 30.0 },
        ],
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Bulk update successful");
  });
});
