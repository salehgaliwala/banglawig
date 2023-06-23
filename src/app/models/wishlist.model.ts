export interface WishlistRes{
    success: boolean;
    data: Wishlist[];
    message: string;
}
export interface Wishlist{
  id: number;
  title: string;
  slug: string;
  productId: number;
  image: string;
  price: number;
  backgroundImage: string;
  quantity: number;
  SkuId: any;
  attributes: any;
  phoneDesignId: any;
}

export interface WishlistAddRes {
  success: boolean;
  data: {
      id: number;
      title: string;
      productId: number;
      image: string;
      quantity: number;
      SkuId: string;
      attribute: string;
      customerId: number;
      updated_at: string;
      created_at: string;
  };
  message: string;
}
