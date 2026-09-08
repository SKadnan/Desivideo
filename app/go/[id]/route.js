import { NextResponse } from 'next/server';

// Aapke saare target links aur Google Docs Yahan add honge
const targetUrls = {
  "doc1": "https://docs.google.com/document/d/YOUR_DOC_ID_1/edit",
  "doc2": "https://docs.google.com/document/d/YOUR_DOC_ID_2/edit",
  "link1": "https://inst.instagrams.com.pk/go"
};

export async function GET(request, { params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const destination = targetUrls[id];

  if (destination) {
    // Incoming URL ke saare query parameters (jaise ?utm_source=fb) forward karne ke liye
    const { search } = new URL(request.url);
    const finalUrl = `${destination}${search}`;

    // Fast 307 Redirect + Caching disable taaki link instantly redirect ho aur social bots capture na karein
    return NextResponse.redirect(finalUrl, {
      status: 307,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  }

  // Agar link ID na mile toh homepage par bhej do
  return NextResponse.redirect(new URL('/', request.url), 307);
}
