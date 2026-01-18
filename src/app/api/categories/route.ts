import { listCategories, createCategory } from "@/src/modules/categories/service";

export async function GET() {
  const categories = await listCategories();
  return Response.json(categories);
}

export async function POST(req: Request) {
  const body = await req.json();
  const category = await createCategory(body);
  console.log("category", category);
  return Response.json(category, { status: 201 });
}

