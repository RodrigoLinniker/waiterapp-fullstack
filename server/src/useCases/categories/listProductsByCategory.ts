import { Request, Response } from "express";
import { prisma } from "../../routes";

export async function listProductsByCategory(request: Request, response: Response){
    try{
        const {categoryId} = request.params;

        const products = await prisma.products.findMany({where: {
            categoryId: Number(categoryId)
        }});

        return response.json(products);

    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    }
   
}