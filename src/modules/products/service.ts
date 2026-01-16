import { createProductSchema } from "./schema";
import * as repo from "./repository";

export async function listProducts() {
  return repo.findAllProducts();
}

export async function createProduct(input: unknown) {
  const data = createProductSchema.parse(input);

  // aturan bisnis bisa tumbuh di sini
  // contoh: cek kategori valid, dll

  return repo.createProduct(data);
}

export async function getProduct(id: string) {
  const product = await repo.findProductById(id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}
