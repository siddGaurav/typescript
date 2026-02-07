import type { NextFunction, Response } from "express";
import { Order } from "../model/order.model.js";
import type { RequestWithUser } from "../middleware/auth.js";
import { validationResult } from "express-validator";


export async function OrderData(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  try {


    const {
      order_txn_id,
      order_total_amount,
      order_tax_amount,
      order_discount_amount,
      order_coupon_code,
      order_payment_mode,
      order_status,
      order_address,
      order_totalItems,
      city,
      state,
      zipCode,
      country,
      phoneNumber,
      notes,
    } = req.body;

    const error = validationResult(req)
    if (!error.isEmpty()) {
      const msg = error.array().map(e => e.msg)
      return res.status(400).json({ status: "failed", message: msg })
    }


    const user_id = req.user?.id;
    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }





    // basic validation


    const order = await Order.create({
      user_id,
      order_txn_id,
      order_total_amount,
      order_tax_amount,
      order_discount_amount,
      order_coupon_code,
      order_payment_mode,
      order_status,
      order_address,
      order_totalItems,
      city,
      state,
      zipCode,
      country,
      phoneNumber,
      notes,
    });


    res.status(201).json({ status: 'success', message: 'Product created', data: order });




    // return res.status(201).json({
    //   success: true,
    //   message: "Order created successfully",
    //   data: order,
    // });
  } catch (err) {
    console.error("Order create error:", err);
    next(err);
  }
}



