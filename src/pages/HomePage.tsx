import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { SeoHead } from '../components/SeoHead';
import { ResilientImage } from '../components/ResilientImage';
import { ServiceIcon, TechIcon } from '../components/IconMap';
import { FinalCtaSection } from '../components/FinalCtaSection';

export function HomePage() {
  return (
    <>
      <SeoHead />

      {/* A. Hero Section */}
      <section className="border-b border-[#031634]/10 bg-white pt-12 pb-16 sm:pt-16 sm:pb-24 dark:border-white/10 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col justify-center lg:col-span-7">
              <p className="text-xs font-semibold tracking-wide text-[#00876A] dark:text-[#00CBA0]">
                {siteConfig.brand.location}
                <span aria-hidden="true" className="mx-2 text-[#031634]/35 dark:text-zinc-600">
                  ·
                </span>
                {siteConfig.brand.serviceArea}
              </p>

              <h1 className="mt-4 font-display text-[clamp(2.25rem,4vw,3.75rem)] font-bold leading-[1.08] tracking-tight text-[#031634] text-balance dark:text-white">
                {siteConfig.hero.headline}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#031634]/80 sm:text-lg dark:text-zinc-300">
                {siteConfig.hero.supportingCopy}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to={siteConfig.hero.primaryCtaPath}
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap shrink-0 rounded-lg bg-[#00CBA0] px-6 py-3 text-sm font-semibold text-[#031634] transition-colors duration-150 hover:bg-[#00B58E] dark:text-black dark:hover:bg-[#19DDB3]"
                >
                  <span>{siteConfig.hero.primaryCtaLabel}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  to={siteConfig.hero.secondaryCtaPath}
                  className="inline-flex min-h-[44px] items-center justify-center whitespace-nowrap shrink-0 rounded-lg border border-[#031634]/20 bg-[#F3F3FF] px-6 py-3 text-sm font-semibold text-[#031634] transition-colors duration-150 hover:bg-[#E7E7FA] dark:border-white/15 dark:bg-[#0D0D0D] dark:text-white dark:hover:bg-[#181818]"
                >
                  {siteConfig.hero.secondaryCtaLabel}
                </Link>
              </div>

              <p className="mt-8 text-xs text-[#031634]/65 dark:text-zinc-400">
                <span className="font-semibold text-[#031634] dark:text-[#FFC830]">
                  {siteConfig.brand.tagline}
                </span>
                <span aria-hidden="true" className="mx-2">
                  /
                </span>
                {siteConfig.brand.supportingMessage}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full min-h-[260px] overflow-hidden rounded-2xl border border-[#031634]/10 bg-black dark:border-white/15">
                <ResilientImage
                  src={siteConfig.assets.heroVisual}
                  alt="Abstract architectural visualization of interconnected digital systems and cloud infrastructure"
                  className="h-full w-full object-cover"
                  fallbackTitle={`${siteConfig.brand.companyName} — Digital Architecture`}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B. Services Overview */}
      <section
        aria-labelledby="services-overview-heading"
        className="py-16 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[#00876A] dark:text-[#00CBA0]">
                Services
              </p>
              <h2
                id="services-overview-heading"
                className="mt-2 font-display text-2xl font-semibold tracking-tight text-[#031634] sm:text-3xl text-balance dark:text-white"
              >
                Practical Technology Capabilities Built Around Real Operations
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 text-sm font-semibold text-[#00876A] transition-colors hover:text-[#031634] dark:text-[#00CBA0] dark:hover:text-white"
            >
              <span>View full service details</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {siteConfig.services.map((service) => (
              <article
                key={service.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#031634]/10 bg-white p-6 transition-colors duration-150 hover:border-[#00CBA0]/60 sm:p-8 dark:border-white/10 dark:bg-[#0A0A0A] dark:hover:border-[#00CBA0]/50"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#031634]/10 bg-[#F3F3FF] text-[#00876A] dark:border-white/10 dark:bg-[#141414] dark:text-[#00CBA0]">
                      <ServiceIcon icon={service.icon} className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-medium tabular-nums text-[#031634]/45 dark:text-zinc-500">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-semibold text-[#031634] dark:text-white">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#031634]/75 dark:text-zinc-300">
                    {service.shortDescription}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-[#031634]/10 pt-4 text-sm text-[#031634]/75 dark:border-white/10 dark:text-zinc-400">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <Check
                          className="mt-1 h-3.5 w-3.5 shrink-0 text-[#00876A] dark:text-[#00CBA0]"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-2">
                  <Link
                    to={`/services#${service.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#00876A] transition-colors hover:text-[#031634] dark:text-[#00CBA0] dark:hover:text-white"
                  >
                    <span>Explore {service.title}</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* C. Why AASTRA Digital */}
      <section
        aria-labelledby="why-heading"
        className="border-y border-[#031634]/10 bg-white py-16 sm:py-24 dark:border-white/10 dark:bg-[#080808]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#00876A] dark:text-[#00CBA0]">
              Why {siteConfig.brand.companyName}
            </p>
            <h2
              id="why-heading"
              className="mt-2 font-display text-2xl font-semibold tracking-tight text-[#031634] sm:text-3xl text-balance dark:text-white"
            >
              Built for Organizations That Value Clarity, Reliability, and Measurable Progress
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.whyPrinciples.map((principle) => (
              <div
                key={principle.number}
                className="border-t border-[#031634]/10 pt-5 dark:border-white/10"
              >
                <span className="font-mono text-xs font-semibold tabular-nums text-[#00876A] dark:text-[#FFC830]">
                  {principle.number}
                </span>
                <h3 className="mt-2 font-display text-base font-semibold text-[#031634] dark:text-white">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#031634]/75 dark:text-zinc-400">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* D. Our Approach */}
      <section aria-labelledby="approach-heading" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#00876A] dark:text-[#00CBA0]">
              Our Approach
            </p>
            <h2
              id="approach-heading"
              className="mt-2 font-display text-2xl font-semibold tracking-tight text-[#031634] sm:text-3xl text-balance dark:text-white"
            >
              A Structured Four-Step Delivery Process
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.approachSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-[#031634]/10 bg-white p-6 dark:border-white/10 dark:bg-[#0A0A0A]"
              >
                <span className="font-mono text-xs font-semibold tabular-nums text-[#00876A] dark:text-[#00CBA0]">
                  Step {item.step}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold text-[#031634] dark:text-white">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm font-medium text-[#031634] dark:text-zinc-200">
                  {item.summary}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#031634]/75 dark:text-zinc-400">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E. Technology Ecosystem */}
      <section
        aria-labelledby="ecosystem-heading"
        className="border-y border-[#031634]/10 bg-white py-16 sm:py-24 dark:border-white/10 dark:bg-[#080808]"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[#00876A] dark:text-[#00CBA0]">
                Technology Ecosystem
              </p>
              <h2
                id="ecosystem-heading"
                className="mt-2 font-display text-2xl font-semibold tracking-tight text-[#031634] sm:text-3xl text-balance dark:text-white"
              >
                Platforms and Engineering Foundations We Work With
              </h2>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-[#031634]/65 dark:text-zinc-400">
              Technologies listed below reflect service capabilities and integration focus, not official vendor endorsements or partnership tiers.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.technologyEcosystem.map((tech) => (
              <div
                key={tech.id}
                className="flex items-center gap-4 rounded-xl border border-[#031634]/10 bg-[#F3F3FF]/70 p-4 dark:border-white/10 dark:bg-[#111111]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#031634]/10 bg-white text-[#00876A] dark:border-white/10 dark:bg-black dark:text-[#00CBA0]">
                  <TechIcon icon={tech.icon} className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-display text-sm font-semibold text-[#031634] dark:text-white">
                    {tech.name}
                  </h3>
                  <p className="truncate text-xs text-[#031634]/65 dark:text-zinc-400">
                    {tech.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* F. Final CTA */}
      <FinalCtaSection />
    </>
  );
}
