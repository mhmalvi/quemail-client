# QueMail Client

The frontend application for the QueMail email marketing platform. Built with Next.js 14 and TypeScript, it provides a modern dashboard for managing email campaigns, contacts, templates, and analytics.

## Features

- **Campaign Management** — Create, schedule, and monitor email campaigns with a step-by-step wizard
- **Template Builder** — Visual email template editor with drag-and-drop support via `react-email-editor`
- **Contact Management** — Import contacts via CSV, organize into groups, and manage subscriptions
- **Performance Analytics** — Campaign comparison charts and delivery rate tracking with ApexCharts
- **Billing & Subscriptions** — Stripe-integrated billing with plan management and payment history
- **User Management** — Multi-user support with role-based access and company-level accounts
- **Landing Pages** — Public-facing pages including pricing, about, privacy policy, and contact
- **Real-Time Updates** — Socket.IO integration for live campaign status updates
- **Guided Tours** — Interactive onboarding tours for new users via Reactour
- **Dark Theme** — Full dark mode UI built with Tailwind CSS and Flowbite components

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 14.1 |
| Language | TypeScript |
| Styling | Tailwind CSS, Flowbite React |
| State Management | Zustand |
| Payments | Stripe (React Stripe.js) |
| Charts | ApexCharts |
| Email Editor | react-email-editor (Unlayer) |
| Animations | Framer Motion |
| Real-Time | Socket.IO Client |

## Prerequisites

- Node.js 18+
- npm or yarn
- QueMail Server backend running

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mhmalvi/quemail-client.git
cd quemail-client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### 5. Build for Production

```bash
npm run build
npm start
```

## Key Modules

| Module | Path | Description |
|--------|------|-------------|
| Dashboard | `/home` | Overview with quick actions and summary cards |
| Campaigns | `/home/campaigns` | Campaign creation, listing, and performance |
| Templates | `/home/campaigns/all-templates` | Email template management |
| Contacts | `/home/all-contacts` | Contact list and CSV import |
| Groups | `/home/all-groups` | Contact group organization |
| Billing | `/home/billing` | Plans, payments, and invoices |
| Analytics | `/home/campaigns/compare-email-performance` | Campaign comparison and metrics |
| Settings | `/home/settings` | Account and application settings |
| Admin | `/home/super-admin` | Super admin user management |

## Related Projects

- [quemail-server](https://github.com/mhmalvi/quemail-server) — Backend API (Laravel)
- [quemail-templates](https://github.com/mhmalvi/quemail-templates) — HTML email template collection

## License

This project is open source and available under the [MIT License](LICENSE).
