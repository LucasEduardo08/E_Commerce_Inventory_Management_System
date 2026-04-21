const request = require("supertest");
const app = require("../app");


let token;

// Authentication before testing
beforeAll(async () => {
  const res = await request(app).post("/auth").send({
    "username": process.env.ADMIN_USER,
    "password": process.env.ADMIN_PASS
  })
  token = res.body.token;
});


test("POST /api/products - should create a product", async () => {
  const res = await request(app)
    .post("/api/products")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Xbox 360",
      description: "Xbox 360",
      price: 700,
      stock_quantity: 4
    });

  expect(res.statusCode).toBe(201);
});


test("GET /api/products - should return all products", async () => {
  const res = await request(app)
    .get("/api/products")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
});


test("GET /api/products/1 - should return one product", async () => {
  const res = await request(app)
    .get("/api/products/1")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
});


test("PUT /api/products/1", async () => {
  const res = await request(app)
    .put("/api/products/1")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Xbox 360 (Deluxe)",
      description: "New Xbox 360",
      price: 400,
      stock_quantity: 3
    });

  expect(res.statusCode).toBe(200);
});


test("GET /api/products - should fail without token", async () => {
  const res = await request(app).get("/api/products");

  expect(res.statusCode).toBe(401);
});


test("GET /api/products -  should fail with invalid token", async () => {
  const res = await request(app)
    .get("/api/products")
    .set("Authorization", "Bearer token_invalido");

  expect(res.statusCode).toBe(403);
});


test("GET /api/products/9999 - should return 404", async () => {
  const res = await request(app)
    .get("/api/products/9999")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(404);
});


test("POST /api/products - should fail with invalid data", async () => {
  const res = await request(app)
    .post("/api/products")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "",
      price: -10
    });

  expect(res.statusCode).toBe(400);
});


test("PUT /api/products/9999 - should return 404", async () => {
  const res = await request(app)
    .put("/api/products/9999")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Produto inexistente",
      price: 100,
      stock_quantity: 1
    });

  expect(res.statusCode).toBe(404);
});


test("DELETE /api/products/9999 - should return 404", async () => {
  const res = await request(app)
    .delete("/api/products/9999")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(404);
});


test("DELETE /api/products/1 - should delete product", async () => {
  const res = await request(app)
    .delete("/api/products/1")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
});
