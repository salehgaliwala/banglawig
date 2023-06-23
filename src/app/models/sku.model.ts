

export interface Sku {
  productSKUPropertyList: ProductSKUPropertyList[];
  skuPriceList: SkuPriceList[];
}


  export interface ProductSKUPropertyList {
    skuPropertyName: string;
    skuPropertyId: string;
    skuPropertyValues: SkuPropertyValues[];
  }

  export interface SkuPropertyValues{
    SKUPropertyListId: string;
    propertyValueId: string;
    propertyValueName: string;
    skuPropertyImagePathLarge: string;
    skuPropertyImagePathSmall: string;
  }

  export interface SkuPriceList {
    price: number;
    discount: number;
    discountPrice: number;
    SkuId: string;
    skuPropValIds: string;
    skuPropertyImagePathLarge: string;
    skuPropertyImagePathSmall: string;
  }
