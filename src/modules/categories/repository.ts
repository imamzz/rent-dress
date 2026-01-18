import { prisma } from "@/src/lib/prisma";
import { CreateCategoryInput } from "./schema";

export async function listCategories() {
  const data = await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });
  return {
    code: 200,
    data: data,
  };
}

export async function findCategoryById(id: string) {
  return prisma.category.findUnique({
    where: { id },
  });
}

export async function createCategory(data: CreateCategoryInput) {
  return prisma.category.create({ data });
}

export async function updateCategory(id: string, data: CreateCategoryInput) {
  return prisma.category.update({
    where: { id },
    data,
  });
}

export async function deleteCategory(id: string) {
  return prisma.category.delete({
    where: { id },
  });
}
