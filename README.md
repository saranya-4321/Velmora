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
- Your live Razorpay key ID goes in `RAZORPAY_KEY_ID` and is returned securely from `netlify/functions/create-order.js`.

### Real email OTP setup (Resend + Netlify)

Add these environment variables in Netlify:

- `RESEND_API_KEY` - your API key from [Resend](https://resend.com/)
- `OTP_FROM_EMAIL` - verified sender email/domain in Resend (example: `Velmora <noreply@yourdomain.com>`)

OTP flow endpoints:

- `/.netlify/functions/send-email-otp`
- `/.netlify/functions/verify-email-otp`

### Admin login setup

Admin dashboard route:

- `/admin`

Add these environment variables in Netlify:

- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_DASHBOARD_TOKEN`

Admin login flow:

- Open `/login?mode=admin` or visit `/admin`
- After successful login, the dashboard loads orders from `/.netlify/functions/orders`

You can copy `.env.example` for local setup and replace the placeholder values with your real credentials.

For local testing with serverless functions, install Netlify CLI and run:

```bash
npm install -g netlify-cli
netlify dev
```

### Files
- **Frontend**: `src/`
- **Product data**: `src/data/products.js`
- **Razorpay functions**: `netlify/functions/create-order.js` and `netlify/functions/verify-payment.js`
