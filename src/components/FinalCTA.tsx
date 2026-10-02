import Image from "next/image";
import { ArrowUpRightIcon, XIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/config/site";

export function FinalCTA() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-title">
      <Image
        className="final-cta__image"
        src="/images/mars-hero-scene.png"
        alt="Mars Inu looking out across a glowing Martian landscape"
        fill
        sizes="100vw"
      />
      <div className="final-cta__shade" aria-hidden="true" />
      <div className="final-cta__stars" aria-hidden="true"><span /><span /><span /><span /><span /></div>
      <Reveal className="final-cta__content page-width">
        <p className="eyebrow"><span className="eyebrow__line" /> THE VIEW FROM HERE</p>
        <h2 id="final-cta-title">EARTH WAS ONLY<br /><span>THE BEGINNING.</span></h2>
        <p>Same little dog. Much bigger sky.</p>
        <div className="final-cta__actions">
          <a className="button button--primary" href={siteConfig.clankTradeUrl} target="_blank" rel="noreferrer">
            Join Mars Inu <ArrowUpRightIcon />
          </a>
          {siteConfig.xUrl ? (
            <a className="button button--secondary" href={siteConfig.xUrl} target="_blank" rel="noreferrer">
              <XIcon /> Follow on X
            </a>
          ) : (
            <span className="button button--secondary button--disabled" aria-disabled="true" title="X account coming soon">
              <XIcon /> Follow on X
            </span>
          )}
        </div>
      </Reveal>
      <span className="final-cta__caption" aria-hidden="true">THE RED PLANET LOOKS GOOD ON HIM.</span>
    </section>
  );
}
