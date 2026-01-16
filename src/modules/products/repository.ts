import { prisma } from "@/src/lib/prisma";
import { CreateProductInput } from "./schema";

export async function findAllProducts() {
  const data = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });
  return {
    'code': 200,
    'data': data
  };
}

export async function findProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
  });
}

export async function createProduct(data: CreateProductInput) {
  return prisma.product.create({ data });
}
