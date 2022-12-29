import { Request, Response } from "express";
import { prisma } from "../../routes";

export async function listCategories(request: Request, response: Response){
    try{
        const categories = await prisma.category.findMany();
        
        return response.json(categories);

    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    }
   
}