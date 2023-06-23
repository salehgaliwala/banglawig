import { CartItem } from './cart.model';

export interface OrdersRes {
        success: true;
        result: {
            count: number;
            rows: Order[];
        };
        message: string;
}

export interface SingleOrderRes {
    success: boolean;
    result: Order;
    message: string;
}


export interface Order {
    id: number;
    userId: number;
    status: string;
    subTotal: number;
    shippingCost: number;
    total: number;
    discount: number;
    couponCodes: string;
    createdAt: string;
    updatedAt: string;
    orderItems?: OrderItem[];
    orderAddress?: OrderAddress;
};

export interface OrderItem {
    id: number;
    orderId: number;
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
        VariationAttributes: OrderVariationAttributes[];
        VariationDetail: {
            id: number;
            price: number;
            stock: number;
            description: string;
            featureImage: string;
        };
    };
}

export interface OrderVariationAttributes {
    id: number;
    attributeValue: {
        title: string;
    };
    attribute: {
        title: string;
        description: string;
    };
}

export interface OrderAddress {
    name: string;
    email: string;
    phone?: string;
    whatsapp?: string;
    address: string;
    state: string;
    postcode: number;
    country: string;
}
