import { Request, Response } from "express";
import { prisma } from "../../routes";
import { io } from "../../server";

export async function createOrder(request: Request, response: Response){
    try{
        const body: any = request.body;

        const order = await prisma.order.create({
         data:{
            table: body.table,
           products:{
            createMany:{
              data: body.orderProducts
            }
           }
          }
      });

      const orderDetails = await prisma.order.findUnique({
        where:{id: order.id},
          include:{products: {include:{Products: true}}},
        });

     io.emit("orders@new", orderDetails)
     return response.status(201).json(order);

    } catch(error){
      console.log(error);
      return response.sendStatus(500);
    }
   
}