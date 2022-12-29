import { Request, Response } from "express";
import { prisma } from "../../routes";

export async function createCategory(request: Request, response: Response){
    try{
        const body: any = request.body;

        const category = await prisma.category.create({
        data:{
            name: body.name,
            icon: body.icon
        }
      })
    
      return response.status(201).json(category);

    } catch(error){
      console.log(error);
      return response.sendStatus(500)
    }
   
}