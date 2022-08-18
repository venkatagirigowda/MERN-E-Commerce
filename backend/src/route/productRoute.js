const express = require("express");
const Route = express.Router();
const products = require("../mongo/products.js");
const users = require("../mongo/user.js");
const bcrypt = require("bcryptjs");

Route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userLogin = await users.findOne({ email: email });
    const pass = await bcrypt.compare(password, userLogin.password);
    if (pass) {
      res.status(200).json({ message: "ok" });
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid Credentials" });
  }
});

Route.get("/logout", (req, res) => {
  res.status(200).json({ message: "logged out" });
});

Route.post("/signup", async (req, res) => {
  const { email } = req.body;
  try {
    const userexist = await users.findOne({ email: email });
    if (userexist)
      return res.status(400).json({ error: "email already registered" });
    else {
      const Users = new users(req.body);
      await Users.save();
      res.status(200).json({ message: "registered succesfully" });
    }
  } catch (error) {
    res.status(400).json({ error: "registration failed" });
  }
});

Route.post("/products", async (req, res) => {
  try {
    const Products = new products(req.body);
    await Products.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ error: "unsuccessful" });
  }
});

Route.get("/products", async (req, res) => {
  try {
    const Products = await products.find();
    res.send(Products);
  } catch (error) {
    res.send(error);
  }
});
Route.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const Products = await products.findByIdAndDelete(id);
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ message: "Cannot Delete The Product" });
  }
});
module.exports = Route;
