import { ArrowUpRightIcon } from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/config/site";

const steps = [
  {
    number: "01",
    title: "GET READY",
    copy: "Use a compatible wallet for the Robinhood Chain ecosystem.",
    symbol: "↗",
  },
  {
    number: "02",
    title: "VISIT CLANK TRADE",
    copy: "Open Clank Trade and find Mars Inu in the market.",
    symbol: "◉",
  },
  {
    number: "03",
    title: "SWAP",
    copy: "Choose an amount and complete the trade yourself.",
    symbol: "⇄",
  },
];

export function HowToBuy() {
  return (
    <section className="section how-to-buy" id="how-to-buy" aria-labelledby="how-to-buy-title">
      <div className="page-width">
        <Reveal className="how-to-buy__heading">
          <p className="eyebrow"><span className="eyebrow__line" /> YOUR FLIGHT PLAN</p>
          <h2 id="how-to-buy-title" className="section-title">HOW TO JOIN <span>MARS INU</span></h2>
          <p className="section-lede">Three small steps. One very big planet.</p>
        </Reveal>

        <div className="buy-steps">
          {steps.map((step, index) => (
            <Reveal className="buy-step" delay={index * 80} key={step.number}>
              <div className="buy-step__top"><span>{step.number}</span><i aria-hidden="true">{step.symbol}</i></div>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="how-to-buy__action" delay={120}>
          <a className="button button--primary" href={siteConfig.clankTradeUrl} target="_blank" rel="noreferrer">
            Trade Mars Inu on Clank <ArrowUpRightIcon />
          </a>
          <span>Always review the details before you swap.</span>
        </Reveal>
      </div>
    </section>
  );
}
