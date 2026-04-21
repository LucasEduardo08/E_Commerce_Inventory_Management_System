const { dbAsync: Product } = require("../database/db");


function isValidProduct({ name, description, price, stock_quantity }) {
  return (
    name &&
    description &&
    typeof price === "number" &&
    price > 0 &&
    typeof stock_quantity === "number" &&
    stock_quantity >= 0
  );
}


async function create_product(req, res){
  try {
    const { name, description, price, stock_quantity } = req.body;

    if (!isValidProduct({ name, description, price, stock_quantity })) {
      return res.status(400).json({ error: "Invalid product data" });
    }

    const result = await Product.run(
          `INSERT INTO products (name, description, price, stock_quantity)
            VALUES (?, ?, ?, ?)`,
            [name, description, price, stock_quantity]
    )
    res.status(201).json(result);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error registering product"});
  }
};


async function get_product_all(req, res){
  try {
    const products = await Product.all(
        `SELECT * FROM products`,
    );

    res.status(200).json(products);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error displaying all products" });
  }
};


async function get_product_by_id(req, res){
  try {
    const id_product = Number(req.params.id);

    const product = await Product.get(
      `SELECT name, description, price, stock_quantity 
      FROM products 
      WHERE id = ?`,
      [id_product]
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error finding the product" });
  }
};


async function delete_product(req, res) {
  try{
    const id_product = Number(req.params.id);

    const product = await Product.delete(
      `DELETE FROM products WHERE id = ?`,
      [id_product]
    )

    if (product.changes === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product successfully deleted" });

  } catch(err){
    console.error(err);
    res.status(500).json({ error: "Error deleting the product" });
  }
}


async function update_product(req, res) {
  try{
    const id_product = Number(req.params.id);
    let { name, description, price, stock_quantity } = req.body;

    if (!isValidProduct({ name, description, price, stock_quantity })) {
      return res.status(400).json({ error: "Invalid data for update" });
    }

    const product = await Product.update(
      `UPDATE products SET name = ?, description = ?, price = ?, stock_quantity = ?
      WHERE id = ?`,
      [name, description, price, stock_quantity, id_product]
    );

    if (product.changes === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product successfully updated" });

  } catch (err){
    console.error(err)
    res.status(500).json({ error: "Error updating the product" });
  } 
}


module.exports = {
    get_product_all,
    get_product_by_id,
    create_product,
    delete_product,
    update_product
}
