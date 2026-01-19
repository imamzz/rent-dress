import { NextRequest } from "next/server";
import { listColors, createColor } from "@/src/modules/colors/service";

export async function GET() {
    const colors = await listColors();
    return Response.json(colors);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const color = await createColor(body);
    return Response.json(color);
}