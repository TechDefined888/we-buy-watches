"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const brands = [
  { name: "Rolex", href: "/sell-rolex" },
  { name: "Patek Philippe", href: "/sell-patek-philippe" },
  { name: "Audemars Piguet", href: "/sell-audemars-piguet" },
  { name: "Richard Mille", href: "/sell-richard-mille" },
  {
    name: "Vacheron Constantin",
    href: "/sell-vacheron-constantin",
  },
  { name: "A. Lange & Söhne", href: "/sell-a-lange-sohne" },
  { name: "F.P. Journe", href: "/sell-fp-journe" },
  { name: "Breguet", href: "/sell-breguet" },
  { name: "Jaeger-LeCoultre", href: "/sell-jaeger-lecoultre" },
  { name: "Cartier", href: "/sell-cartier" },
  { name: "IWC", href: "/sell-iwc" },
  { name: "Hublot", href: "/sell-hublot" },
];

const navItems = [
  { name: "Home", href: "/" },
  { name: "Sell Your Timepiece", href: "/sell-luxury-watches" },
  { name: "Our Process", href: "/how-it-works" },
  { name: "Watch Brands", href: "/brands" },
];

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="10.8"
        cy="10.8"
        r="6.8"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <path
        d="m16 16 4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

type BrandSearchProps = {
  id: string;
  enabled: boolean;
  focusOnOpen?: boolean;
  onSelect: () => void;
};

