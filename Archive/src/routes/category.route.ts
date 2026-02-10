import express from "express";
import * as CategoryController from "../controller/category.controller.js";
import { createCategoryValidation, updateCategoryValidation } from "../middleware/validators.js";
const categoryRouter = express.Router();

// Define your category routes here

categoryRouter.post("/", createCategoryValidation, CategoryController.createCategory);
categoryRouter.get("/", CategoryController.getCategories);
categoryRouter.delete("/:id", CategoryController.deleteCategory);
categoryRouter.put("/:id", updateCategoryValidation, CategoryController.updateCategory);

export default categoryRouter;