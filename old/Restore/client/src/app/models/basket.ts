import { Product } from "./product";

export type BasketItem = {
    id: number;
    quantity: number;
    productId: number;
    product: Product;
    basketId: number;
}

export type Basket = {
    id: number;
    basketId: string;
    items: BasketItem[];
}