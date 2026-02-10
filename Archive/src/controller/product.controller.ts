import type { Request, Response, NextFunction } from "express";
import { Product } from "../model/product.model.js";
import { validationResult } from "express-validator";
import cloudinary from "../config/cloudinary.js";
import { Op, where } from "sequelize";


export async function addProduct(req: Request, res: Response, next: NextFunction) {
    try {
        const { product_name, product_price, product_desc, product_sku, product_unit, cat_id } = req.body;
        console.log(req.body)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const msgs = errors.array().map(e => e.msg);
            return res.status(400).json({ status: 'failed', message: msgs });
        }
        if (!req.file) {
            return res.status(400).json({ status: "failed", messgae: "no file atteched" })
        }

        // const extension = req.file.originalname.split(".")[1];
        // if (extension !== "png" && extension !== "jpg" && extension !== "jpeg") {
        //     return res.status(400).json({ status: "failed", messgae: "only png, jpg, jpeg files are allowed" })
        // }
        const fileBuffer = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        const resultcoud = await cloudinary.uploader.upload(fileBuffer, {
            folder: "uploadpics",
            public_id: `PIMG_${Date.now()}`, // optional
            overwrite: true,
        })

        const result = await Product.create({
            product_name,
            product_price,
            product_desc,
            product_sku,
            product_unit,
            cat_id,
            product_img: resultcoud.secure_url
        });

        res.status(201).json({ status: 'success', message: 'Product created', data: result });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ status: 'failed', message: 'Product not created' });
    }
}


export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = parseInt((req.query.page as string) || '1', 10);
        const limit = Math.min(parseInt((req.query.limit as string) || '10', 10), 100);
        const offset = (page - 1) * limit;
        const search = (req.query.search as string) || undefined;
        console.log(search)
        const where: any = {};
        if (search) where.product_name = { [Op.like]: `%${search}%` };
        //const result = await Product.findAndCountAll({ where:{productName: { [Op.like]: `%${search}%` }}, limit, offset });
        const result = await Product.findAndCountAll({ where, limit, offset });
        res.json({ status: 'success', data: { total: result.count, items: result.rows } });
    } catch (err) {
        next(err);
    }
};




export async function searchcategory(req: Request, res: Response, next: NextFunction) {
    try {
        const cat_id = Number(req.params.id);
        const products = await Product.findAll({
            where: { cat_id }
        });
        if (!products.length) {
            return res.status(404).json({
                success: false,
                message: "No products found for this category",
            });
        }
        return res.json({
            success: true,
            data: products,
        })
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: "this Product APi not work",
            err: err
        })

    }
}


export const searchProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const q = (req.query.q as string) || '';
        const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined;
        const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined;
        const sku = (req.query.sku as string) || undefined;

        const page = parseInt((req.query.page as string) || '1', 10);
        const limit = Math.min(parseInt((req.query.limit as string) || '10', 10), 100);
        const offset = (page - 1) * limit;

        const where: any = {};

        if (q) {
            // search in name, sku or description
            where[Op.or] = [
                { product_name: { [Op.like]: `%${q}%` } },
                { product_sku: { [Op.like]: `%${q}%` } },
                { product_desc: { [Op.like]: `%${q}%` } },
            ];
        }

        if (sku) {
            where.product_sku = sku;
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
            where.product_price = {};
            if (minPrice !== undefined) where.product_price[Op.gte] = minPrice;
            if (maxPrice !== undefined) where.product_price[Op.lte] = maxPrice;
        }

        // Sorting
        const sortBy = (req.query.sortBy as string) || 'createdAt';
        const sortOrder = (req.query.order as string) === 'asc' ? 'ASC' : 'DESC';

        const result = await Product.findAndCountAll({ where, limit, offset, order: [[sortBy, sortOrder]] });

        res.json({ status: 'success', data: { total: result.count, items: result.rows } });
    } catch (err) {
        next(err);
    }
};



export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId: any = req.params.id;
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ status: 'failed', message: 'Product not found' });
        }
        res.json({ status: 'success', data: product });
    } catch (err) {
        next(err);
    }
};


export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const productId: any = req.params.id;
        const deletedCount = await Product.destroy({ where: { id: productId } });
        if (deletedCount === 0) {
            return res.status(404).json({ status: 'failed', message: 'Product not found' });
        }
        res.json({ status: 'success', message: 'Product deleted successfully' });
    } catch (err) {
        next(err);
    }
};

export const getProductByCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId: any = req.params.cat_slug;
        res.json({ status: 'success' });
    } catch (err) {
        next(err);
    }
};


