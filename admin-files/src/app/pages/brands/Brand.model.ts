export interface Brand {
        id?: number;
        title: string;
        description: string;
        image: string;
        createdAt?: string;
        updatedAt?: string;
}

export interface BrandRes{
        success: boolean;
        result: {
                count: number;
                rows: Brand[];
        };
        message: string;
}

export interface BrandSingleRes{
        success: boolean;
        result: Brand[];
        message: string;
}