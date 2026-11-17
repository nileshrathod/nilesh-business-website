import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export function FinalCtaSection() {
  return (
    <section aria-labelledby="final-cta-heading" className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#031634]/10 bg-[#031634] px-6 py-12 text-white sm:px-12 sm:py-16 dark:border-white/15 dark:bg-[#0A0A0A]">
          <div className="mx-auto max-w-3xl text-center">
            <h2
              id="final-cta-heading"
              className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl text-balance"
            >
              {siteConfig.finalCta.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg dark:text-zinc-300">
              {siteConfig.finalCta.supportingText}
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                to={siteConfig.finalCta.buttonPath}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#00CBA0] px-6 py-3 text-sm font-semibold text-[#031634] transition-colors duration-150 hover:bg-[#19DDB3] dark:text-black"
              >
                <span>{siteConfig.finalCta.buttonLabel}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
