import { ProductStatus } from "../";

export interface ProductPG{
    id:             number;
    name:           string;
    price:          number;
    status:         ProductStatus;
    stock:          number;
    category_id:    number;
    brand_id:       number;
    created_at?:     string;
    updated_at?:     string;
    image_url:      string;
    description:    string;
}