export interface Category {
        id: number;
        parentId: number;
        title: string;
        description: string;
        createdAt: string;
        updatedAt: string;
        children?: Category[];
        isLeaf?: boolean;
}

export interface CategoryProductRelation {
        productId: number;
        categoryId: number;
}

export interface AddCategoryRes {
        success: boolean;
        result: Category;
        message: string;
}

export interface CategoryRes {
        success: boolean;
        result: Category[];
        message: string;
}

export interface CategoryWithCountRes {
        success: boolean;
        result: {
                count: number;
                rows: Category[];
        };
        message: string;
}