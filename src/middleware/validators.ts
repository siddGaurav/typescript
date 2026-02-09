import { body, type ValidationChain } from "express-validator";

export const createProductValidation: ValidationChain[] = [
    body('product_name')
        .trim()
        .notEmpty().withMessage('Product name is required')
        .isLength({ min: 2 }).withMessage('Product name must be at least 2 characters'),
    body('product_price')
        .notEmpty().withMessage('Product price is required')
        .isFloat({ gt: 0 }).withMessage('Product price must be a number greater than 0'),
    body('product_desc')
        .optional()
        .isLength({ max: 2000 }).withMessage('Description is too long'),
    body('product_sku')
        .optional()
        .isAlphanumeric().withMessage('SKU must be alphanumeric'),
    body('product_unit').notEmpty().withMessage("Unit is Required"),
    body('cat_id')
        .notEmpty().withMessage('Category ID is required')
        .isInt({ gt: 0 }).withMessage('Category ID must be a positive integer'),
];

export const updateProductValidation: ValidationChain[] = [
    body('product_name')
        .trim()
        .notEmpty().withMessage('Product name is required')
        .isLength({ min: 2 }).withMessage('Product name must be at least 2 characters'),
    body('product_price')
        .notEmpty().withMessage('Product price is required')
        .isFloat({ gt: 0 }).withMessage('Product price must be a number greater than 0'),
    body('product_desc')
        .optional()
        .isLength({ max: 2000 }).withMessage('Description is too long'),
    body('product_sku')
        .optional()
        .isAlphanumeric().withMessage('SKU must be alphanumeric'),
    body('product_unit').notEmpty().withMessage("Unit is Required"),
    body('cat_id')
        .notEmpty().withMessage('Category ID is required')
        .isInt({ gt: 0 }).withMessage('Category ID must be a positive integer'),
];


export const createCategoryValidation: ValidationChain[] = [
    body('cat_name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 2 }).withMessage('Category name must be at least 2 characters'),
    body('cat_desc')
        .trim()
        .notEmpty().withMessage('Category description is required')
        .isLength({ min: 5 }).withMessage('Category description must be at least 5 characters'),
    body('cat_slug')
        .trim()
        .notEmpty().withMessage('Category slug is required')
        .isSlug().withMessage('Category slug must be a valid slug'),
];

export const updateCategoryValidation: ValidationChain[] = [
    body('cat_name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 2 }).withMessage('Category name must be at least 2 characters'),
    body('cat_desc')
        .trim()
        .notEmpty().withMessage('Category description is required')
        .isLength({ min: 5 }).withMessage('Category description must be at least 5 characters'),
    body('cat_slug')
        .trim()
        .notEmpty().withMessage('Category slug is required')
        .isSlug().withMessage('Category slug must be a valid slug'),
];

export const createCartValidation: ValidationChain[] = [
    body('product_id')
        .notEmpty().withMessage('Product ID is required')
        .isInt({ gt: 0 }).withMessage('Product ID must be a positive integer'),
    body('product_qty')
        .notEmpty().withMessage('Product quantity is required')
        .isInt({ gt: 0 }).withMessage('Product quantity must be a positive integer'),
];

export const updateCartValidation: ValidationChain[] = [
    body('product_qty')
        .notEmpty().withMessage('Product quantity is required')
        .isInt({ gt: 0 }).withMessage('Product quantity must be a positive integer'),
];






export const createOrderValidation: ValidationChain[] = [
    body("order_txn_id")
        .notEmpty().withMessage("Order transaction ID is required")
        .bail()
        .isString().withMessage("Order transaction ID must be a string"),

    body("order_total_amount")
        .notEmpty().withMessage("Order total amount is required")
        .bail()
        .isFloat({ gt: 0 }).withMessage("Order total amount must be greater than 0"),

    body("order_payment_mode")
        .notEmpty().withMessage("Payment mode is required")
        .bail()
        .isString().withMessage("Payment mode must be a string"),

    body("order_status")
        .notEmpty().withMessage("Order status is required")
        .bail()
        .isString().withMessage("Order status must be a string"),

    body("order_address")
        .notEmpty().withMessage("Order address is required")
        .bail()
        .isString().withMessage("Order address must be a string"),

    body("city")
        .notEmpty().withMessage("City is required")
        .bail()
        .isString().withMessage("City must be a string"),

    body("state")
        .notEmpty().withMessage("State is required")
        .bail()
        .isString().withMessage("State must be a string"),

    body("zipCode")
        .notEmpty().withMessage("Zip code is required")
        .bail()
        .isString().withMessage("Zip code must be a string"),

    body("country")
        .notEmpty().withMessage("Country is required")
        .bail()
        .isString().withMessage("Country must be a string"),

    body("phoneNumber")
        .notEmpty().withMessage("Phone number is required")
        .bail()
        .isMobilePhone("en-IN").withMessage("Invalid phone number"),
];









export const OrderCartValidation: ValidationChain[] = [
    body("order_payment_mode")
        .notEmpty()
        .withMessage("pPayment mode is required")
        .isIn(["COD", "ONLINE"])
        .withMessage("Payment mode must be COD or ONLINE"),
    body("order_address")
        .notEmpty()
        .withMessage("order address is required")
        .isLength({ min: 10 })
        .withMessage("Order address must be at least 10 characters"),

    body("phoneNumber")
        .notEmpty()
        .withMessage("Phone number is required")
        .isMobilePhone("en-IN")
        .withMessage("Invalid Indian phone number"),

    body("notes")
        .optional()
        .isLength({ max: 200 })
        .withMessage("Notes can be max 200 characters"),

]