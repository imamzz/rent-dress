import { prisma } from "@/src/lib/prisma";
import { CreateProductInput } from "./schema";
import { MediaType } from "@/src/generated/enums";

export async function findAllProducts() {
  return prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      price: true,
      isActive: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      variants: {
        select: {
          stock: true,
        },
      },
    },
  });
}
export async function findAllProductsWithVariants() {
  return prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      price: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      media: {
        select: {
          id: true,
          url: true,
        },
        take: 1,
      },
      variants: {
        select: {
          id: true,
          stock: true,
          size: {
            select: {
              label: true,
            },
          },
          color: {
            select: {
              name: true,
              hexCode: true,
            },
          },
        },
      },
    },
  });
}

export async function findProductDetailById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      isActive: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      media: {
        select: {
          id: true,
          url: true,
        },
        // take: 1,
      },
      variants: {
        select: {
          id: true,
          stock: true,
          size: {
            select: {
              label: true,
            },
          },
          color: {
            select: {
              name: true,
              hexCode: true,
            },
          },
        },
      },
    },
  });
}

export async function findAllProductsForList() {
  return prisma.product.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      price: true,

      category: {
        select: {
          id: true,
          name: true,
        },
      },

      media: {
        where: { isPrimary: true },
        select: {
          url: true,
        },
        take: 1,
      },

      variants: {
        select: {
          id: true,
          stock: true,
          size: {
            select: {
              label: true,
            },
          },
          color: {
            select: {
              name: true,
              hexCode: true,
            },
          },
        },
      },
    },
  });
}

export async function findProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
  });
}

export async function createProductWithRelations(input: {
  product: {
    id: string;
    name: string;
    price: number;
    categoryId: string;
    description?: string;
  };
  variants: {
    sizeId: string;
    colorId?: string | null;
    stock: number;
  }[];
  media: {
    images: string[];
    video?: string | null;
  };
}) {
  return prisma.$transaction(async (tx) => {
    const product = await tx.product.create({
      data: input.product,
      include: {
        category: {
          select: { name: true },
        },
      },
    });

    await tx.productVariant.createMany({
      data: input.variants.map((v) => ({
        productId: product.id,
        sizeId: v.sizeId,
        colorId: v.colorId,
        stock: v.stock,
      })),
    });

    await tx.productMedia.createMany({
      data: [
        ...input.media.images.map((url) => ({
          productId: product.id,
          type: MediaType.IMAGE,
          url,
        })),
        ...(input.media.video
          ? [{
              productId: product.id,
              type: MediaType.VIDEO,
              url: input.media.video,
            }]
          : []),
      ],
    });

    // ⬇️ ambil variants (stock saja)
    const variants = await tx.productVariant.findMany({
      where: { productId: product.id },
      select: { stock: true },
    });

    return {
      ...product,
      variants,
    };
  });
}

