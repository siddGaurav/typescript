import type { Request, Response, NextFunction } from "express";
import { razorpay } from "../utils/RozarPay.js";






interface RazorpayOrder {
    id: string;
    amount: number;
    currency: string;
    receipt: string;
    status: "created" | "attempted" | "paid";
    created_at: number;
}
export async function createOrder(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { amount } = req.body;
        console.log(amount)

        if (!amount) {
            return res.status(400).json({
                message: "Amount is required",
            });
        }

        const order = await (razorpay as any).orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: "rcpt_" + Date.now(),
            payment_capture: true,
        });
        // console.log(order)

        return res.status(200).json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });

    } catch (error) {

        next(error);
    }
}
