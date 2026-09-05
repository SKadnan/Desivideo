import { NextResponse } from 'next/server';

// Yahan aap apne sare Google Docs ya target links add kar sakte hain
const targetUrls = {
  'doc1': 'https://docs.google.com/document/d/YOUR_DOC_ID_1/edit',
  'doc2': 'https://docs.google.com/document/d/YOUR_DOC_ID_2/edit',
  'link1': 'https://e.urlxx233.com/?utm_source=Raees&utm_medium=Gama'
};

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const destination = targetUrls[id];

  if (destination) {
    // Fast 307 Redirect (Bypasses Link Shim delays)
    return NextResponse.redirect(destination, 307);
  }

  // Agar link na mile toh homepage par bhej do
  return NextResponse.redirect(new URL('/', request.url));
}
