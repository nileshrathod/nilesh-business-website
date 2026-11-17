import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { SeoHead } from '../components/SeoHead';
import { ServiceIcon } from '../components/IconMap';
import { FinalCtaSection } from '../components/FinalCtaSection';

export function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const targetId = hash.replace('#', '');
    if (selectedCategory !== 'all' && selectedCategory !== targetId) {
      setSelectedCategory('all');
    }
    const timer = window.setTimeout(() => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [hash, selectedCategory]);

  const visibleServices =
    selectedCategory === 'all'
      ? siteConfig.services
      : siteConfig.services.filter((service) => service.id === selectedCategory);

  return (
    <>
      <SeoHead
        title="Services"
        description={`Explore ${siteConfig.brand.companyName} consulting services across AI integration, Microsoft 365, SharePoint, Power Platform, custom applications, and reporting.`}
      />

      <section className="border-b border-[#031634]/10 bg-white pt-12 pb-14 sm:pt-16 sm:pb-16 dark:border-white/10 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wide text-[#00876A] dark:text-[#00CBA0]">
              Services
            </p>
            <h1 className="mt-3 font-display text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-tight text-[#031634] text-balance dark:text-white">
              Focused Digital & Technology Services for Growing and Enterprise Teams
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#031634]/80 sm:text-lg dark:text-zinc-300">
              Each service area addresses concrete operational bottlenecks—whether modernizing your Microsoft 365 workplace, automating manual approvals, integrating practical AI, or building custom applications.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter services by capability"
            className="mt-8 flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
              className={`whitespace-nowrap shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#031634] text-white dark:bg-[#00CBA0] dark:text-black'
                  : 'border border-[#031634]/15 bg-[#F3F3FF] text-[#031634] hover:bg-[#E7E7FA] dark:border-white/15 dark:bg-[#111111] dark:text-zinc-300 dark:hover:bg-[#1C1C1C]'
              }`}
            >
              All Services ({siteConfig.services.length})
            </button>
            {siteConfig.services.map((service) => (
              <button
                key={service.id}
                type="button"
                role="tab"
                aria-selected={selectedCategory === service.id}
                onClick={() => setSelectedCategory(service.id)}
                className={`whitespace-nowrap shrink-0 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors ${
                  selectedCategory === service.id
                    ? 'bg-[#031634] text-white dark:bg-[#00CBA0] dark:text-black'
                    : 'border border-[#031634]/15 bg-[#F3F3FF] text-[#031634] hover:bg-[#E7E7FA] dark:border-white/15 dark:bg-[#111111] dark:text-zinc-300 dark:hover:bg-[#1C1C1C]'
                }`}
              >
                {service.number}. {service.title.split(' and ')[0]}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          {visibleServices.map((service) => (
            <article
              key={service.id}
              id={service.id}
              className="scroll-mt-24 rounded-2xl border border-[#031634]/10 bg-white p-6 sm:p-10 dark:border-white/10 dark:bg-[#0A0A0A]"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#031634]/10 bg-[#F3F3FF] text-[#00876A] dark:border-white/10 dark:bg-[#141414] dark:text-[#00CBA0]">
                      <ServiceIcon icon={service.icon} className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-medium tabular-nums text-[#031634]/55 dark:text-zinc-400">
                      Service {service.number}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl font-semibold tracking-tight text-[#031634] dark:text-white">
                    {service.title}
                  </h2>

                  <p className="text-sm leading-relaxed text-[#031634]/80 sm:text-base dark:text-zinc-300">
                    {service.shortDescription}
                  </p>

                  <div className="pt-2">
                    <Link
                      to={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex min-h-[40px] items-center gap-2 whitespace-nowrap rounded-lg bg-[#00CBA0] px-4 py-2 text-sm font-semibold text-[#031634] transition-colors hover:bg-[#00B58E] dark:text-black dark:hover:bg-[#19DDB3]"
                    >
                      <span>Discuss This Service</span>
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-7 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:border-l lg:border-[#031634]/10 lg:pl-8 dark:lg:border-white/10">
                  <div>
                    <h3 className="font-display text-sm font-semibold text-[#031634] dark:text-white">
                      Scope & Capabilities
                    </h3>
                    <ul className="mt-3 space-y-2.5 text-sm text-[#031634]/80 dark:text-zinc-300">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <Check
                            className="mt-1 h-4 w-4 shrink-0 text-[#00876A] dark:text-[#00CBA0]"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-display text-sm font-semibold text-[#031634] dark:text-white">
                        Common Business Problems Addressed
                      </h3>
                      <ul className="mt-3 space-y-2 text-sm text-[#031634]/70 dark:text-zinc-400">
                        {service.commonChallenges.map((challenge) => (
                          <li key={challenge} className="leading-relaxed">
                            • {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="border-t border-[#031634]/10 pt-4 dark:border-white/10">
                      <h3 className="font-display text-sm font-semibold text-[#031634] dark:text-white">
                        How We Approach It
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#031634]/80 dark:text-zinc-300">
                        {service.solutionApproach}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FinalCtaSection />
    </>
  );
}
