import { MetadataType } from "components/article-header";
import { articles as slugs } from "app/sitemap";
import { procedures } from "data";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "components/ui/accordion";

import CtaFooter from "components/cta-footer";
import StructuredData from "components/structured-data";

export default async function ProcedurePage({ params: { slug } }: { params: { slug: string } }) {
  const procedure = procedures.find((procedure) => procedure.slug === slug);

  const articles = (await Promise.all(slugs?.map((slug) => import(`markdown/${slug}.mdx`))))
    .map<MetadataType>(({ metadata }, index) => ({ ...metadata, slug: slugs[index] }))
    .filter(({ tags }) => tags?.includes(procedure?.name ?? ""))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <StructuredData type="FAQ" faqs={procedure?.faqs} />
      <div className="max-w-7xl mx-auto py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl mx-auto leading-tight pb-4">
            <span className="font-bold">{procedure?.name}</span> by Ubuntu Med Spa
          </h2>
          <h2 className="text-xl lg:text-2xl mb-8 max-w-5xl mx-auto font-light">{procedure?.headline}</h2>
          <p className="text-lg max-w-4xl mx-auto">{procedure?.description}</p>
          <div className="flex space-x-4 mx-auto my-8 justify-center">
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Link href="/consult">Book a Consultation</Link>
            </Button>
            {Boolean(articles.length) && (
              <Button variant="secondary">
                <Link href="#benefits">Explore Benefits</Link>
              </Button>
            )}
          </div>
        </div>

        <div className="my-32 text-center max-w-5xl mx-auto" id="benefits">
          <h2 className="text-2xl md:text-4xl mx-auto leading-tight pb-4 text-center font-light">
            <span className="font-bold">{procedure?.name}</span> Benefits
          </h2>
          <h2 className="text-xl lg:text-2xl mb-8 font-light">{procedure?.benefitsHeadline}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {procedure?.benefits.map(({ emoji, benefit, description }) => (
              <Card key={benefit} className="text-left bg-blue-500 text-white border-4 border-blue-400">
                <CardHeader>
                  <CardTitle>
                    {emoji} {benefit}
                  </CardTitle>
                </CardHeader>
                <CardContent>{description}</CardContent>
              </Card>
            ))}
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-center xl:items-center mt-12 space-x-4">
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Link href="/consult">Book a Consultation</Link>
            </Button>
            {Boolean(articles.length) && (
              <Button variant="secondary">
                <Link href="#faqs">Frequently Asked Questions</Link>
              </Button>
            )}
          </div>
        </div>

        <div className="my-32 text-center max-w-5xl mx-auto" id="faqs">
          <h2 className="text-2xl md:text-4xl mx-auto leading-tight pb-4 text-center font-light">
            Frequently Asked Questions about <span className="font-bold">{procedure?.name}</span>
          </h2>
          <h2 className="text-xl lg:text-2xl mb-8 font-light">{procedure?.faqHeadline}</h2>
          <Accordion type="single" collapsible className="text-left">
            {procedure?.faqs.map(({ question, answer }) => (
              <AccordionItem key={question} value={question}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionContent>{answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="flex flex-col lg:flex-row lg:justify-center xl:items-center mt-12 space-x-4">
            {Boolean(articles.length) && (
              <>
                <Button className="bg-blue-500 hover:bg-blue-600">
                  <Link href="/consult">Book a Consultation</Link>
                </Button>

                <Button variant="secondary">
                  <Link href="#posts">Learn More</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {Boolean(articles.length) && (
          <div className="my-32" id="posts">
            <div className="mb-16">
              <h2 className="text-2xl md:text-4xl mx-auto leading-tight pb-4 text-center font-light">
                More About <span className="font-semibold">{procedure?.name}</span>
              </h2>
              <p className="text-lg lg:text-xl max-w-5xl mx-auto text-center">{procedure?.blogHeadline}</p>
            </div>
            <div className="max-w-3xl mx-auto">
              {articles.map((article) => (
                <article key={article.slug} className="relative isolate flex flex-col gap-8 lg:flex-row">
                  <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0 bg-gray-50">
                    <Image src={article.image} alt="" fill className="object-cover" />
                    <div className="absolute inset-0 shadow-inner bg-gradient-to-br from-white/20" />
                  </div>
                  <div className="py-4">
                    <div className="flex flex-wrap items-center text-xs gap-2">
                      <Badge className="bg-purple-500 hover:bg-purple-600">
                        {new Date(article.date).toLocaleDateString("en-GB", {
                          dateStyle: "long",
                        })}
                      </Badge>
                      {article.tags.map((tag) => (
                        <Badge key={tag} className="bg-blue-500 hover:bg-blue-600">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="group relative max-w-xl">
                      <h2 className="mt-3 text-lg/snug sm:text-xl/snug md:text-2xl/snug font-semibold text-white-900 hover:text-blue-200">
                        <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-white">{article.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
        <CtaFooter />
      </div>
    </>
  );
}
