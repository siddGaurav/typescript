import express from 'express';
import authRouter from './routes/auth.route.js';
import productRouter from './routes/product.route.js';
import categoryRouter from './routes/category.route.js';
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/order.routes.js';
<<<<<<< HEAD
import Rozarpay from './routes/rozarpay.js';
=======
>>>>>>> 14517d659aaf62f7cd84f27eff603630d000d39e


const app = express();


app.use(express.json()); // application label middleware
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/order", orderRouter)
<<<<<<< HEAD
app.use('/api/v1/payment',Rozarpay)
=======
>>>>>>> 14517d659aaf62f7cd84f27eff603630d000d39e


export default app;