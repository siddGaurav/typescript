import type { Request, Response, NextFunction } from 'express';
import { Cart } from '../model/cart.model.js';
import { validationResult } from 'express-validator';
import { Product } from '../model/product.model.js';
import type { RequestWithUser } from '../middleware/auth.js';
import { raw } from 'mysql2';

export const addToCart = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const msgs = errors.array().map(e => e.msg);

            return res.status(400).json({ status: 'failed', message: msgs });
        }
        const { product_id, product_qty } = req.body;
        const user_id: any = req.user?.id;

        let existingItem: any = await Cart.findOne({ where: { user_id, product_id }, raw: true });

        if (existingItem) {
            // existingItem.product_qty += product_qty;
<<<<<<< HEAD
            // console.log(existingItem)
=======
            console.log(existingItem)
>>>>>>> 14517d659aaf62f7cd84f27eff603630d000d39e
            await Cart.update(
                { product_qty: existingItem.product_qty + 1 },
                { where: { id: existingItem.id } }
            );
        }
        else {
            existingItem = await Cart.create({ user_id, product_id, product_qty });
        }
        const newItem = await Cart.findByPk(existingItem.id);
        res.status(201).json({ status: 'success', message: 'Item added to cart', data: newItem });
    } catch (err) {
        next(err);
    }
};
export const getCartItems = async (
    req: RequestWithUser,
    res: Response
) => {
    try {
        const userId = req.user?.id;
        console.log(userId, "ye he id")

        if (!userId) {
            return res
                .status(400)
                .json({ success: false, message: "User ID is required" });

        }


        const cartItems = await Cart.findAll({
            where: { user_id: userId },
            attributes: ["id", "product_qty"],
            include: [{ model: Product, as: "product", required: false, where: { product_status: 1 } }],

        });
        console.log(cartItems, "data mila")

        const xyz = cartItems
        console.log(xyz, "kam ho gya")

        let cartTotal = 0;
        const JsonItem = cartItems.map(item => item.get({ plain: true }));
        const itemsWithTotal = JsonItem.map((item: any) => {
            const itemTotal = item.product.product_price * item.product_qty;
            item.product.itemTotal = itemTotal
            cartTotal += itemTotal;
            console.log(itemTotal)
            return item;
        }

        );


        res.status(200).json({
            success: true,
            message: "Cart items retrieved successfully",
            data: itemsWithTotal,
            totalAmount: cartTotal,
            itemCount: cartItems.length,

        });
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
export const cartUpdate = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {

        const { updateFlag } = req.body;
        const product_id = req.params.product_id;
        const user_id = req.user?.id

        console.log(product_id, user_id, { updateFlag })
        if (!user_id) {
            return res.status(400).json({ status: "failed", message: "user id not valid" })
        }

        const cartUpdate: any = await Cart.findOne({ where: { user_id, product_id }, raw: true });
        console.log(cartUpdate, "kam ho gya ")
        if (cartUpdate.product_qty < 1) {
            await Cart.destroy({ where: { user_id, product_id } });
            return res.status(400).json({ status: "failed", message: "Cart Items Deleted" });
        }
        if (updateFlag === "plus") {
            await Cart.update(
                { product_qty: cartUpdate.product_qty + 1 },
                { where: { id: cartUpdate.id } }
            );

        }
        else if (updateFlag === "minus") {
            await Cart.update(
                { product_qty: cartUpdate.product_qty - 1 },
                { where: { id: cartUpdate.id } }
            );

        }
        const newItem = await Cart.findByPk(cartUpdate.id);
        res.status(201).json({ status: 'success', message: 'Item added to cart', data: newItem });


    }
    catch (err) {
        next(err);
    }
}


export const cartDestroy = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const user_id = req.user?.id
        if (!user_id) {
            res.status(201).json({ status: 'failed', message: 'user id is not valid' });
        }
        if (user_id === 0) {
            return res.status(404).json({
                status: "failed",
                message: "Cart is already empty",
            });
        }
        await Cart.destroy({ where: { user_id } })
        return res.status(201).json({ status: 'success', message: 'all Ites Deleted' });

    }
    catch (err) {
        next(err);
    }
}