import express from 'express'
import { OrderData } from '../controller/order.controller.js'
import { requireAuth } from '../middleware/auth.js'



const orderRouter = express.Router()

orderRouter.use(requireAuth)
orderRouter.post('/',OrderData)


export default orderRouter;