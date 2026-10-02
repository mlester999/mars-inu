import Image from "next/image";
import { XIcon } from "@/components/Icons";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-width site-footer__main">
        <a className="brand brand--footer" href="#home" aria-label="Mars Inu home">
          <Image
            className="brand__icon"
            src="/images/mars-inu-logo.png"
            alt=""
            width={48}
            height={48}
            sizes="42px"
            aria-hidden="true"
          />
          <span className="brand__wordmark">MARS <b>INU</b></span>
        </a>
        <nav className="site-footer__links" aria-label="Footer navigation">
          <a href="#home">Home</a>
          <a href={siteConfig.clankTradeUrl} target="_blank" rel="noreferrer">Clank Trade</a>
          {siteConfig.xUrl ? (
            <a href={siteConfig.xUrl} target="_blank" rel="noreferrer" aria-label="Mars Inu on X"><XIcon /></a>
          ) : (
            <span className="site-footer__x-soon" aria-label="Mars Inu X account coming soon" title="X account coming soon"><XIcon /></span>
          )}
        </nav>
      </div>
      <div className="page-width site-footer__bottom">
        <p>Mars Inu is a memecoin created for entertainment and community purposes.</p>
        <span>BUILT FOR THE LONG WAY ROUND.</span>
      </div>
    </footer>
  );
}
