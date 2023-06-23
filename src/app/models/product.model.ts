import { CategoryRel } from './category.model';
import { Image } from './images.model';
import { Variation } from './variations.model';

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  stock: number;
  featureImage: string;
  updatedAt: string;
  createdAt: string;
  Variations: Variation[];
  Images: Image[];
  categories: CategoryRel[];
  brand: Brand;
  discount:number;
}

export interface ProductRes {
  success: boolean;
  result: {
    count: number;
    rows: Product[];
    currency: string;
  };
  message: string;
}

export interface SingleProductRes {
  success: boolean;
  result: Product;
  message: string;
  currency: string;
}


export interface Brand {
  id: number;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}


// TODO: Delete Below

export interface Image_module {
  largeImage: string;
  smallImage: string;
}
export interface Specifications {
  attrKey: string;
  attrValue: string;
}