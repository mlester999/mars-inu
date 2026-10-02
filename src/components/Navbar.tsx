"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { ArrowUpRightIcon, MenuIcon, XIcon } from "@/components/Icons";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateNavbar = () => setScrolled(window.scrollY > 24);
    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
    return () => window.removeEventListener("scroll", updateNavbar);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-nav ${scrolled ? "site-nav--scrolled" : ""}`}>
      <div className="site-nav__inner page-width">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Mars Inu home">
          <span className="brand__mark" aria-hidden="true">
            <span />
          </span>
          <span className="brand__wordmark">MARS <b>INU</b></span>
        </a>

        <div className={`site-nav__menu ${menuOpen ? "site-nav__menu--open" : ""}`}>
          <nav className="site-nav__links" id="primary-navigation" aria-label="Main navigation">
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#how-to-buy" onClick={closeMenu}>How to buy</a>
            {siteConfig.xUrl ? (
              <a
                className="site-nav__x"
                href={siteConfig.xUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Mars Inu on X"
                onClick={closeMenu}
              >
                <XIcon />
              </a>
            ) : (
              <button className="site-nav__x site-nav__x--soon" type="button" disabled aria-label="Mars Inu X account coming soon" title="X account coming soon">
                <XIcon />
              </button>
            )}
          </nav>
        </div>

        <div className="site-nav__actions">
          <a
            className="button button--small button--trade"
            href={siteConfig.clankTradeUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Trade Mars Inu on Clank Trade"
          >
            <span className="site-nav__trade-label">Trade on Clank</span> <ArrowUpRightIcon />
          </a>
          <button
            className="site-nav__toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>
    </header>
  );
}
