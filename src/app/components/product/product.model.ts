/* eslint-disable @typescript-eslint/naming-convention */

export interface Product{
  id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  featured_image: string;
  images: string[];
  sku: string;
  status: string;
  category_ids: string;
  regular_price: string;
  sale_price: string;
  discount_id: string;
  modified_at: string;
  created_at: string;
  discount:number;
}

export interface MiniProduct {
  id: string;
  title: string;
  slug: string;
  featured_image: string;
}
