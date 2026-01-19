import { prisma } from "@/src/lib/prisma";
import { CreateSizeInput } from "./schema";

export async function listSeizes() {
  return prisma.size.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function findSizeById(id: string) {
  return prisma.size.findUnique({
    where: { id },
  });
}

export async function createSize(data: CreateSizeInput) {
  const size = await prisma.size.create({ data });
  return {
    code: 200,
    data: size,
  };
}

export async function updateSize(id: string, data: CreateSizeInput) {
  const size = await prisma.size.update({
    where: { id },
    data,
  });
  return {
    code: 200,
    data: size,
  };
}

export async function deleteSize(id: string) {
  const data = await prisma.size.delete({
    where: { id },
  });
  return {
    code: 200,
    data: data,
  };
}
