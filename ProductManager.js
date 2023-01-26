const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;

class ProductManager {
    constructor(path) {
        this.products = [];
        this.path = path = './products.json';
        this.getProducts();
    }

    async getProducts() {
        try {
            let products = await fs.promises.readFile(this.path, "utf8");
            this.products = JSON.parse(products);
            return this.products;
        } catch (error) {
            console.error(error);
        }
    }

    async addProduct({ title, description, price, thumbnail, code, stock }) {
        try {
            if (!title || !description || !price || !thumbnail || !code || !stock) throw new Error('All fields are required');
            if (this.products.some(product => product.code === code)) throw new Error("Code already exists.");
            let newProduct = { id: this.addNewId(), title, description, price, thumbnail, code, stock };
            this.products.push(newProduct);
            console.log(this.products);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            return newProduct;
        } catch (error) {
            console.error(error);
        }
    }

    addNewId() {
        return this.products.length + 1;
    }

    async getProductById(id) {
        let product = this.products.find(product => product.id === id);
        if (!product) throw new Error("Not found.");
        console.log(product);
        return product;
    }

    async updateProduct(id, { title, description, price, thumbnail, code, stock }) {
        try {
            let product = this.products.find(product => product.id === id);
            if (!product) throw new Error("Not found.");
            if (this.products.some(product => product.code === code)) throw new Error("Code already exists.");
            product.title = title;
            product.description = description;
            product.price = price;
            product.thumbnail = thumbnail;
            product.code = code;
            product.stock = stock;
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            console.log(this.products);
            return console.log("successfully updated");
        } catch (error) {
            console.error(error);
        }
    }

    async deleteProduct(id) {
        try {
            let index = this.products.findIndex(product => product.id === id);
            if (index === -1) throw new Error("Not found.")
            this.products.splice(index, 1);
            await fs.promises.writeFile(this.path, JSON.stringify(this.products));
            console.log(this.products);
            return console.log("successfully deleted");
        
        }catch(error){
            console.log(error);
    }
}}
module.exports=ProductManager;
    