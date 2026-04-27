## Velmora Oils — Website

Premium essential oils storefront built with Vite + React + Tailwind, with **Razorpay checkout** via Netlify Functions.

### Run locally (frontend only)

```bash
npm install
npm run dev
```

### Razorpay setup (secure)
- **Do not hardcode credentials** in code.
- Add env vars in Netlify:
  - `RAZORPAY_KEY_ID`
  - `RAZORPAY_KEY_SECRET`

For local testing with serverless functions, install Netlify CLI and run:

```bash
npm install -g netlify-cli
netlify dev
```

### Files
- **Frontend**: `src/`
- **Product data**: `src/data/products.js`
- **Razorpay functions**: `netlify/functions/create-order.js` and `netlify/functions/verify-payment.js`
