"use client";

import { useEffect, useState } from "react";
import { ArrowUpRightIcon } from "@/components/Icons";
import { siteConfig } from "@/config/site";

type MarketSnapshot = {
  symbol: string;
  price: number;
  marketCap: number;
};

type MarketStatus = "loading" | "live" | "unavailable";

const refreshInterval = 60_000;

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumSignificantDigits: 4,
  }).format(value);
}

function formatMarketCap(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

export function MarketOverview() {
  const [snapshot, setSnapshot] = useState<MarketSnapshot | null>(null);
  const [status, setStatus] = useState<MarketStatus>("loading");

  useEffect(() => {
    let active = true;

    const refreshMarketData = async () => {
      try {
        const response = await fetch("/api/market-data", { cache: "no-store" });
        if (!response.ok) throw new Error("Market data request failed");

        const nextSnapshot = (await response.json()) as MarketSnapshot;
        if (
          !Number.isFinite(nextSnapshot.price) ||
          !Number.isFinite(nextSnapshot.marketCap)
        ) {
          throw new Error("Market data response was invalid");
        }

        if (active) {
          setSnapshot(nextSnapshot);
          setStatus("live");
        }
      } catch {
        if (active) setStatus("unavailable");
      }
    };

    void refreshMarketData();
    const intervalId = window.setInterval(refreshMarketData, refreshInterval);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const marketDataUnavailable = status === "unavailable" && !snapshot;
  const statusLabel = status === "live"
    ? "LIVE DATA"
    : status === "unavailable"
      ? "DATA DELAYED"
      : "LOADING DATA";

  return (
    <section
      className="market-section"
      id="market-data"
      aria-labelledby="market-overview-title"
    >
      <div className="market-overview page-width">
        <header className="market-overview__heading">
          <p className="eyebrow"><span className="eyebrow__dot" /> THE MISSION, IN NUMBERS</p>
          <h2 id="market-overview-title">MARS INU <span>MARKET</span></h2>
          <p>Live price and market cap from Clank Trade.</p>
        </header>

        <div className="market-overview__card">
          <div className="market-overview__topline">
            <div className="market-overview__identity">
              <span className="market-overview__token-mark" aria-hidden="true">MI</span>
              <span className="market-overview__token-name">
                <strong>MARS INU</strong>
                <span>{snapshot?.symbol ?? "MI"} <i aria-hidden="true">/</i> ROBINHOOD CHAIN</span>
              </span>
            </div>
            <span className={"market-overview__status market-overview__status--" + status}>
              <span aria-hidden="true" />
              {statusLabel}
            </span>
          </div>

          <dl className="market-overview__metrics">
            <div className="market-overview__metric">
              <dt>PRICE · USD</dt>
              <dd>{snapshot ? formatPrice(snapshot.price) : "—"}</dd>
            </div>
            <div className="market-overview__metric">
              <dt>MARKET CAP · USD</dt>
              <dd>{snapshot ? formatMarketCap(snapshot.marketCap) : "—"}</dd>
            </div>
          </dl>

          <div className="market-overview__footer">
            <p>
              {marketDataUnavailable
                ? "Clank Trade data is unavailable right now. Open the market for the latest quote."
                : status === "unavailable"
                  ? "Showing the last quote. Clank Trade could not be reached for an update."
                  : status === "loading"
                    ? "Connecting to Clank Trade…"
                    : "Market data refreshes every 60 seconds."}
            </p>
            <a
              className="button button--primary market-overview__trade"
              href={siteConfig.clankTradeUrl}
              target="_blank"
              rel="noreferrer"
            >
              Trade on Clank <ArrowUpRightIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
