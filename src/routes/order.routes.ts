import express from 'express'
<<<<<<< HEAD
import { OrderData, OrderGet } from '../controller/order.controller.js'
=======
import { OrderData } from '../controller/order.controller.js'
>>>>>>> 14517d659aaf62f7cd84f27eff603630d000d39e
import { requireAuth } from '../middleware/auth.js'



const orderRouter = express.Router()
<<<<<<< HEAD
orderRouter.use(requireAuth)
orderRouter.post('/', OrderData)
orderRouter.get('/',OrderGet)
=======

orderRouter.use(requireAuth)
orderRouter.post('/',OrderData)
>>>>>>> 14517d659aaf62f7cd84f27eff603630d000d39e


export default orderRouter;