const request = require("supertest");
const app = require("../app");


let token;

beforeAll(async () => {
  const res = await request(app).post("/auth").send({
    "username": process.env.ADMIN_USER,
    "password": process.env.ADMIN_PASS
  })
  token = res.body.token;
});


test("GET /api/products", async () => {
  const res = await request(app)
    .get("/api/products")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
});


test("GET /api/products/5", async () => {
  const res = await request(app)
    .get("/api/products/5")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
});


test("POST /api/products", async () => {
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


test("PUT /api/products/3", async () => {
  const res = await request(app)
    .put("/api/products/3")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Atualizado",
      description: "Teste",
      price: 200,
      stock_quantity: 5
    });

  expect(res.statusCode).toBe(200);
});


test("DELETE /api/products/6", async () => {
  const res = await request(app)
    .delete("/api/products/6")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
});