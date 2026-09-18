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

  const finalUrl = new URL(destination);
  const incomingUrl = new URL(request.url);

  // Sirf utm_ wale parameters forward honge, fbclid remove ho jayega
  incomingUrl.searchParams.forEach((value, key) => {
    if (key.startsWith('utm_')) {
      finalUrl.searchParams.set(key, value);
    }
  });

  return NextResponse.redirect(finalUrl, 307);
}
