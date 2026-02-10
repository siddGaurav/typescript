import Express from "express";
import { createOrder } from "../controller/rozarpay.js";
import { requireAuth } from "../middleware/auth.js";

const Rozarpay = Express.Router();

Rozarpay.use(requireAuth);
Rozarpay.post('/', createOrder)
export default Rozarpay;