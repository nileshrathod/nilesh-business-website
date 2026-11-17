import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X } from 'lucide-react';
import { InsightArticle, siteConfig } from '../config/siteConfig';
import { SeoHead } from '../components/SeoHead';
import { ResilientImage } from '../components/ResilientImage';
import { FinalCtaSection } from '../components/FinalCtaSection';

export function InsightsPage() {
  const categories = ['All', ...Array.from(new Set(siteConfig.insights.map((a) => a.category)))];
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedArticle, setSelectedArticle] = useState<InsightArticle | null>(null);

  const visibleArticles =
    activeCategory === 'All'
      ? siteConfig.insights
      : siteConfig.insights.filter((article) => article.category === activeCategory);

  useEffect(() => {
    if (!selectedArticle) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedArticle(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedArticle]);

  return (
    <>
      <SeoHead
        title="Insights"
        description={`Sample articles and technical notes from ${siteConfig.brand.companyName} covering AI workflows, SharePoint architecture, custom apps, and digital strategy.`}
      />

      <section className="border-b border-[#031634]/10 bg-white pt-12 pb-14 sm:pt-16 sm:pb-16 dark:border-white/10 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-wide text-[#00876A] dark:text-[#00CBA0]">
                Insights · Sample Editorial Layout
              </p>
              <h1 className="mt-3 font-display text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-tight text-[#031634] text-balance dark:text-white">
                Practical Notes on Systems, Automation, and Applied AI
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#031634]/80 sm:text-lg dark:text-zinc-300">
                The articles below are clearly labelled sample drafts illustrating the editorial structure for future guides on AI integration, Microsoft 365, SharePoint, and application engineering.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-[#031634]/10 aspect-[4/3] dark:border-white/15">
                <ResilientImage
                  src={siteConfig.assets.insightsVisual}
                  alt="Minimalist glass prisms and geometric blocks casting teal and amber light"
                  className="h-full w-full object-cover"
                  fallbackTitle="Technical Insights"
                  priority
                />
              </div>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Filter insights by topic"
            className="mt-10 flex flex-wrap items-center gap-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                  activeCategory === category
                    ? 'bg-[#031634] text-white dark:bg-[#00CBA0] dark:text-black'
                    : 'border border-[#031634]/15 bg-[#F3F3FF] text-[#031634] hover:bg-[#E7E7FA] dark:border-white/15 dark:bg-[#111111] dark:text-zinc-300 dark:hover:bg-[#1C1C1C]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {visibleArticles.map((article) => (
              <article
                key={article.id}
                className="flex flex-col justify-between rounded-2xl border border-[#031634]/10 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-[#0A0A0A]"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#031634]/65 dark:text-zinc-400">
                    <span className="font-semibold text-[#00876A] dark:text-[#00CBA0]">
                      {article.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{article.statusLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="mt-3 font-display text-xl font-semibold text-[#031634] text-balance dark:text-white">
                    {article.title}
                  </h2>

                  <p className="mt-3 text-sm leading-relaxed text-[#031634]/80 dark:text-zinc-300">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#031634]/10 pt-5 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00876A] transition-colors hover:text-[#031634] dark:text-[#00CBA0] dark:hover:text-white"
                  >
                    <span>Read Sample Article</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#031634]/15 bg-white p-6 shadow-xl sm:p-8 dark:border-white/15 dark:bg-[#0A0A0A]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#031634]/65 dark:text-zinc-400">
                <span className="font-semibold text-[#00876A] dark:text-[#00CBA0]">
                  {selectedArticle.category}
                </span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.statusLabel}</span>
                <span aria-hidden="true">·</span>
                <span>{selectedArticle.readTime}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                aria-label="Close article reader"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#031634]/15 text-[#031634] transition-colors hover:bg-[#F3F3FF] dark:border-white/15 dark:text-zinc-300 dark:hover:bg-[#161616] dark:hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <h2
              id="article-modal-title"
              className="mt-4 font-display text-2xl font-semibold tracking-tight text-[#031634] dark:text-white"
            >
              {selectedArticle.title}
            </h2>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#031634]/85 sm:text-base dark:text-zinc-300">
              {selectedArticle.bodyParagraphs.map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-[#031634]/10 bg-[#F3F3FF] p-5 dark:border-white/10 dark:bg-black">
              <h3 className="font-display text-sm font-semibold text-[#031634] dark:text-white">
                Key Takeaways
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-[#031634]/80 dark:text-zinc-300">
                {selectedArticle.keyTakeaways.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <Check
                      className="mt-1 h-4 w-4 shrink-0 text-[#00876A] dark:text-[#00CBA0]"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#031634]/10 pt-5 dark:border-white/10">
              <span className="text-xs text-[#031634]/60 dark:text-zinc-400">
                Sample draft content configured in src/config/siteConfig.ts
              </span>
              <Link
                to="/contact"
                onClick={() => setSelectedArticle(null)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#00CBA0] px-4 py-2 text-sm font-semibold text-[#031634] transition-colors hover:bg-[#00B58E] dark:text-black dark:hover:bg-[#19DDB3]"
              >
                <span>Discuss This Topic</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <FinalCtaSection />
    </>
  );
}
