import * as repo from "../categories/repository";
import { CreateCategoryInput } from "./schema";

export async function listCategories() {
  return repo.listCategories();
}

export async function createCategory(data: CreateCategoryInput) {
  // aturan bisnis bisa tumbuh di sini
  // contoh: validasi nama unik, dll
  return repo.createCategory(data);
}

export async function updateCategory(
  id: string,
  data: CreateCategoryInput
) {
  // aturan bisnis bisa tumbuh di sini
  // contoh: validasi nama unik, dll
  return repo.updateCategory(id, data);
}

export async function getCategory(id: string) {
  const category = await repo.findCategoryById(id);
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
}
