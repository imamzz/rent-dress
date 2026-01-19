import { NextRequest } from "next/server";
import { deleteColor, getColor, updateColor } from "@/src/modules/colors/service";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    if (!id) {
        return Response.json({ message: "Color id is required" }, { status: 400 });
    }
    const color = await getColor(id);
    return Response.json(color);
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    if (!id) {
        return Response.json({ message: "Color id is required" }, { status: 400 });
    }
    const body = await req.json();
    const color = await updateColor(id, body);
    return Response.json(color);
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    if (!id) {
        return Response.json({ message: "Color id is required" }, { status: 400 });
    }
    const color = await deleteColor(id);
    return Response.json(color);
}