import { uploadProductFile } from "./storage";
import * as repo from "./repository";
import { createProductInputSchema } from "./schema";
import { randomUUID } from "crypto";

type AvailabilityStatus =
  | "AVAILABLE"
  | "PARTIAL"
  | "OUT_OF_STOCK";

export async function createProduct(input: unknown) {
  const data = createProductInputSchema.parse(input);

  const productId = randomUUID();

  // 1. upload media
  const imageUrls: string[] = [];

  for (let i = 0; i < data.media.images.length; i++) {
    const file = data.media.images[i];

    const ext = file.name.split(".").pop();
    const path = `products/${productId}/image-${i + 1}.${ext}`;

    const uploaded = await uploadProductFile(file, path);
    imageUrls.push(uploaded.publicUrl);
  }

  let videoUrl: string | null = null;

  if (data.media.video) {
    const ext = data.media.video.name.split(".").pop();
    const path = `products/${productId}/video.${ext}`;

    const uploaded = await uploadProductFile(data.media.video, path);
    videoUrl = uploaded.publicUrl;
  }

  const product = await repo.createProductWithRelations({
    product: {
      id: productId,
      name: data.name,
      price: data.price,
      categoryId: data.categoryId,
      description: data.description,
    },
    variants: data.variants,
    media: {
      images: imageUrls,
      video: videoUrl,
    },
  });

  const available = product.variants.some(v => v.stock > 0);

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    category: product.category.name,
    availabilityStatus: available ? "AVAILABLE" : "OUT_OF_STOCK",
  };
}

export async function getProducts() {
  const products = await repo.findAllProducts();
  const result = products.map((product) => {
    const totalVariants = product.variants.length;
    const availableVariants = product.variants.filter(v => v.stock > 0).length;

    let availabilityStatus: AvailabilityStatus;

    if (availableVariants === 0) {
      availabilityStatus = "OUT_OF_STOCK";
    } else if (availableVariants === totalVariants) {
      availabilityStatus = "AVAILABLE";
    } else {
      availabilityStatus = "PARTIAL";
    }

    return {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category.name,
      availabilityStatus: availabilityStatus ? "AVAILABLE" : "NOT_AVAILABLE",
    };
  })

  return {
    code: 200,
    data: result
  };
}

export async function getProductsWithVariants() {
  const products = await repo.findAllProductsWithVariants();

  return {
    code: 200,
    data: products.map(p => ({
      ...p,
      variants: p.variants.filter(v => v.stock > 0),
    })),
  };
}

export interface ProductMedia {
  id: string;
  url: string;
}

export interface ProductVariant {
  id: string;
  stock: number;
  size: string;
  color: string;
}

export interface ProductDetail {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  media: ProductMedia[];
  variants: ProductVariant[];
}


export async function getProductDetail(id: string) {
  const product = await repo.findProductDetailById(id);

  if (!product || !product.isActive) {
    return { code: 404, message: "Product not found" };
  }

  return { code: 200, data: product };
}