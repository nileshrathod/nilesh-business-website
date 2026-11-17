import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#031634]/10 bg-white transition-colors duration-200 dark:border-white/10 dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-block rounded-md">
              <BrandLogo />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-[#031634]/75 dark:text-zinc-400">
              {siteConfig.brand.description}
            </p>
            <p className="text-xs font-medium text-[#00876A] dark:text-[#00CBA0]">
              {siteConfig.brand.tagline}
            </p>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-display text-sm font-semibold text-[#031634] dark:text-white">
              Navigation
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteConfig.navigation.links.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-[#031634]/75 transition-colors hover:text-[#00876A] dark:text-zinc-400 dark:hover:text-[#00CBA0]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-semibold text-[#031634] dark:text-white">
              Core Services
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {siteConfig.services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services#${service.id}`}
                    className="text-[#031634]/75 transition-colors hover:text-[#00876A] dark:text-zinc-400 dark:hover:text-[#00CBA0]"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-semibold text-[#031634] dark:text-white">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-[#031634]/75 dark:text-zinc-400">
              <li className="font-medium text-[#031634] dark:text-zinc-200">
                {siteConfig.contact.contactName}
              </li>
              <li>
                <a
                  href={siteConfig.contact.phoneHref}
                  className="inline-flex items-center gap-2 transition-colors hover:text-[#00876A] dark:hover:text-[#00CBA0]"
                >
                  <Phone className="h-4 w-4 shrink-0 text-[#00876A] dark:text-[#00CBA0]" aria-hidden="true" />
                  <span className="tabular-nums">{siteConfig.contact.phone}</span>
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#00876A] dark:text-[#00CBA0]" aria-hidden="true" />
                <div>
                  {siteConfig.contact.isEmailConfigured ? (
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="transition-colors hover:text-[#00876A] dark:hover:text-[#00CBA0]"
                    >
                      {siteConfig.contact.email}
                    </a>
                  ) : (
                    <span className="text-[#031634]/65 dark:text-zinc-400">
                      {siteConfig.contact.emailPlaceholderLabel}
                    </span>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#00876A] dark:text-[#00CBA0]" aria-hidden="true" />
                <span>{siteConfig.contact.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[#031634]/10 pt-8 text-xs text-[#031634]/65 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:text-zinc-400">
          <div className="space-y-1">
            <p>
              &copy; {currentYear} {siteConfig.brand.companyName}. All rights reserved.
            </p>
            <p className="text-[#031634]/55 dark:text-zinc-500">
              {siteConfig.brand.prototypeNotice}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            {siteConfig.navigation.legalLinks.map((legal) => (
              <Link
                key={legal.path}
                to={legal.path}
                className="whitespace-nowrap transition-colors hover:text-[#031634] dark:hover:text-white"
              >
                {legal.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
