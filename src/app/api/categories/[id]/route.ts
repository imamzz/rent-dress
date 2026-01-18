import { deleteCategory, updateCategory } from "@/src/modules/categories/repository";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ⬅️ PENTING

    if (!id) {
      return Response.json(
        { message: "Category id is required" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const category = await updateCategory(id, body);

    return Response.json(category, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to update category",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return Response.json(
        { message: "Category id is required" },
        { status: 400 }
      );
    }

    await deleteCategory(id);

    return Response.json(
      { message: "Category deleted" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        message: "Failed to delete category",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

