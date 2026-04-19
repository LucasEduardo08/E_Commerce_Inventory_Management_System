const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");


router.get("/products", controller.get_product_all);  
router.get("/products/:id", controller.get_product_by_id);
router.post("/products", controller.create_product); 
router.delete("/products/:id", controller.delete_product);
router.put("/products/:id", controller.update_product);
 
module.exports = router;
