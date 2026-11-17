import { Link } from 'react-router-dom';
import { SeoHead } from '../components/SeoHead';

export function NotFoundPage() {
  return (
    <>
      <SeoHead title="Page Not Found" />
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-xl px-4 text-center sm:px-6">
          <p className="font-mono text-xs font-semibold text-[#00876A] dark:text-[#00CBA0]">
            404
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#031634] dark:text-white">
            Page Not Found
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#031634]/75 dark:text-zinc-400">
            The page you requested could not be located. Use the navigation above or return to the homepage.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              to="/"
              className="inline-flex min-h-[44px] items-center rounded-lg bg-[#00CBA0] px-5 py-2.5 text-sm font-semibold text-[#031634] transition-colors hover:bg-[#00B58E] dark:text-black dark:hover:bg-[#19DDB3]"
            >
              Go to Home
            </Link>
            <Link
              to="/contact"
              className="inline-flex min-h-[44px] items-center rounded-lg border border-[#031634]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#031634] transition-colors hover:bg-[#F3F3FF] dark:border-white/15 dark:bg-[#0A0A0A] dark:text-white dark:hover:bg-[#161616]"
            >
              Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
