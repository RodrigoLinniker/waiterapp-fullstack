export interface Products {
    id: number;
    name: string;
    description: string;
    imagePath: string;
    price: number;
    categoryId: number;
    ingredients: {
      id: number;
      name: string;
      icon: string
    }[];
}

 