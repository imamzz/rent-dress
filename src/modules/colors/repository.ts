import { prisma } from "@/src/lib/prisma";
import { CreateColorInput, createColorSchema } from "./schema";

export async function listColors() {
    return prisma.color.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function createColor(data: CreateColorInput) {
    const validatedData = createColorSchema.parse(data);
    return prisma.color.create({
        data: validatedData,
    });
}   

export async function getColor(id: string) {
    return prisma.color.findUnique({
        where: { id },
    });
}

export async function updateColor(id: string, data: CreateColorInput) {
    const validatedData = createColorSchema.parse(data);
    return prisma.color.update({
        where: { id },
        data: validatedData,
    });
}

export async function deleteColor(id: string) {
    return prisma.color.delete({
        where: { id },
    });
}