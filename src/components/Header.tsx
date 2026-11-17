import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { useTheme } from '../context/ThemeContext';
import { BrandLogo } from './BrandLogo';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#031634]/10 bg-white/95 backdrop-blur-md transition-colors duration-200 dark:border-white/10 dark:bg-black/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="whitespace-nowrap shrink-0 rounded-md py-1 focus-visible:outline-offset-4"
          aria-label={`${siteConfig.brand.companyName} home`}
        >
          <BrandLogo />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7"
        >
          {siteConfig.navigation.links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `whitespace-nowrap shrink-0 text-sm font-medium transition-colors duration-150 relative py-1 ${
                  isActive
                    ? 'text-[#00876A] dark:text-[#00CBA0] after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:bg-[#00CBA0]'
                    : 'text-[#031634]/80 hover:text-[#031634] dark:text-zinc-300 dark:hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#031634]/15 bg-[#F3F3FF] text-[#031634] transition-colors duration-150 hover:bg-[#E7E7FA] dark:border-white/15 dark:bg-[#111111] dark:text-zinc-200 dark:hover:bg-[#1C1C1C] dark:hover:text-white"
          >
            {theme === 'dark' ? (
              <Sun className="h-[18px] w-[18px] text-[#FFC830]" aria-hidden="true" />
            ) : (
              <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
            )}
          </button>

          <Link
            to={siteConfig.navigation.primaryCta.path}
            className="hidden sm:inline-flex items-center justify-center whitespace-nowrap shrink-0 rounded-lg bg-[#00CBA0] px-4 py-2 text-sm font-semibold text-[#031634] transition-colors duration-150 hover:bg-[#00B58E] dark:text-black dark:hover:bg-[#19DDB3]"
          >
            {siteConfig.navigation.primaryCta.label}
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#031634]/15 bg-white text-[#031634] transition-colors duration-150 hover:bg-[#F3F3FF] lg:hidden dark:border-white/15 dark:bg-[#111111] dark:text-white dark:hover:bg-[#1C1C1C]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="border-t border-[#031634]/10 bg-white px-4 pb-6 pt-4 shadow-lg lg:hidden dark:border-white/10 dark:bg-[#0A0A0A]"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col space-y-1">
            {siteConfig.navigation.links.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex min-h-[44px] items-center rounded-lg px-3 py-2 text-base font-medium transition-colors duration-150 ${
                    isActive
                      ? 'bg-[#00CBA0]/15 text-[#00876A] dark:bg-[#00CBA0]/15 dark:text-[#00CBA0]'
                      : 'text-[#031634]/80 hover:bg-[#F3F3FF] hover:text-[#031634] dark:text-zinc-200 dark:hover:bg-[#161616] dark:hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-4 border-t border-[#031634]/10 pt-4 dark:border-white/10">
            <Link
              to={siteConfig.navigation.primaryCta.path}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-[44px] w-full items-center justify-center rounded-lg bg-[#00CBA0] px-4 py-2.5 text-base font-semibold text-[#031634] transition-colors duration-150 hover:bg-[#00B58E] dark:text-black dark:hover:bg-[#19DDB3]"
            >
              {siteConfig.navigation.primaryCta.label}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
