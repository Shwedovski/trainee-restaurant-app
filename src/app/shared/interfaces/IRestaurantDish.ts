export interface IRestaurantDish {
    name: string;
    description: string;
    imageurl: string;
    category: string;
    price: number;
    restaurant: string;
    updatedDate?: string;
    specialLabel?: string;
}