import { ArticleHeader } from "components/article-header";
import { notFound } from "next/navigation";
import CtaFooter from "components/cta-footer";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const { metadata } = await import(`markdown/${params.slug}.mdx`);

    return {
      title: metadata.title,
      description: metadata.description,
      openGraph: {
        title: metadata.title,
        description: metadata.description,
      },
      twitter: {
        title: metadata.title,
        description: metadata.description,
      },
    };
  } catch {
    return {};
  }
}

export default async function ArticlePage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  try {
    const { default: Content, metadata } = await import(`markdown/${params.slug}.mdx`);

    return (
      <div className="mx-auto max-w-3xl text-base leading-7 text-white">
        <ArticleHeader metadata={metadata} />
        <Content />
        <CtaFooter />
      </div>
    );
  } catch {
    notFound();
  }
}
