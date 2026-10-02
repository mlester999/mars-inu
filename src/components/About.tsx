import Image from "next/image";
import { Reveal } from "@/components/Reveal";

const traits = ["MARS BOUND", "COMMUNITY POWERED", "LAUNCHED ON CLANK"];

export function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="page-width about__grid">
        <Reveal className="about__copy">
          <p className="eyebrow"><span className="eyebrow__line" /> THE MARS INU STORY</p>
          <h2 id="about-title" className="section-title">
            ONE SMALL STEP FOR INU.<br />
            <span>ONE GIANT CLANK FOR MEMES.</span>
          </h2>
          <p className="about__description">
            Mars Inu left Earth with one mission: take the meme economy somewhere it has never been before.
          </p>
          <p className="about__description about__description--secondary">
            Launched on Clank Trade and powered by its community.
          </p>
          <ul className="trait-list" aria-label="Mars Inu at a glance">
            {traits.map((trait) => (
              <li key={trait}><span aria-hidden="true">✳</span>{trait}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="about__art" delay={110}>
          <div className="about__orbit about__orbit--outer" aria-hidden="true" />
          <div className="about__orbit about__orbit--inner" aria-hidden="true" />
          <div className="about__sun-glow" aria-hidden="true" />
          <div className="about__art-label"><span>THE CREW</span><span>IS ONE OF A KIND</span></div>
          <div className="about__character">
            <Image
              src="/images/mars-inu.png"
              alt="Mars Inu, ready for the journey"
              fill
              sizes="(max-width: 800px) 85vw, 480px"
            />
          </div>
          <div className="about__planet-tag"><span /> MARS / INU</div>
        </Reveal>
      </div>
    </section>
  );
}
