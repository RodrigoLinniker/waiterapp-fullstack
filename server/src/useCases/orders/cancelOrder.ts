import { Request, Response } from "express";
import { prisma } from "../../routes";

export async function cancelOrder(request: Request, response: Response){
    try{
        const {orderId} = request.params;

        await prisma.order.delete({
            where:{
                id: Number(orderId)
            },
        }) 

        return response.sendStatus(204);

    } catch(error){
      console.log(error);
      return response.sendStatus(500)
    }
   
   
}