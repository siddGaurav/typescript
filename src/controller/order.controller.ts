import type { NextFunction, Response } from "express";
import { Order } from "../model/order.model.js";
import type { RequestWithUser } from "../middleware/auth.js";
import { validationResult } from "express-validator";
<<<<<<< HEAD
import { Cart } from "../model/cart.model.js";
import { Product } from "../model/product.model.js";
import { v4 as uuidv4 } from "uuid";
import { raw } from "mysql2";
import { it } from "node:test";
import { OrderDetails } from "../model/orderdetails.model.js";
import { razorpay } from "../utils/RozarPay.js";
=======

>>>>>>> 14517d659aaf62f7cd84f27eff603630d000d39e

export async function OrderData(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  try {
<<<<<<< HEAD
    // 1️⃣ Validation check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array().map((e) => e.msg),
      });
    }

    // 2️⃣ Get logged-in user


    // 3️⃣ Extract request body
    const {
      order_address,
      city,
      state,
      zipCode,
      country,
      phoneNumber,
      order_payment_mode,
      order_coupon_code,
      notes,
    } = req.body;





    const user_id: any = req.user?.id;
    if (!user_id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }
    const cartItems = await Cart.findAll({
      where: { user_id }, raw: true,
      include: [{ model: Product, as: "product" }],
    });

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }



    let order_total_amount = 0;
    let order_totalItems = 0;


    cartItems.forEach((item: any) => {


      const price = Number(item['product.product_price']) || 0;
      const qty = Number(item.product_qty) || 0;
      order_total_amount += price * qty;
      order_totalItems += qty;
    });
    console.log("Order Total Amount:", order_total_amount);
    console.log("Total Items:", order_totalItems);



    // console.log(JSON.stringify(cartItems, null, 2),)

    const products = cartItems.map((item: any) => ({
      name: item["product.product_name"],
      image: item["product.product_img"],
    }));

    const order_tax_amount = (order_total_amount * 18) / 100;
    let order_discount_amount = 0;
    if (order_coupon_code === "SAVE10") {
      order_discount_amount = order_total_amount * 0.10;
    }

    const paymentMode = (order_payment_mode || "COD").toUpperCase(); // default COD
    const order_txn_id = paymentMode === "COD" ? "COD-" + uuidv4() : "PAY-" + uuidv4();
    const order_status = paymentMode === "COD" ? "confirmed" : "pending";

    // console.log({
    //   user_id,
    //   order_txn_id,
    //   order_total_amount,
    //   order_tax_amount,
    //   order_discount_amount,
    //   order_coupon_code,
    //   order_payment_mode,
    //   order_status,
    //   order_address,
    //   order_totalItems,
    //   city,
    //   state,
    //   zipCode,
    //   country,
    //   phoneNumber,
    //   notes,
    // })




    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(order_total_amount * 100), // amount in paise
      currency: "INR",
      receipt: order_txn_id,
      payment_capture: true, // ✅ boolean
    });









    const order = await Order.create({
      user_id,
=======


    const {
>>>>>>> 14517d659aaf62f7cd84f27eff603630d000d39e
      order_txn_id,
      order_total_amount,
      order_tax_amount,
      order_discount_amount,
<<<<<<< HEAD
      order_coupon_code: order_coupon_code || null,
      order_payment_mode: paymentMode,
=======
      order_coupon_code,
      order_payment_mode,
>>>>>>> 14517d659aaf62f7cd84f27eff603630d000d39e
      order_status,
      order_address,
      order_totalItems,
      city,
      state,
      zipCode,
      country,
      phoneNumber,
<<<<<<< HEAD
      notes: notes || null,
    });



    const orderDetailsData = cartItems.map((item: any) => {
      const price = Number(item["product.product_price"]) || 0;
      const qty = Number(item.product_qty) || 0;

      return {
        order_id: order.id,
        product_id: item.product_id,
        product_price: price,
        price_qty: qty,
        product_total: price * qty,
      };
    });

    await OrderDetails.bulkCreate(orderDetailsData);

    await Cart.destroy({
      where: { user_id }
    });


    // console.log(order)
    // console.log(order, "kamhogya")

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: {
        order_id: order.id,
        order_txn_id: order.order_txn_id,
        order_total_amount,
        order_totalItems,
        data: order,
        products,
        razorpay_order: razorpayOrder || null,
      }

    });
  } catch (err) {
    // console.error("Order create error:", err);
    // next(err);
    res.status(500).json({
      status: "feild",
      message: "this is wrong"
    })
  }
}


export async function OrderGet(req: RequestWithUser, res: Response, next: NextFunction) {

  try {
    const user_id = req.user?.id;
    if (!user_id) {
      return res.status(400).json({
        status: false,
        message: "User id is required",
=======
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
>>>>>>> 14517d659aaf62f7cd84f27eff603630d000d39e
      });
    }


<<<<<<< HEAD
    const OrderData = await Order.findOne({
      where: { user_id: user_id },
    })

    return res.status(201).json({
      status: "success",
      message: "Order of Data",
      data: OrderData
    })


  } catch (err) {
    res.status(500).json({
      status: "failed",
      err: err
    })

  }

}
=======



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



>>>>>>> 14517d659aaf62f7cd84f27eff603630d000d39e
