export interface Category {
  id: number;
  parentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  children: Category[];
}

export interface CategoryRes {
  success: boolean;
  result: Category[];
  message: string;
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
