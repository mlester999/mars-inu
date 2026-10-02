"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/Reveal";

const steps = [
  { title: "LAUNCH", copy: "Mars Inu leaves Earth." },
  { title: "LAND", copy: "Touchdown." },
  { title: "CLANK", copy: "The community takes over." },
  { title: "MARS", copy: "We keep exploring." },
];

const xPositions = [6, 34, 64, 97];
const yPositions = [73, 48, 54, 69];

export function MarsMission() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const traveled = window.innerHeight - rect.top;
        const total = rect.height + window.innerHeight;
        const progress = Math.max(0, Math.min(0.999, traveled / total));
        setActiveStep(Math.floor(progress * steps.length));
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="section mission" id="mission" ref={sectionRef} aria-labelledby="mission-title">
      <div className="page-width">
        <Reveal className="mission__heading">
          <p className="eyebrow"><span className="eyebrow__line" /> NO ROADMAP. JUST A JOURNEY.</p>
          <h2 id="mission-title" className="section-title">MISSION: <span>MARS</span></h2>
        </Reveal>

        <div className="mission__timeline" aria-label="The Mars Inu journey">
          <svg className="mission__route" viewBox="0 0 1000 340" preserveAspectRatio="none" aria-hidden="true">
            <path className="mission__route-base" d="M60 248 C150 98 238 105 340 163 S510 276 640 183 S834 91 970 235" />
            <path className="mission__route-active" d="M60 248 C150 98 238 105 340 163 S510 276 640 183 S834 91 970 235" />
          </svg>
          <div className="mission__mobile-route" aria-hidden="true" />
          <div
            className="mission__marker"
            style={{
              left: `${xPositions[activeStep]}%`,
              top: `${yPositions[activeStep]}%`,
              "--active-index": activeStep,
            } as CSSProperties}
            aria-hidden="true"
          >
            <span className="mission__marker-glow" />
            <Image src="/images/mars-inu.png" alt="" width={72} height={84} sizes="48px" />
          </div>

          <ol className="mission__steps">
            {steps.map((step, index) => (
              <li
                className={`mission__step ${activeStep === index ? "mission__step--active" : ""}`}
                key={step.title}
                style={{
                  left: `${xPositions[index]}%`,
                  top: `${yPositions[index]}%`,
                  "--step-index": index,
                } as CSSProperties}
              >
                <button
                  className="mission__step-button"
                  type="button"
                  onClick={() => setActiveStep(index)}
                  aria-current={activeStep === index ? "step" : undefined}
                >
                  <span className="mission__node"><span /></span>
                  <span className="mission__number">0{index + 1}</span>
                  <span className="mission__step-title">{step.title}</span>
                  <span className="mission__step-copy">{step.copy}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <p className="mission__footnote">ONE PAW FORWARD. ONE ORBIT AT A TIME.</p>
      </div>
    </section>
  );
}
