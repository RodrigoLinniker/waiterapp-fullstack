import { Request, Response } from "express";
import { prisma } from "../../routes";


export async function listOrders(request: Request, response: Response){
    try{
       const orders = await prisma.order.findMany({
       include:{products: {include:{Products: true}}},
        orderBy: [
            {
                createdAt: 'asc',
            },
        ],
        
       });

        return response.json(orders);

    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    }
}