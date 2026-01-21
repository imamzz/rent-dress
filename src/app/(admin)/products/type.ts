export interface Variant {
    size: string;
    color: string;
    quantity: number;
};

export interface CreateProductInput {
    name: string;
    description: string;
    category: string;
    price: number;
    images: File[];
    variants: Variant[];
};

export interface Color {
    id: string;
    name: string;
    hexCode: string
}

export interface Category {
    id: string;
    name: string;
    description: string;
    productCount?: number;
}

export interface Size {
    id: string;
    label: string;
    bust: string;
    waist: string;
    hips: string;
};

export interface TableProduct {
    id: string;
    name: string;
    price: number;
    category: string;
    availabilityStatus: string;
}

export interface detailProduct {
    name: string,
    price: number,
    categoryId: string,
    description: string,
    variants: [
        sizeId: string,
        colorId: string,
        stock: number,
    ]
    media: [
        images: File,
        video: File,
    ]
}

export interface ProductCategory {
    id: string;
    name: string;
}

export interface ProductSize {
    label: string;
}

export interface ProductColor {
    name: string;
    hexCode: string;
}


export interface ProductMedia {
    id: string;
    url: string;
}

export interface ProductVariant {
    id: string;
    stock: number;
    size: ProductSize;
    color: ProductColor;
}


export interface ProductDetailType {
    id: string;
    name: string;
    description: true;
    price: number;
    isActive: boolean;
    category: ProductCategory;
    media: ProductMedia[];
    variants: ProductVariant[];
}
