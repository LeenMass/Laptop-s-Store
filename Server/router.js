const express = require('express');
const router = express.Router();
const handlers = require('./handlers.js');

router.get('/products', handlers.products);
router.get('/products/:id', handlers.productInfo);
router.post('/addToCart', handlers.AddToCart);
router.post('/AddingProducts', handlers.AddingProducts);
router.post('/SignUp', handlers.SignUp);
router.get('/cart', handlers.getCart);
router.get('/users', handlers.getUsers);
router.post('/LogIn', handlers.LogIn);
router.get('/users/:id', handlers.getUserById);
router.get('/payment', handlers.getPaidCart)
router.post('/payment', handlers.UpdatePayidCart)
router.get('logOut', handlers.logOut)

module.exports = router;

