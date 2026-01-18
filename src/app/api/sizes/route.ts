import { NextRequest, NextResponse } from 'next/server';
import { createSize, listSizes } from '../../../modules/sizes/service';

export async function GET() {
    const sizes = await listSizes();
    return NextResponse.json(sizes);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const size = await createSize(body);

    return NextResponse.json(size);
}