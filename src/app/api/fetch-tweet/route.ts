import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const cid = searchParams.get('cid');

    if (!cid) {
        return NextResponse.json(
            { error: 'Missing CID' },
            { status: 400 }
        );
    }

    try {
        // Forward request to Pinata
        console.log(`Fetching from Pinata for CID: ${cid}`);
        const pinataRes = await fetch(
            `https://${process.env.PINATA_GATEWAY_URL}/ipfs/${cid}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_GATEWAY_TOKEN}`,
            { headers: { Authorization: `Bearer ${process.env.PINATA_JWT}` } }
        );
        const data = await pinataRes.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'IPFS fetch failed' },
            { status: 500 }
        );
    }
}