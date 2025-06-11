export interface IRestaurantDish {
    name: string;
    description: string;
    imageURL: string;
    category: string;
    price: number;
    restaurant: string;
    updatedDate?: string;
    specialLabel?: string;
    quantity?: number;
}