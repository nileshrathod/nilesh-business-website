import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { SeoHead } from '../components/SeoHead';
import { ResilientImage } from '../components/ResilientImage';
import { FinalCtaSection } from '../components/FinalCtaSection';

export function SolutionsPage() {
  const categories = ['All', ...Array.from(new Set(siteConfig.solutions.map((s) => s.category)))];
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredSolutions =
    activeCategory === 'All'
      ? siteConfig.solutions
      : siteConfig.solutions.filter((item) => item.category === activeCategory);

  return (
    <>
      <SeoHead
        title="Solutions"
        description={`Use-case digital solutions from ${siteConfig.brand.companyName}: intranets, workflow automation, applied AI processes, custom internal apps, and reporting dashboards.`}
      />

      <section className="border-b border-[#031634]/10 bg-white pt-12 pb-14 sm:pt-16 sm:pb-16 dark:border-white/10 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-wide text-[#00876A] dark:text-[#00CBA0]">
                Solutions
              </p>
              <h1 className="mt-3 font-display text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-tight text-[#031634] text-balance dark:text-white">
                Use-Case Solutions Designed Around How Teams Actually Work
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#031634]/80 sm:text-lg dark:text-zinc-300">
                Rather than starting with isolated software products, these solution architectures combine Microsoft 365, automation, data integration, and custom engineering to solve everyday operational friction.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl border border-[#031634]/10 aspect-[16/9] dark:border-white/15">
                <ResilientImage
                  src={siteConfig.assets.solutionsVisual}
                  alt="Modern architectural workspace illustrating collaborative digital workplace design"
                  className="h-full w-full object-cover"
                  fallbackTitle="Digital Workplace Solutions"
                  priority
                />
              </div>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Filter solutions by category"
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
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {filteredSolutions.map((solution) => (
              <article
                key={solution.id}
                className="flex flex-col justify-between rounded-2xl border border-[#031634]/10 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-[#0A0A0A]"
              >
                <div>
                  <p className="text-xs font-semibold text-[#00876A] dark:text-[#00CBA0]">
                    {solution.category}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-semibold text-[#031634] dark:text-white">
                    {solution.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-[#031634]/80 dark:text-zinc-300">
                    {solution.summary}
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-6 border-t border-[#031634]/10 pt-5 sm:grid-cols-2 dark:border-white/10">
                    <div>
                      <h3 className="font-display text-xs font-semibold tracking-wide text-[#031634] dark:text-zinc-200">
                        Problems Solved
                      </h3>
                      <ul className="mt-2.5 space-y-2 text-sm text-[#031634]/70 dark:text-zinc-400">
                        {solution.challengesSolved.map((problem) => (
                          <li key={problem} className="leading-relaxed">
                            • {problem}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-display text-xs font-semibold tracking-wide text-[#031634] dark:text-zinc-200">
                        Typical Architecture
                      </h3>
                      <ul className="mt-2.5 space-y-2 text-sm text-[#031634]/80 dark:text-zinc-300">
                        {solution.architectureHighlights.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <Check
                              className="mt-1 h-3.5 w-3.5 shrink-0 text-[#00876A] dark:text-[#00CBA0]"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#031634]/10 pt-5 dark:border-white/10">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#031634]/65 dark:text-zinc-400">
                    {solution.relatedServiceIds.map((serviceId, idx) => {
                      const matched = siteConfig.services.find((s) => s.id === serviceId);
                      if (!matched) return null;
                      return (
                        <span key={serviceId} className="inline-flex items-center gap-2">
                          {idx > 0 && <span aria-hidden="true">·</span>}
                          <Link
                            to={`/services#${matched.id}`}
                            className="hover:text-[#00876A] dark:hover:text-[#00CBA0]"
                          >
                            {matched.title}
                          </Link>
                        </span>
                      );
                    })}
                  </div>

                  <Link
                    to={`/contact?service=${encodeURIComponent(solution.title)}`}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-[#00876A] transition-colors hover:text-[#031634] dark:text-[#00CBA0] dark:hover:text-white"
                  >
                    <span>Explore Solution</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalCtaSection />
    </>
  );
}