function BrandSearch({
  id,
  enabled,
  focusOnOpen = false,
  onSelect,
}: BrandSearchProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [resultsOpen, setResultsOpen] = useState(false);
  const [previousEnabled, setPreviousEnabled] = useState(enabled);

  // Reset only when the search changes from enabled to disabled.
  if (previousEnabled !== enabled) {
    setPreviousEnabled(enabled);

    if (!enabled) {
      setQuery("");
      setResultsOpen(false);
    }
  }

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const showResults = enabled && resultsOpen;

  useEffect(() => {
    if (!enabled) {
      if (document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }

      return;
    }

    if (focusOnOpen) {
      const frame = requestAnimationFrame(() => {
        inputRef.current?.focus();
      });

      return () => cancelAnimationFrame(frame);
    }
  }, [enabled, focusOnOpen]);

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        setResultsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="wbw-brand-search"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setResultsOpen(false);
        }
      }}
    >
      <div className="wbw-search-field">
        <SearchIcon />

        <input
          ref={inputRef}
          id={`${id}-input`}
          type="search"
          value={query}
          disabled={!enabled}
          placeholder="Discover your watch brand"
          aria-label="Search watch brands"
          aria-controls={showResults ? `${id}-results` : undefined}
          autoComplete="off"
          spellCheck={false}
          onFocus={() => setResultsOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value);
            setResultsOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setResultsOpen(false);
            }
          }}
        />
      </div>

      {showResults && (
        <div
          id={`${id}-results`}
          className="wbw-search-results"
          role="region"
          aria-label="Matching watch brands"
        >
          {filteredBrands.length > 0 ? (
            filteredBrands.map((brand) => (
              <Link
                key={brand.href}
                href={brand.href}
                onClick={() => {
                  setResultsOpen(false);
                  setQuery("");
                  onSelect();
                }}
              >
                <span>{brand.name}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))
          ) : (
            <p role="status">No matching brands found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();

  const headerRef = useRef<HTMLElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const [previousContext, setPreviousContext] = useState({
    pathname,
    scrolled,
  });

  // Close panels when the route or navbar mode changes.
  if (
    previousContext.pathname !== pathname ||
    previousContext.scrolled !== scrolled
  ) {
    setPreviousContext({ pathname, scrolled });
    setMenuOpen(false);
    setSearchOpen(false);
  }

  function closeMenus() {
    setMenuOpen(false);
    setSearchOpen(false);
  }

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    if (
      href === "/brands" &&
      brands.some((brand) => pathname === brand.href)
    ) {
      return true;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  }

  function renderLinks(mobile = false) {
    return navItems.map((item) => {
      const active = isActive(item.href);

      return (
        <Link
          key={item.href}
          href={item.href}
          className={[
            mobile ? "wbw-mobile-link" : "wbw-nav-link",
            active ? "wbw-link-active" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-current={active ? "page" : undefined}
          onClick={closeMenus}
        >
          {item.name}
        </Link>
      );
    });
  }

  useEffect(() => {
    let frame: number | null = null;

    function updateScroll() {
      const position = Math.max(0, window.scrollY);

      // Separate thresholds prevent flickering.
      setScrolled((previous) =>
        previous ? position > 40 : position > 80,
      );

      frame = null;
    }

    function handleScroll() {
      if (frame === null) {
        frame = requestAnimationFrame(updateScroll);
      }
    }

    // Read the initial scroll position in the animation callback.
    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") {
        return;
      }

      if (searchOpen) {
        setSearchOpen(false);
        searchButtonRef.current?.focus();
      } else if (menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [searchOpen, menuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    function handleResize() {
      if (media.matches) {
        setMenuOpen(false);
      }
    }

    media.addEventListener("change", handleResize);

    return () => {
      media.removeEventListener("change", handleResize);
    };
  }, []);

  const compactSearchOpen = scrolled && searchOpen;

  return (
    <div className="wbw-header-space">
      <header
        ref={headerRef}
        id="wbw-navbar"
        className={`wbw-scroll-header ${
          scrolled ? "wbw-is-scrolled" : ""
        }`}
      >
        {/* Top black bar: always visible */}
        <div className="wbw-announcement">
          <span
            className="wbw-announcement-line"
            aria-hidden="true"
          />

          <p>Exceptional timepieces. Personal connections.</p>

          <span
            className="wbw-announcement-line"
            aria-hidden="true"
          />
        </div>

        {/* Purple main bar */}
        <div className="wbw-main">
          <div className="wbw-main-inner">
            <Link
              href="/"
              className="wbw-brand"
              aria-label="We Buy Watches home"
              onClick={closeMenus}
            >
              <Image
                src="/logo/we-buy-watches-logo.png"
                alt=""
                width={76}
                height={76}
                priority
                className="wbw-logo"
              />

              <span className="wbw-brand-copy">
                <span className="wbw-brand-name">
                  We Buy Watches
                </span>

                <span className="wbw-brand-subtitle">
                  Luxury Watch Referrals
                </span>
              </span>
            </Link>

            <div className="wbw-center">
              {/* Mounted layers preserve the CSS transitions */}
              <div
                className="wbw-expanded-search"
                aria-hidden={scrolled}
                inert={scrolled}
              >
                <BrandSearch
                  id="wbw-expanded"
                  enabled={!scrolled}
                  onSelect={closeMenus}
                />
              </div>

              <nav
                className="wbw-inline-nav"
                aria-label="Compact navigation"
                aria-hidden={!scrolled}
                inert={!scrolled}
              >
                {renderLinks()}
              </nav>
            </div>

            <div className="wbw-actions">
              <button
                ref={searchButtonRef}
                type="button"
                className="wbw-search-toggle"
                aria-label={
                  compactSearchOpen
                    ? "Close brand search"
                    : "Open brand search"
                }
                aria-expanded={compactSearchOpen}
                aria-controls="wbw-compact-search"
                aria-hidden={!scrolled}
                inert={!scrolled}
                tabIndex={scrolled ? 0 : -1}
                onClick={() => {
                  setSearchOpen((previous) => !previous);
                  setMenuOpen(false);
                }}
              >
                <SearchIcon />
              </button>

              <Link
                href="/sell-luxury-watches"
                className="wbw-valuation wbw-desktop-cta"
                onClick={closeMenus}
              >
                <span>Request a Private Valuation</span>
                <span aria-hidden="true">↗</span>
              </Link>

              <button
                ref={menuButtonRef}
                type="button"
                className={`wbw-menu-toggle ${
                  menuOpen ? "wbw-menu-is-open" : ""
                }`}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="wbw-mobile-menu"
                onClick={() => {
                  setMenuOpen((previous) => !previous);
                  setSearchOpen(false);
                }}
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom black bar: collapses when scrolling */}
        <div
          className="wbw-bottom-wrap"
          aria-hidden={scrolled}
          inert={scrolled}
        >
          <nav
            className="wbw-desktop-nav"
            aria-label="Main navigation"
          >
            {renderLinks()}
          </nav>
        </div>

        {/* Compact search popup */}
        <div
          id="wbw-compact-search"
          className={`wbw-compact-search ${
            compactSearchOpen ? "wbw-panel-open" : ""
          }`}
          aria-hidden={!compactSearchOpen}
          inert={!compactSearchOpen}
        >
          <BrandSearch
            id="wbw-compact"
            enabled={compactSearchOpen}
            focusOnOpen
            onSelect={closeMenus}
          />
        </div>

        {/* Mobile menu */}
        <div
          id="wbw-mobile-menu"
          className={`wbw-mobile-wrap ${
            menuOpen ? "wbw-mobile-open" : ""
          }`}
          aria-hidden={!menuOpen}
          inert={!menuOpen}
        >
          <nav
            className="wbw-mobile-nav"
            aria-label="Mobile navigation"
          >
            <div className="wbw-mobile-links">
              {renderLinks(true)}

              <Link
                href="/sell-luxury-watches"
                className="wbw-valuation wbw-mobile-cta"
                onClick={closeMenus}
              >
                <span>Request a Private Valuation</span>
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}