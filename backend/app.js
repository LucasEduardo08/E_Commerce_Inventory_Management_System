require("dotenv").config();
const { db, dbAsync } = require("./database/db");
const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());

// Start database
const productSql = fs.readFileSync(
  path.join(__dirname, "database/product.sql"),
  "utf-8"
);

db.exec(productSql, (err) => {
  if (err) {
    console.error("Error creating table:", err.message);
  } else {
    console.log("Table created/verified.");
  }
});

// Routes
const productRoutes = require("./routes/productRouter");
const { authMiddleware, auth } = require("./middleware/verifyToken");
app.post("/auth", auth);
app.use("/api", authMiddleware, productRoutes);

module.exports = app;
