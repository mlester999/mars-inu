import { siteConfig } from "@/config/site";

type ClankMarketResponse = {
  coin?: {
    symbol?: unknown;
    price?: unknown;
    marketCap?: unknown;
  };
};

const unavailable = () =>
  Response.json(
    { error: "Market data is temporarily unavailable." },
    { status: 502, headers: { "Cache-Control": "no-store" } },
  );

export async function GET() {
  try {
    const response = await fetch(siteConfig.clankTradeUrl, {
      cache: "no-store",
      headers: { Accept: "text/html" },
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) return unavailable();

    const html = await response.text();
    const initialData = html.match(
      /<script\b[^>]*\bid="initial-data"[^>]*>([\s\S]*?)<\/script>/,
    );
    if (!initialData?.[1]) return unavailable();

    const parsed = JSON.parse(initialData[1]) as ClankMarketResponse;
    const coin = parsed.coin;
    const price = coin?.price;
    const marketCap = coin?.marketCap;

    if (
      !coin ||
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price < 0 ||
      typeof marketCap !== "number" ||
      !Number.isFinite(marketCap) ||
      marketCap < 0
    ) {
      return unavailable();
    }

    return Response.json(
      {
        symbol: typeof coin.symbol === "string" ? coin.symbol : "MI",
        price,
        marketCap,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return unavailable();
  }
}
