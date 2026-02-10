import type { Request, Response, NextFunction } from "express";
import { Category } from "../model/category.model.js";
import { validationResult } from "express-validator";
export async function createCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const { cat_name, cat_desc, cat_slug } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const msgs = errors.array().map(e => e.msg);

            return res.status(400).json({ status: 'failed', message: msgs });
        }

        const result = await Category.create({
            cat_name,
            cat_desc,
            cat_slug,
        });
        console.log(result);
        const resultJSON = result.toJSON();

        res.status(201).json({
            status: 'success', message: 'Category created', data: {
                id: result.id,
                cat_name: resultJSON.cat_name,
                cat_desc: resultJSON.cat_desc,
                cat_slug: resultJSON.cat_slug,
                cat_status: resultJSON.cat_status,
                createdAt: resultJSON.createdAt,
                updatedAt: resultJSON.updatedAt
            }
        });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ status: 'failed', message: 'Category not created' });
    }
}


export async function getCategories(req: Request, res: Response, next: NextFunction) {
    try {
        const categories = await Category.findAll({ raw: true });
        console.log(categories)
        res.status(200).json({ status: 'success', data: categories });

    } catch (err) {
        console.log(err);
        res.status(400).json({ status: 'failed', message: 'Could not retrieve categories' });
    }
}


export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const categoryId: any = req.params.id;
        const deletedCount = await Category.destroy({ where: { id: categoryId } });
        if (deletedCount === 0) {
            return res.status(404).json({ status: 'failed', message: 'Category not found' });
        }
        res.json({ status: 'success', message: 'Category deleted successfully' });
    } catch (err) {
        next(err);
    }
}


export async function updateCategory(req: Request, res: Response, next: NextFunction) {
    try {
        const categoryId: any = req.params.id;
        const { cat_name, cat_desc, cat_slug, cat_status } = req.body;

        const [updatedCount] = await Category.update(
            { cat_name, cat_desc, cat_slug, cat_status },
            { where: { id: categoryId } }
        );

        if (updatedCount === 0) {
            return res.status(404).json({ status: 'failed', message: 'Category not found or no changes made' });
        }

        const updatedCategory = await Category.findByPk(categoryId);

        res.json({ status: 'success', message: 'Category updated successfully', data: updatedCategory });
    } catch (err) {
        next(err);
    }
}