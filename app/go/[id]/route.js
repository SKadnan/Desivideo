import { NextResponse } from 'next/server';

// Aapke saare target links
const targetUrls = {
  "doc1": "https://docs.google.com/document/d/YOUR_DOC_ID_1/edit",
  "doc2": "https://docs.google.com/document/d/YOUR_DOC_ID_2/edit",
  "link1": "https://i.urlxx335.com/?utm_source=Raees&utm_medium=SK"
};

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const destination = targetUrls[id];

  if (destination) {
    // Incoming query parameters bhi forward honge
    const { search } = new URL(request.url);
    const finalUrl = `${destination}${search}`;

    return NextResponse.redirect(finalUrl, {
      status: 307,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  }

  // Agar link ID na mile toh homepage par redirect
  return NextResponse.redirect(new URL('/', request.url), 307);
}
