import { useSearchParams } from 'react-router-dom';
import { Mail, MapPin, Phone, User } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { SeoHead } from '../components/SeoHead';
import { ContactForm } from '../components/ContactForm';

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get('service') || '';

  return (
    <>
      <SeoHead
        title="Contact"
        description={`Contact ${siteConfig.contact.contactName} at ${siteConfig.brand.companyName} in ${siteConfig.contact.location} to discuss AI, automation, Microsoft 365, or custom software projects.`}
      />

      <section className="border-b border-[#031634]/10 bg-white pt-12 pb-14 sm:pt-16 sm:pb-16 dark:border-white/10 dark:bg-black">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold tracking-wide text-[#00876A] dark:text-[#00CBA0]">
              Contact
            </p>
            <h1 className="mt-3 font-display text-[clamp(2rem,3.5vw,3rem)] font-bold tracking-tight text-[#031634] text-balance dark:text-white">
              Start a Conversation About Your Systems and Goals
            </h1>
            <p className="mt-4 text-base leading-relaxed text-[#031634]/80 sm:text-lg dark:text-zinc-300">
              Reach out directly by telephone or use the inquiry form below to outline what your organization is looking to simplify, automate, or build.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <aside className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-[#031634]/10 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-[#0A0A0A]">
                <h2 className="font-display text-lg font-semibold text-[#031634] dark:text-white">
                  Direct Contact Details
                </h2>
                <p className="mt-2 text-sm text-[#031634]/70 dark:text-zinc-400">
                  {siteConfig.brand.serviceArea}.
                </p>

                <dl className="mt-6 space-y-5 text-sm">
                  <div className="flex items-start gap-3">
                    <User className="mt-0.5 h-5 w-5 shrink-0 text-[#00876A] dark:text-[#00CBA0]" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-medium text-[#031634]/60 dark:text-zinc-400">
                        Contact
                      </dt>
                      <dd className="mt-0.5 font-medium text-[#031634] dark:text-white">
                        {siteConfig.contact.contactName}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#00876A] dark:text-[#00CBA0]" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-medium text-[#031634]/60 dark:text-zinc-400">
                        Telephone
                      </dt>
                      <dd className="mt-0.5">
                        <a
                          href={siteConfig.contact.phoneHref}
                          className="font-medium tabular-nums text-[#031634] underline decoration-[#031634]/25 underline-offset-4 transition-colors hover:text-[#00876A] hover:decoration-[#00876A] dark:text-white dark:decoration-white/25 dark:hover:text-[#00CBA0]"
                        >
                          {siteConfig.contact.phone}
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-[#00876A] dark:text-[#00CBA0]" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-medium text-[#031634]/60 dark:text-zinc-400">
                        Email
                      </dt>
                      <dd className="mt-0.5">
                        {siteConfig.contact.isEmailConfigured ? (
                          <a
                            href={`mailto:${siteConfig.contact.email}`}
                            className="font-medium text-[#031634] underline decoration-[#031634]/25 underline-offset-4 transition-colors hover:text-[#00876A] dark:text-white dark:hover:text-[#00CBA0]"
                          >
                            {siteConfig.contact.email}
                          </a>
                        ) : (
                          <span className="text-[#031634]/70 dark:text-zinc-400">
                            {siteConfig.contact.emailPlaceholderLabel}
                          </span>
                        )}
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#00876A] dark:text-[#00CBA0]" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-medium text-[#031634]/60 dark:text-zinc-400">
                        Location
                      </dt>
                      <dd className="mt-0.5 font-medium text-[#031634] dark:text-white">
                        {siteConfig.contact.location}
                      </dd>
                    </div>
                  </div>
                </dl>
              </div>
            </aside>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[#031634]/10 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-[#0A0A0A]">
                <h2 className="font-display text-xl font-semibold text-[#031634] dark:text-white">
                  Project Inquiry Form
                </h2>
                <p className="mt-1.5 mb-6 text-sm text-[#031634]/70 dark:text-zinc-400">
                  Share a short summary of your objectives or technical requirements.
                </p>

                <ContactForm defaultService={requestedService} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
