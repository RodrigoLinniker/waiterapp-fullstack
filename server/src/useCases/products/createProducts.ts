import { Request, Response } from "express";
import { prisma } from "../../routes";

export async function createProducts(request: Request, response: Response){
    try{
        const body: any = request.body;
        const imagePath = request.file?.filename
     
          const products = await prisma.products.create({
        data:{
            name: body.name,
            description: body.description,
            imagePath: imagePath,
            price: Number(body.price),
            categoryId: Number(body.categoryId),
            ingredients: body.ingredients ? JSON.parse(body.ingredients) : [], 
        }
      }) 
   
      return response.status(201).json(products);

    } catch(error){
      console.log(error);
      return response.sendStatus(500)
    }
   
}