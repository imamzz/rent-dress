interface Category {
  id: string;
  name: string;
  description: string;
  productCount?: number;
}

interface CategoryCreate {
  name: string;
  description: string;
}

export type { Category, CategoryCreate };