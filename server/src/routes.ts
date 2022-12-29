import path from "node:path"
import { PrismaClient } from '@prisma/client';

import express from 'express'; 
import multer from "multer";

import { createCategory } from './useCases/categories/createCategory';
import { listCategories } from './useCases/categories/listCategories';
import { createProducts } from './useCases/products/createProducts';
import { listProducts } from './useCases/products/listProducts';
import { listProductsByCategory } from "./useCases/categories/listProductsByCategory";
import { listOrders } from "./useCases/orders/listOrders";
import { createOrder } from "./useCases/orders/createOrder";
import { changeOrderStatus } from "./useCases/orders/changeOrderStatus";
import { cancelOrder } from "./useCases/orders/cancelOrder";



const routes = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, callback){
            callback(null, path.resolve(__dirname, "..", "uploads") );
        },
        filename(req, file, callback){
            callback(null, `${Date.now()}-${file.originalname}`);
        }
    })
})

export const prisma = new PrismaClient();

routes.get('/categories', listCategories);

routes.post('/categories', createCategory);

routes.get('/products', listProducts);

routes.post('/products', upload.single('imagePath'), createProducts);

routes.get('/categories/:categoryId/products', listProductsByCategory);

routes.get('/orders', listOrders);

routes.post('/orders', createOrder);

routes.patch('/orders/:orderId', changeOrderStatus);

routes.delete('/orders/:orderId', cancelOrder);

export default routes;