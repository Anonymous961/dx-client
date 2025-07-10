import { pinata } from "@/utils/config";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();

        const upload = await pinata.upload.public.json(body)

        return NextResponse.json(upload, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ text: "Error creating API Key:" }, { status: 500 });
    }
}