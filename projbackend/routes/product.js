const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getProductById, getAllProducts, createProduct, getProduct, photo, updateProduct, deleteProduct, getAllUniqueCategories } = require("../controllers/product");
const { getUserById } = require("../controllers/user");

// params
router.param("userId", getUserById);
router.param("productId", getProductById);

//actual route
//create
router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);
//read
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);
//update
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);
//listing
router.get("/products", getAllProducts);
//delete
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);

router.get("/product/categories", getAllUniqueCategories);

module.exports = router;