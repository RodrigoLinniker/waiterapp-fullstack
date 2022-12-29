export interface Order{
    id: number;
    table: string;
    status: "WAITING" | "IN_PRODUCTION" | "DONE";
    createdAt: string;
    products: {
        productsId: number;
        quantity: number;
        Products:{
            name: string;
            imagePath: string;
            price: number;
        }
    }[]
}