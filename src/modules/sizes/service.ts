import * as repo from "./repository";
import { CreateSizeInput } from "./schema";

export async function listSizes() {
  // aturan bisnis bisa tumbuh di sini
    return repo.listSeizes();
}

export async function createSize(data: CreateSizeInput) {
  // aturan bisnis bisa tumbuh di sini
  // contoh: validasi nama unik, dll
  return repo.createSize(data);
}

export async function getSize(id: string) {
  const size = await repo.findSizeById(id);
    if (!size) {
        throw new Error("Size not found");
    }
  return size;
}

export async function updateSize(id: string, data: CreateSizeInput) {
  // aturan bisnis bisa tumbuh di sini
  // contoh: validasi nama unik, dll
  return repo.updateSize(id, data);
}

export async function deleteSize(id: string) {
  return repo.deleteSize(id);
}