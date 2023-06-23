/* eslint-disable @typescript-eslint/naming-convention */
export interface CartAdd {
    productId: number;
    variationId: number;
    quantity: number;
}

export interface CartRes {
    success: boolean;
    result: {
        id: number;
        type: string;
        userId: number;
        createdAt: string;
        updatedAt: string;
        cartItems: CartItem[];
    };
    message: string;
}

export interface CartItem {
        id: number;
        cartId: number;
        productId: number;
        variationId: number;
        quantity: number;
        product: {
            id: number;
            title: string;
            slug: string;
            brandId: number;
            price: number;
            stock: number;
            featureImage: string;
        };
        variation: {
            id: number;
            VariationAttributes: CartVariationAttributes[];
            VariationDetail: {
                id: number;
                price: number;
                stock: number;
                description: string;
                featureImage: string;
            };
        };
}

export interface CartVariationAttributes {
    id: number;
    attributeValue: {
        title: string;
    };
    attribute: {
        title: string;
        description: string;
    };
}

// export interface CartAddRes {
//     success: boolean;
//     data: CartProduct;
//     message: string;
// }

// export interface CartProduct {
//     id: number;
//     productId: number;
//     productTitle: string;
//     productImage: string;
//     backgroundImage: string;
//     quantity: number;
//     phoneDesignId: number;
//     orginalPrice: number;
//     countedPrice: number;
//     discountLabel: any;
//     discountedPrice: number;
//     discountAmount: number;
//     skuId: string;
//     attribute: {
//         price: string;
//         discount: string;
//         discountPrice: number;
//         skuPropertyImagePathLarge: string;
//         skuPropertyImagePathSmall: string;
//         value: [
//             {
//                 skuPropertyName: string;
//                 propertyValueName: string;
//             }
//         ];
//     };
//     shippingCost: number;
// }
