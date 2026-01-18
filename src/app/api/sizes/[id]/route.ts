import { NextResponse } from "next/server";
import { deleteSize, updateSize } from "@/src/modules/sizes/service";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { message: "Size id is required" },
        { status: 400 },
      );
    }

    await deleteSize(id);

    return NextResponse.json({ message: "Size deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to delete size",
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params; // ⬅️ PENTING
    if (!id) {
      return NextResponse.json(
        { message: "Size id is required" },
        { status: 400 },
      );
    }
    const body = await req.json();
    // Panggil service updateSize yang sudah dibuat sebelumnya
    const size = await updateSize(id, body);
    return NextResponse.json(size, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update size",
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
