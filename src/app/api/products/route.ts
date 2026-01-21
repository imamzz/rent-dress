import { createProduct, getProducts } from "@/src/modules/products/service";
import { NextResponse } from "next/server";

type Variant = {
  size: string,
  color: string | null,
  quantity: number,
}

export async function GET() {
  const result = await getProducts();
  return NextResponse.json(result, { status: result.code });
}

export async function POST(req: Request) {
  const formData = await req.formData();

  const categoryId = formData.get("category");
  if (!categoryId) {
    throw new Error("categoryId is required");
  }

  const variantsRaw = formData.get("variants");
  if (!variantsRaw) {
    throw new Error("variants is required");
  }

  const rawVariants = JSON.parse(formData.get("variants") as string);

  const variants = rawVariants.map((v: Variant) => ({
    sizeId: v.size,
    colorId: v.color ?? null,
    stock: Number(v.quantity),
  }));


  const input = {
    name: formData.get("name"),
    description: formData.get("description"),
    categoryId: formData.get("category"),
    price: Number(formData.get("price")),
    variants: variants,
    media: {
      images: formData.getAll("images") as File[],
      video: formData.get("video") as File | null,
    },
  };

  const product = await createProduct(input);
  return Response.json(product, { status: 201 });
}
