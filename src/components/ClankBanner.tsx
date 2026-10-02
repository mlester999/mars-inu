import { ArrowUpRightIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/config/site";

export function ClankBanner() {
  return (
    <section className="clank-section" aria-label="Mars Inu launched on Clank Trade">
      <Reveal className="clank-banner page-width">
        <div className="clank-banner__orbit" aria-hidden="true"><span /><span /></div>
        <div className="clank-banner__copy">
          <p className="eyebrow">LAUNCHED ON</p>
          <h2>CLANK <span>TRADE</span></h2>
          <p>Meme coins are better when they clank.</p>
        </div>
        <a className="button button--light" href={siteConfig.clankTradeUrl} target="_blank" rel="noreferrer">
          View on Clank <ArrowUpRightIcon />
        </a>
      </Reveal>
    </section>
  );
}
