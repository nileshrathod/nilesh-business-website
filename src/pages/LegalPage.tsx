import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { SeoHead } from '../components/SeoHead';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

export function LegalPage({ type }: LegalPageProps) {
  const isPrivacy = type === 'privacy';
  const pageTitle = isPrivacy ? 'Privacy Policy (Draft)' : 'Terms of Use (Draft)';

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={`Draft ${isPrivacy ? 'Privacy Policy' : 'Terms of Use'} prototype placeholder for ${siteConfig.brand.companyName}.`}
      />

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-start gap-3 rounded-xl border border-[#FFC830]/60 bg-[#FFC830]/15 p-4 text-sm text-[#031634] dark:border-[#FFC830]/40 dark:bg-[#FFC830]/10 dark:text-zinc-100">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#9A7100] dark:text-[#FFC830]" aria-hidden="true" />
            <div>
              <p className="font-semibold">Draft Prototype Document — Not Reviewed Legal Advice</p>
              <p className="mt-1 text-xs leading-relaxed opacity-90">
                This page is a structured placeholder created for prototype evaluation prior to formal business registration. Replace these sections with policies reviewed by qualified legal counsel before public commercial launch.
              </p>
            </div>
          </div>

          <h1 className="font-display text-3xl font-bold tracking-tight text-[#031634] dark:text-white">
            {pageTitle}
          </h1>
          <p className="mt-2 text-sm text-[#031634]/65 dark:text-zinc-400">
            Entity placeholder: {siteConfig.brand.companyName} · {siteConfig.brand.location}
          </p>

          {isPrivacy ? (
            <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#031634]/80 dark:text-zinc-300">
              <section className="space-y-2">
                <h2 className="font-display text-lg font-semibold text-[#031634] dark:text-white">
                  1. Prototype Data Handling
                </h2>
                <p>
                  In its current prototype state, this website does not transmit contact form entries to an external email server or store submitted personal information in browser storage. Only your selected light/dark display preference is saved locally via <code className="font-mono text-xs">localStorage</code>.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-lg font-semibold text-[#031634] dark:text-white">
                  2. Future Inquiry Processing (Placeholder)
                </h2>
                <p>
                  [Insert final description of how inquiry form submissions, business email correspondence, and telephone inquiries will be processed, stored, and retained under applicable Canadian privacy legislation (PIPEDA) and any relevant international frameworks.]
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-lg font-semibold text-[#031634] dark:text-white">
                  3. Contact for Privacy Questions (Draft)
                </h2>
                <p>
                  For privacy inquiries during prototype evaluation, contact{' '}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="font-medium text-[#00876A] underline dark:text-[#00CBA0]"
                  >
                    {siteConfig.contact.email}
                  </a>{' '}
                  or telephone{' '}
                  <a
                    href={siteConfig.contact.phoneHref}
                    className="font-medium text-[#00876A] underline dark:text-[#00CBA0]"
                  >
                    {siteConfig.contact.phone}
                  </a>
                  .
                </p>
              </section>
            </div>
          ) : (
            <div className="mt-8 space-y-6 text-sm leading-relaxed text-[#031634]/80 dark:text-zinc-300">
              <section className="space-y-2">
                <h2 className="font-display text-lg font-semibold text-[#031634] dark:text-white">
                  1. Informational & Prototype Purpose
                </h2>
                <p>
                  Content on this website is provided as a prototype overview of proposed consulting and digital engineering services under the working name {siteConfig.brand.companyName}. Nothing on this website constitutes a binding offer, service-level commitment, or legal representation.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-lg font-semibold text-[#031634] dark:text-white">
                  2. Intellectual Property & Third-Party Marks (Placeholder)
                </h2>
                <p>
                  [Insert final intellectual property terms.] References to Microsoft 365, SharePoint, Power Apps, Power Automate, Microsoft Azure, and Microsoft Entra ID describe technical capabilities only and do not imply vendor affiliation or endorsement.
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-display text-lg font-semibold text-[#031634] dark:text-white">
                  3. Governing Law (Placeholder)
                </h2>
                <p>
                  [Insert final governing jurisdiction clause—e.g., Province of Saskatchewan, Canada—once reviewed by legal counsel.]
                </p>
              </section>
            </div>
          )}

          <div className="mt-10 border-t border-[#031634]/10 pt-6 dark:border-white/10">
            <Link
              to="/"
              className="text-sm font-semibold text-[#00876A] hover:text-[#031634] dark:text-[#00CBA0] dark:hover:text-white"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
