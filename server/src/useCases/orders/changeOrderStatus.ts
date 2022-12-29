import { Request, Response } from "express";
import { prisma } from "../../routes";

export async function changeOrderStatus(request: Request, response: Response){
    try{
        const {orderId} = request.params;
        const body: any = request.body;

         if(!["WAITING","IN_PRODUCTION","DONE"].includes(body.status)){
            return response.status(400).json({error: "Status should be one these: WAITING, IN_PRODUCTION, DONE."})
        } 

        await prisma.order.update({
            where:{
                id: Number(orderId)
            },
            data:{
                status: body.status,
            }
      }) 

     return response.sendStatus(204);

    } catch(error){
      console.log(error);
      return response.sendStatus(500)
    }
   
}