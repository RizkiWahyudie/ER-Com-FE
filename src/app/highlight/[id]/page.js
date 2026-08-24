import BlogDetailClient from "./BlogDetailClient";
import { getBlogPosts } from "@/lib/api";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ id: post.id }));
}

export default async function BlogDetailPage({ params }) {
  const { id } = await params;
  return <BlogDetailClient slug={id} />;
}
