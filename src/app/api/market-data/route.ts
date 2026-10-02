import { siteConfig } from "@/config/site";

type ClankMarketResponse = {
  coin?: {
    symbol?: unknown;
    price?: unknown;
    marketCap?: unknown;
    quoteCurrency?: unknown;
  };
};

type ClankUsdRateResponse = Array<{
  result?: {
    data?: {
      price?: unknown;
    };
  };
}>;

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
    const quoteCurrency = coin?.quoteCurrency;

    if (
      !coin ||
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price < 0 ||
      typeof marketCap !== "number" ||
      !Number.isFinite(marketCap) ||
      marketCap < 0 ||
      typeof quoteCurrency !== "string" ||
      !/^0x[\da-f]{40}$/i.test(quoteCurrency)
    ) {
      return unavailable();
    }

    // Clank's initial coin payload uses the pool's quote currency. Match its
    // tokenUsdg query to convert that quote currency to USD before displaying.
    const input = encodeURIComponent(
      JSON.stringify({ "0": { token: quoteCurrency } }),
    );
    const rateResponse = await fetch(
      `https://clank.trade/v1/trpc/exchangeRates.tokenUsdg?batch=1&input=${input}`,
      {
        cache: "no-store",
        headers: { Accept: "application/json" },
        signal: AbortSignal.timeout(10_000),
      },
    );

    if (!rateResponse.ok) return unavailable();

    const rateData = (await rateResponse.json()) as ClankUsdRateResponse;
    const quoteCurrencyUsd = rateData[0]?.result?.data?.price;

    if (
      (typeof quoteCurrencyUsd !== "number" &&
        typeof quoteCurrencyUsd !== "string") ||
      !Number.isFinite(Number(quoteCurrencyUsd)) ||
      Number(quoteCurrencyUsd) <= 0
    ) {
      return unavailable();
    }

    const usdRate = Number(quoteCurrencyUsd);

    return Response.json(
      {
        symbol: typeof coin.symbol === "string" ? coin.symbol : "MI",
        price: price * usdRate,
        marketCap: marketCap * usdRate,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return unavailable();
  }
}
