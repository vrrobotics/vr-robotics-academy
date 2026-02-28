import type { APIRoute } from 'astro';

interface CreateOrderBody {
  amount: number;
  currency?: string;
  preferredCurrency?: string;
  countryCode?: string;
}

const SUPPORTED_CURRENCIES = new Set(['USD', 'INR', 'EUR', 'GBP', 'AED', 'SGD', 'CAD', 'AUD']);
const ZERO_DECIMAL_CURRENCIES = new Set(['JPY']);

function selectTargetCurrency(preferredCurrency?: string, countryCode?: string): string {
  const preferred = (preferredCurrency || '').toUpperCase();
  const country = (countryCode || '').toUpperCase();

  if (country === 'IN') return 'INR';
  if (SUPPORTED_CURRENCIES.has(preferred)) return preferred;
  return 'USD';
}

function toMinorUnits(amountMajor: number, currency: string): number {
  if (!Number.isFinite(amountMajor) || amountMajor <= 0) return 0;
  const decimals = ZERO_DECIMAL_CURRENCIES.has(currency) ? 0 : 2;
  const factor = Math.pow(10, decimals);
  return Math.max(1, Math.round(amountMajor * factor));
}

async function getUsdToCurrencyRate(targetCurrency: string): Promise<number> {
  if (targetCurrency === 'USD') return 1;
  // Keep INR demo checkout fixed at ₹49.00 for $0.54.
  if (targetCurrency === 'INR') return 90.7407407407;

  try {
    const res = await fetch(`https://api.frankfurter.app/latest?from=USD&to=${targetCurrency}`);
    const data = await res.json().catch(() => ({}));
    const rate = Number(data?.rates?.[targetCurrency]);
    if (res.ok && Number.isFinite(rate) && rate > 0) return rate;
  } catch {
    // Ignore FX lookup failures and fallback below
  }

  // Fallback rates for resiliency
  const fallbackRates: Record<string, number> = {
    INR: 90.7407407407,
    EUR: 0.93,
    GBP: 0.79,
    AED: 3.67,
    SGD: 1.35,
    CAD: 1.36,
    AUD: 1.53,
    USD: 1,
  };
  return fallbackRates[targetCurrency] || 1;
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const body = (await request.json()) as CreateOrderBody;
    const amount = Number(body?.amount);
    const currency = (body?.currency || 'USD').toUpperCase();

    if (!Number.isFinite(amount) || amount <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid amount' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const runtimeEnv = (locals as any)?.runtime?.env || {};
    const keyId = runtimeEnv.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
    const keySecret = runtimeEnv.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return new Response(JSON.stringify({ error: 'Razorpay server credentials are missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const tokenSource = `${keyId}:${keySecret}`;
    const token =
      typeof Buffer !== 'undefined'
        ? Buffer.from(tokenSource).toString('base64')
        : btoa(tokenSource);

    // Base amount sent by frontend is in USD cents (100 = $1.00)
    const baseUsdAmount = currency === 'USD' ? amount / 100 : 1;
    const targetCurrency = selectTargetCurrency(body?.preferredCurrency, body?.countryCode);
    const usdToTargetRate = await getUsdToCurrencyRate(targetCurrency);
    const targetAmountMajor = baseUsdAmount * usdToTargetRate;
    const targetAmountMinor = toMinorUnits(targetAmountMajor, targetCurrency);

    if (targetAmountMinor <= 0) {
      return new Response(JSON.stringify({ error: 'Failed to compute order amount' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const receipt = `demo_${Date.now()}`;

    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: targetAmountMinor,
        currency: targetCurrency,
        receipt,
        notes: {
          source: 'vr_robotics_homepage',
          base_usd: String(baseUsdAmount)
        }
      })
    });

    const result = await razorpayResponse.json();

    if (!razorpayResponse.ok) {
      const errorMessage =
        result?.error?.description || result?.error?.reason || 'Failed to create Razorpay order';
      return new Response(JSON.stringify({ error: errorMessage, details: result?.error || result }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true, order: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unexpected error while creating order'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
