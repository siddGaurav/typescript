import express from "express";
import *  as CartController from "../controller/cart.controller.js";
import { createCartValidation } from "../middleware/validators.js";
import { requireAuth } from "../middleware/auth.js";

const cartRouter = express.Router();
cartRouter.use(requireAuth);
cartRouter.post("/", createCartValidation, CartController.addToCart);
cartRouter.get("/", CartController.getCartItems);
cartRouter.put("/:product_id", CartController.cartUpdate);
cartRouter.delete("/", CartController.cartDestroy);

export default cartRouter;