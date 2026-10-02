"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { siteConfig } from "@/config/site";
import { ArrowUpRightIcon, CopyIcon } from "@/components/Icons";

const stars = [
  [8, 20, 2], [17, 11, 1], [24, 34, 2], [32, 16, 1], [41, 28, 1],
  [50, 9, 2], [59, 22, 1], [69, 12, 2], [78, 31, 1], [88, 15, 2],
  [94, 28, 1], [13, 43, 1], [37, 42, 2], [74, 46, 1], [54, 39, 1],
].map(([left, top, size]) => ({ left, top, size }));

const rotatingLines = ["wen mars?", "already here.", "earth was getting boring.", "much red. very mars."];
const clickLines = ["stop poking the astronaut", "we’re clanking.", "next stop: Olympus Mons."];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [lineIndex, setLineIndex] = useState(0);
  const [clickIndex, setClickIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const hasContract = Boolean(siteConfig.contractAddress);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches) return;

    const timer = window.setInterval(() => {
      setLineIndex((index) => (index + 1) % rotatingLines.length);
    }, 6200);
    return () => window.clearInterval(timer);
  }, []);

  const moveGlow = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const node = event.currentTarget;
    node.style.setProperty("--pointer-x", `${x}px`);
    node.style.setProperty("--pointer-y", `${y}px`);
    node.style.setProperty("--mascot-x", `${((x / bounds.width) - 0.5) * 8}px`);
    node.style.setProperty("--mascot-y", `${((y / bounds.height) - 0.5) * 6}px`);
  };

  const resetGlow = () => {
    const node = heroRef.current;
    if (!node) return;
    node.style.setProperty("--mascot-x", "0px");
    node.style.setProperty("--mascot-y", "0px");
  };

  const copyAddress = async () => {
    if (!siteConfig.contractAddress) return;
    try {
      await navigator.clipboard.writeText(siteConfig.contractAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const changeLine = () => {
    setLineIndex(rotatingLines.length + clickIndex);
    setClickIndex((index) => (index + 1) % clickLines.length);
  };

  const speech = lineIndex < rotatingLines.length
    ? rotatingLines[lineIndex]
    : clickLines[(lineIndex - rotatingLines.length) % clickLines.length];

  return (
    <section
      ref={heroRef}
      className="hero"
      id="home"
      aria-labelledby="hero-title"
      onPointerMove={moveGlow}
      onPointerLeave={resetGlow}
    >
      <div className="hero__sky" aria-hidden="true">
        <div className="hero__planet" />
        <div className="hero__stars">
          {stars.map((star, index) => (
            <span
              className="hero__star"
              key={index}
              style={{ left: `${star.left}%`, top: `${star.top}%`, width: `${star.size}px`, height: `${star.size}px` }}
            />
          ))}
        </div>
        <div className="hero__shooting-star" />
        <div className="hero__ridge hero__ridge--far" />
        <div className="hero__ridge hero__ridge--near" />
        <div className="hero__ground" />
        <div className="hero__pointer-glow" />
        <div className="hero__dust hero__dust--one" />
        <div className="hero__dust hero__dust--two" />
        <div className="hero__dust hero__dust--three" />
        <div className="hero__dust hero__dust--four" />
      </div>

      <div className="hero__mascot-wrap">
        <div className="hero__mascot-halo" aria-hidden="true" />
        <button
          className="hero__mascot"
          type="button"
          onClick={changeLine}
          aria-label="Mars Inu astronaut. Click for another message."
        >
          <Image
            src="/images/mars-inu-hero.png"
            alt="Mars Inu in an orange astronaut suit"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 700px) 108vw, (max-width: 1200px) 62vw, 760px"
          />
        </button>
        <span className="hero__mascot-caption">CLICK THE ASTRONAUT</span>
      </div>
      <div className="speech-bubble hero__speech" key={speech} aria-label={`Mars Inu says: ${speech}`}>
        <span className="speech-bubble__spark" aria-hidden="true">✦</span>
        {speech}
      </div>

      <div className="hero__content page-width">
        <div className="hero__copy">
          <p className="eyebrow hero__eyebrow"><span className="eyebrow__dot" /> A MEME WITH A MISSION</p>
          <h1 id="hero-title">
            <span>THE FIRST DOG</span>
            <em>WITH MARS ON</em>
            <em>HIS MIND.</em>
          </h1>
          <p className="hero__tagline">Born on Earth. <span>Clanking on Mars.</span></p>
          <p className="hero__description">A community-powered memecoin launched on Clank Trade.</p>

          <div className="launch-pill" aria-label="Launched on Clank Trade, Robinhood Chain">
            <span className="launch-pill__status" />
            <span>LAUNCHED ON CLANK TRADE</span>
            <span className="launch-pill__separator">/</span>
            <span>ROBINHOOD CHAIN</span>
          </div>

          <div className="hero__actions">
            <a
              className="button button--primary"
              href={siteConfig.clankTradeUrl}
              target="_blank"
              rel="noreferrer"
            >
              Trade on Clank <ArrowUpRightIcon />
            </a>
            <button
              className="button button--secondary"
              type="button"
              onClick={copyAddress}
              disabled={!hasContract}
              title={hasContract ? "Copy contract address" : "Contract address coming soon"}
            >
              <CopyIcon /> {hasContract ? (copied ? "Copied" : "Copy CA") : "CA: Coming soon"}
            </button>
          </div>
        </div>
      </div>

      <a className="hero__scroll" href="#about" aria-label="Scroll to explore Mars Inu">
        <span>EXPLORE MARS</span><span className="hero__scroll-arrow" aria-hidden="true">↓</span>
      </a>
      <div className="hero__serial" aria-hidden="true">FIELD NOTES &nbsp; / &nbsp; 01</div>
    </section>
  );
}
