import { getProductDetail } from "@/src/modules/products/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
    const {id} = await context.params;
    const result = await getProductDetail(id);
    return NextResponse.json(result, { status: result.code });
}