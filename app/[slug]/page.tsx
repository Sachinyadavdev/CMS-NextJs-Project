import { notFound } from "next/navigation";
import type { Metadata } from "next";
import LayoutWrapper from "@/app/components/LayoutWrapper";
import { getLayoutBySlug, getLayouts } from "@/lib/mysql-db";
import type { Layout } from "@/lib/db";

type PageParams = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  const layouts = await getLayouts();
  return layouts.map((layout) => ({
    slug: layout.slug,
  }));
}

const normalizeLayout = (layout: Layout): Layout => ({
  ...layout,
  sections: Array.isArray(layout.sections) ? layout.sections : [],
  metadata: layout.metadata || { title: layout.title, description: '', keywords: '', ogImage: '' },
  versions: Array.isArray(layout.versions) ? layout.versions : [],
});

export const revalidate = 60;

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const layout = await getLayoutBySlug(params.slug);

  if (!layout) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }

  const normalizedLayout = normalizeLayout(layout);
  const { title, description, keywords, ogImage } = normalizedLayout.metadata;
  const keywordArray = keywords
    ? keywords
        .split(",")
        .map((keyword) => keyword.trim())
        .filter(Boolean)
    : undefined;

  return {
    title,
    description,
    keywords: keywordArray && keywordArray.length > 0 ? keywordArray : undefined,
    openGraph: {
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
      url: `/${params.slug}`,
    },
    twitter: {
      card: ogImage ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    alternates: {
      canonical: `/${params.slug}`,
    },
  };
}

export default async function Page({ params }: PageParams) {
  const layout = await getLayoutBySlug(params.slug);

  if (!layout) {
    notFound();
  }

  const normalizedLayout = normalizeLayout(layout);

  return (
    <div className="min-h-screen bg-black">
      <LayoutWrapper initialLayout={normalizedLayout} slug={params.slug} />
    </div>
  );
}
