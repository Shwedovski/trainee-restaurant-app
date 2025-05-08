export interface IRestuarantDish {
    name: string;
    description: string;
    imageurl: string;
    category: string;
    price: number;
    restuarant: string;
    updatedDate?: string;
    specialLabel?: string;
}