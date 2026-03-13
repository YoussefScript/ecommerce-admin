# FakeStoreName Admin Dashboard 💎

### Developed by **Youssef Emad Kamel**

A professional, high-performance E-commerce Admin Dashboard designed to manage multiple stores, products, and analytics with ease. This project serves as the backbone for the "FakeStoreName" storefront experience.

---

## 🚀 Features

- **Multi-Store Management**: Create and manage multiple stores from a single dashboard.
- **Robust CRUD Operations**:
  - **Billboards**: Manage high-resolution hero banners.
  - **Categories**: Organize products with a nested structure.
  - **Products**: Manage stock, pricing, images, and archiving.
  - **Variants**: Full control over Colors and Sizes.
- **Analytics Dashboard**: Real-time visualization of Total Revenue, Sales counts, and Inventory status using **Recharts**.
- **Secure Authentication**: Protected by **Clerk** with multi-factor authentication support.
- **Stripe Integration**: Complete payment tracking and order management.
- **Webhook System**: Automated order status updates and inventory synchronization via Stripe Webhooks.
- **Image Hosting**: Integrated with **Cloudinary** for lightning-fast image delivery.
- **Modern Tech Stack**: Built with Next.js 16 (App Router), Prisma ORM, and Tailwind CSS.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Database**: [Prisma](https://www.prisma.io/) (PostgreSQL/MySQL)
- **Auth**: [Clerk](https://clerk.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **API**: Next.js Route Handlers (REST)

---

## ⚡ Quick Start

### 1. Environment Setup
Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

DATABASE_URL=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

STRIPE_API_KEY=
FRONT_END_STORE_URL=http://localhost:3001
STRIPE_WEBHOOK_SECRET=
```

### 2. Install & Run
```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

---

## 📜 License

Copyright (c) 2026 **Youssef Emad Kamel**. 
All rights reserved. See the [LICENSE](./LICENSE) file for more details.

---

*“Crafting premium digital experiences, one store at a time.”* — **Youssef Emad Kamel**

