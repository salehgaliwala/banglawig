import { Brand } from "../brands/Brand.model";

export interface Product {
        id: number;
        title: string;
        slug?: string;
        description: string;
        shortDescription: string;
        price: number;
        stock: number;
        featureImage: string;
        updatedAt?: string;
        createdAt?: string;
        Variations?: Variation[];
        Images?: Image[];
        categories?: CategoryRel[];
        brand?: Brand;
      }

      export interface CategoryRel {
        id: number;
        parentId: number;
        title: string;
        description: string;
        product_category_relation: {
            id: number;
            categoryId: number;
            productId: number;
            createdAt: string;
            updatedAt: string;
        };
      }
      
      export interface ProductRes {
        success: boolean;
        result: {
          count: number;
          rows: Product[];
        };
        message: string;
      }
      
      export interface SingleProductRes {
        success: boolean;
        result: Product;
        message: string;
      }



export interface Variation {
        id?: number;
        productId?: number;
        title?: string;
        VariationAttributes?: VariationAttributes[];
        Images?: Image[];
        VariationDetail?: VariationDetail;
        updatedAt?: string;
        createdAt?: string;
}

export interface VariationRes {
      success: boolean;
      result: Variation;
      message: string;
}

export interface VariationSingle {
      id: number;
      productId: number;
      title: string;
      updatedAt: string;
      createdAt: string;
}

export interface VariationSingleRes {
      success: boolean;
      result: VariationSingle;
      message: string;
}
  
  
export interface VariationAttributes {
      id?: number;
      attributeId: number;
      attributeValueId: number;
      variationId?: number;
      attributeValue?: AttributeValue;
      attribute?: attribute;
      updatedAt?: string;
      createdAt?: string;
}

  
  
  export interface AttributeValue {
        id: number;
        attributeId?: number;
        title: string;
        description?: string;
  }

  export interface AttributeValueSingleRes {
      success: boolean;
      result: AttributeValue;
      message: string;
}
  
  export interface attribute {
        id: number;
        title: string;
        description: string;
        value?: AttributeValue;
  }

      export interface AttributeRes {
            success: boolean;
            result: {
                  id: number;
                  title: string;
                  description: string;
                  createdAt?: string;
                  updatedAt?: string;
            };
            message: string;
      }

      export interface AttributeNested {
            id: number;
            title: string;
            description: string;
            createdAt?: string;
            updatedAt?: string;
            attributeValue?: AttributeValue[];
            expand?: boolean;
      }

      export interface AttributeNestedRes {
            success: boolean;
            result: {
                  count: number;
                  rows: AttributeNested[];
            };
            message: string;
      }
  
  export interface VariationDetail {
        id?: number;
        price: number;
        stock: number;
        variationId?: number;
        description: string;
        featureImage?: string;
        updatedAt?: string;
        createdAt?: string;
  }

  export interface Image {
        id?: number;
        url: string;
        title: string;
        caseType?: string;
        caseId?: number;
  }

  export interface ImageRes {
        success: number;
        result: {
                count: number;
                rows: Image[];
        };
        message: string;
  }

  export interface ImageSingleRes {
      success: number;
      result: Image;
      message: string;
}