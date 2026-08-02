import { NextResponse } from "next/server";

// Disabled: apiGet() now fetches with `cache: "no-store"`, so tag-based
// revalidation is no longer needed. Restore the logic below if on-demand
// revalidation is needed again.
export async function POST() {
  return NextResponse.json({ message: "Revalidate endpoint is disabled" }, { status: 503 });
}

/*
import { revalidateTag } from "next/cache";

export async function POST(request) {
  const { secret, tag } = await request.json();

  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  if (!tag) {
    return NextResponse.json({ message: "Missing tag" }, { status: 400 });
  }

  revalidateTag(tag);

  return NextResponse.json({ revalidated: true, tag });
}
*/
