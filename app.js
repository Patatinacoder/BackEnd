const express = require("express");
const bodyParser = require("body-parser");
const ProductManager = require("./ProductManager");

const app = express();
const productManager = new ProductManager("products.json");

app.use(bodyParser.json());

// Get all products
app.get("/products", async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get product by id
app.get("/products/:id", async (req, res) => {
    try {
        const product = await productManager.getProductById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Create a new product
app.post("/products", async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock } = req.body;
        await productManager.addProduct(title, description, price, thumbnail, code, stock);
        res.status(201).json({ message: "Product successfully created." });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a product
app.put("/products/:id", async (req, res) => {
    try {
        await productManager.updateProduct(req.params.id, req.body);
        res.status(200).json({ message: "Product successfully updated." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Delete a product
app.delete("/products/:id", async (req, res) => {
    try {
        await productManager.deleteProduct(req.params.id);
        res.status(200).json({ message: "Product successfully deleted." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});
