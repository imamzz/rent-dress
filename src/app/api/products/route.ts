import { listProducts, createProduct } from "@/src/modules/products/service";

export async function GET() {
  const products = await listProducts();
  return Response.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  const product = await createProduct(body);

  return Response.json(product, { status: 201 });
}
