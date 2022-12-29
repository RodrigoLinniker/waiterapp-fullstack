import { Request, Response } from "express";
import { prisma } from "../../routes";

export async function listProducts(request: Request, response: Response){
    try{
        const products = await prisma.products.findMany();

        return response.json(products);

    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    }
   
}