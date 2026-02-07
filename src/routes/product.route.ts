import Express from 'express';
import multer from 'multer';
import * as product from '../controller/product.controller.js';
import { createProductValidation, updateProductValidation } from '../middleware/validators.js';
import path from 'node:path';
import fs from 'fs';

const productRouter = Express.Router();


// const uploadsDir = path.join(process.cwd(), 'uploads', 'products');
// fs.mkdirSync(uploadsDir, { recursive: true });
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, uploadsDir),
//     filename: (req, file, cb) => {
//         const ext = path.extname(file.originalname);
//         const base = path.basename(file.originalname, ext).replace(/[^a-z0-9]/gi, '_');
//         cb(null, `${Date.now()}_${base}${ext}`);
//     }
// });
// const upload = multer({ storage });

export const cloud = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 1MB
});

productRouter.post("/", cloud.single("product_img"), createProductValidation, product.addProduct);
productRouter.get("/", product.getProducts);
productRouter.get("/product_cat/:id", product.searchcategory);
productRouter.get("/search", product.searchProducts);
productRouter.get("/:id", product.getProductById);
//productRouter.put("/:id", cloud.single("product_img"), updateProductValidation, product.updateProduct);
productRouter.delete("/:id", product.deleteProduct);
export default productRouter;
