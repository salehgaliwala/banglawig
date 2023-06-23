/* eslint-disable @typescript-eslint/naming-convention */
import { Image } from './images.model';

export interface Variation {
      id: number;
      VariationAttributes: VariationAttributes[];
      Images: Image[];
      VariationDetail: VariationDetail;
}


export interface VariationAttributes {
      id: number;
      attributeId: number;
      attributeValueId: number;
      attributeValue: AttributeValue;
      attribute: attribute;

}

export interface AttributeValue {
      id: number;
      title: string;
}

export interface attribute {
      id: number;
      title: string;
      description: string;
      value?: AttributeValue;
}

export interface VariationDetail {
      id: number;
      price: number;
      stock: number;
      description: string;
      featureImage: string;
}
