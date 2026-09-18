import { NextResponse } from 'next/server';

const targetUrls = {
  doc1: 'https://docs.google.com/document/d/YOUR_DOC_ID_1/edit',
  doc2: 'https://docs.google.com/document/d/YOUR_DOC_ID_2/edit',
  link1: 'https://i.urlxx335.com/?utm_source=Raees&utm_medium=SK',
};

export async function GET(request, { params }) {
  const { id } = await params;
  const destination = targetUrls[id];

  if (!destination) {
    return NextResponse.redirect(new URL('/', request.url), 307);
  }

  // Destination URL ko safely parse karein
  const finalUrl = new URL(destination);

  // Incoming parameters read karein
  const incomingUrl = new URL(request.url);

  // Incoming query parameters merge karein
  for (const [key, value] of incomingUrl.searchParams) {
    finalUrl.searchParams.set(key, value);
  }

  return NextResponse.redirect(finalUrl, {
    status: 307,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  });
}
