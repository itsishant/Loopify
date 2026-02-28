# 📋 Loopify - Subscription Management Platform

A modern, full-stack subscription management application built with **Turborepo**, **Node.js/Express**, **Next.js**, **MongoDB**, and **Google Gemini AI**.

## 🏗️ Project Overview

Loopify is a sophisticated monorepo-based application that helps users manage their subscriptions efficiently. It features user authentication, subscription tracking, AI-powered responses, and automated email reminders.

---

## 📦 Tech Stack

### **Monorepo & Build System**
- **Turborepo** ^2.6.1 - Monorepo management and task orchestration
- **PNPM** ^10.19.0 - Fast, disk-space-efficient package manager
- **TypeScript** 5.9+ - Full static type checking across the project

### **Backend (Server)**
- **Node.js** ≥18 - JavaScript runtime
- **Express** ^5.1.0 - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** ^9.0.0 - MongoDB object modeling

### **Frontend (Web)**
- **Next.js** ^16.1.4 - React framework with SSR/SSG
- **React** ^19.2.0 - UI library
- **Next.js Auth** ^4.24.13 - Authentication solutions

### **Integrations**
- **Google Gemini AI** (@google/genai) - AI-powered responses
- **Google Auth Library** ^10.5.0 - OAuth2 authentication
- **Nodemailer** ^7.0.12 - Email sending service

### **Styling & UI**
- **Tailwind CSS** ^4.1.5 - Utility-first CSS framework
- **Tailwind PostCSS** ^4.1.5 - PostCSS plugin for Tailwind
- **Custom Theme** - Blue (#2a8af6), Purple (#a853ba), Red (#e92a67)

### **Security & Validation**
- **Bcrypt** ^6.0.0 - Password hashing
- **JSON Web Tokens (JWT)** ^9.0.2 - Secure token-based authentication
- **Zod** ^4.1.13 - TypeScript-first schema validation

### **Development Tools**
- **Nodemon** ^3.1.11 - Auto-reload during development
- **TSX** ^4.21.0 - TypeScript execution for Node.js
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 📂 Project Structure

```
loopify/
├── apps/
│   ├── server/                 # Express API backend
│   │   ├── src/
│   │   │   ├── index.ts       # Main entry point
│   │   │   ├── database/
│   │   │   │   └── connection.ts      # MongoDB connection
│   │   │   ├── controllers/
│   │   │   │   ├── login.controller.ts
│   │   │   │   ├── signup.controller.ts
│   │   │   │   ├── subscription.controller.ts
│   │   │   │   ├── response.controller.ts (AI)
│   │   │   │   └── mailer/            # Email controllers
│   │   │   ├── routes/
│   │   │   │   ├── login.routes.ts
│   │   │   │   ├── signup.routes.ts
│   │   │   │   ├── subscription.routes.ts
│   │   │   │   ├── response.routes.ts
│   │   │   │   ├── reminderMail.routes.ts
│   │   │   │   └── authentication/
│   │   │   ├── models/
│   │   │   │   ├── signupModel.ts     # User schema
│   │   │   │   └── subscription.model.ts
│   │   │   ├── schema/
│   │   │   │   ├── signup.schema.ts
│   │   │   │   └── subscription.schemas.ts
│   │   │   ├── authentication/
│   │   │   │   ├── middleware.authentication.ts
│   │   │   │   └── verify-otp.authentication.ts
│   │   │   ├── integrations/
│   │   │   │   └── geminiClient.ts    # Google Gemini AI
│   │   │   ├── interface/             # TypeScript interfaces
│   │   │   ├── utils/
│   │   │   │   ├── services/
│   │   │   │   │   ├── mailer.ts
│   │   │   │   │   └── reminderMailer.ts
│   │   │   │   ├── password/          # Bcrypt utilities
│   │   │   │   ├── token/             # JWT utilities
│   │   │   │   ├── signup/            # Signup logic
│   │   │   │   ├── login/             # Login logic
│   │   │   │   ├── otp/               # OTP generation
│   │   │   │   ├── zod/               # Validation schemas
│   │   │   │   ├── google/            # OAuth logic
│   │   │   │   └── subscription/      # Subscription logic
│   │   │   ├── types/                 # TypeScript type definitions
│   │   │   └── middlewares/
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── web/                    # Next.js frontend
│       ├── app/
│       │   ├── layout.tsx      # Root layout (Geist font)
│       │   ├── page.tsx        # Landing page
│       │   ├── [landing]/
│       │   │   └── [...]landingCards/
│       │   │   └── [...]landingPrice/
│       │   │   └── [...]landingSteps/
│       │   │   └── [...]landingSubscription/
│       │   ├── dashboard/      # User dashboard
│       │   ├── login/          # Login page
│       │   ├── signup/         # Signup page
│       │   ├── oauth2callback/ # OAuth callback
│       │   ├── api/            # API routes
│       │   │   ├── get/
│       │   │   ├── post/
│       │   │   ├── put/
│       │   │   └── delete/
│       │   └── globals.css     # Global styles
│       ├── public/
│       ├── utils/
│       ├── package.json
│       ├── next.config.ts
│       ├── tsconfig.json
│       └── tailwind.config.ts
│
├── packages/                   # Shared packages
│   ├── eslint-config/
│   │   ├── base.js            # Base ESLint config
│   │   ├── next.js            # Next.js ESLint rules
│   │   └── react-internal.js  # React rules
│   ├── tailwind-config/
│   │   ├── shared-styles.css  # Custom theme colors
│   │   └── postcss.config.js
│   ├── typescript-config/
│   │   ├── base.json          # Base TypeScript config
│   │   ├── nextjs.json        # Next.js config
│   │   └── react-library.json # React library config
│   └── ui/                     # Shared React components
│       ├── src/
│       │   ├── card.tsx
│       │   ├── gradient.tsx
│       │   ├── styles.css
│       │   └── tailwindcss/
│
├── pnpm-workspace.yaml        # PNPM workspace config
├── turbo.json                 # Turborepo config
├── package.json               # Root package.json
└── README.md
```

---

## 🔑 Key Features

### **Authentication & Security**
✅ **User Registration** - Email-based signup with password hashing (Bcrypt)  
✅ **JWT Authentication** - Secure token-based API access  
✅ **OTP Verification** - Email OTP for account verification  
✅ **Google OAuth** - Social login via Google  
✅ **Middleware Protection** - All protected routes require valid JWT token

### **Subscription Management**
✅ **Create Subscriptions** - Track multiple subscriptions with detailed metadata  
✅ **Categories** - Organize by Productivity, Education, Entertainment, Utility, Other  
✅ **Plan Types** - Monthly, Yearly, Free, Trial options  
✅ **Auto-Renewal** - Track auto-renewal status  
✅ **Payment Methods** - Credit Card, Debit Card, PayPal, UPI support  
✅ **Billing Reminders** - Automatic reminders 1, 3, 7, 14, or 30 days before renewal

### **Email Integration**
✅ **OTP Emails** - Beautiful HTML formatted verification codes  
✅ **Reminder Emails** - Customizable billing reminders  
✅ **Gmail SMTP** - Secure email delivery via Gmail

### **AI Integration**
✅ **Google Gemini 2.5 Flash** - AI-powered prompt responses  
✅ **Real-time Processing** - Low-latency responses

### **Type Safety**
✅ **Full TypeScript** - Every file is type-safe  
✅ **Zod Validation** - Runtime schema validation  
✅ **Interface Definitions** - Comprehensive TypeScript interfaces

---

## 🗄️ Database Schema

### **Users Collection**
```typescript
{
  _id: ObjectId;
  email: string;
  password: string (hashed with Bcrypt);
  otp: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
```

### **Subscriptions Collection**
```typescript
{
  _id: ObjectId;
  userId: ObjectId (ref: Users);
  appName: string;
  category: "Productivity" | "Education" | "Entertainment" | "Utility" | "Other";
  planType: "Monthly" | "Yearly" | "Free" | "Trial";
  amount: number;
  currency: string (e.g., "USD", "INR");
  paymentMethod: "Credit Card" | "Debit Card" | "PayPal" | "Upi" | "Other";
  autoRenew: boolean;
  startDate: Date;
  nextBillingDate: Date;
  reminderDaysBefore: 1 | 3 | 7 | 14 | 30;
  createdAt?: Date;
  updatedAt?: Date;
}
```

---

## 🔌 API Endpoints

### **Authentication Routes** (`/api/v1/auth`)
```
POST   /google                - Google OAuth login
POST   /otp-verification/:id  - Verify OTP
```

### **User Routes** (`/api/v1/signup`)
```
POST   /create-user                    - Create new user
GET    /get-user/:userId               - Get user info (Protected)
DELETE /delete-user/:userId            - Delete user (Protected)
```

### **Login Routes** (`/api/v1/login`)
```
POST   /login-user            - User login with email/password
```

### **Subscription Routes** (`/api/v1/subscription`)
```
POST   /create-subscription   - Create new subscription (Protected)
GET    /get-subscription/:id  - Get subscription details (Protected)
PUT    /update-subscription   - Update subscription (Protected)
DELETE /delete-subscription   - Delete subscription (Protected)
```

### **Mailer Routes** (`/api/v1/mailer`)
```
POST   /one-day-reminder/:id        - Send 1-day reminder (Protected)
POST   /three-day-reminder/:id      - Send 3-day reminder (Protected)
POST   /seven-day-reminder/:id      - Send 7-day reminder (Protected)
POST   /fourteen-day-reminder/:id   - Send 14-day reminder (Protected)
POST   /thirty-day-reminder/:id     - Send 30-day reminder (Protected)
```

### **AI Response Routes** (`/api/v1/response`)
```
POST   /create-prompt-response       - Get AI response via Gemini
```

---

## ⚙️ Environment Configuration

### **Server (.env)**
```bash
# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/database

# Authentication
JWT_SECRET=your-secret-key-here

# Email Service
USER_EMAIL=your-gmail@gmail.com
USER_PASS=your-app-specific-password

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# AI Integration
GEMINI_API_KEY=your-gemini-api-key

# Server Port
PORT=3000
```

### **Web (.env.local)**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js ≥18
- PNPM ≥10.19.0
- MongoDB Atlas account
- Gmail account (for email service)
- Google Cloud project (for OAuth & Gemini API)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/loopify.git
   cd loopify
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy .env template to .env
   cp apps/server/.env.example apps/server/.env
   cp apps/web/.env.example apps/web/.env.local
   
   # Fill in your credentials
   ```

4. **Start development servers**
   ```bash
   # Run all apps in parallel
   pnpm dev
   
   # Server: http://localhost:3000
   # Web: http://localhost:3001
   ```

### **Build for Production**
```bash
# Build all packages and apps
pnpm build

# Start production server
pnpm start
```

---

## 📝 Available Scripts

### **Root Level**
```bash
pnpm dev              # Start all apps in development mode
pnpm build            # Build all packages and apps
pnpm lint             # Run ESLint across all packages
pnpm check-types      # Type check all TypeScript files
pnpm badiya           # Format code with Prettier
```

### **Server Specific**
```bash
pnpm --filter server dev       # Start Express server in dev mode
pnpm --filter server build     # Build TypeScript to dist/
pnpm --filter server start     # Run production build
```

### **Web Specific**
```bash
pnpm --filter web dev          # Start Next.js dev server
pnpm --filter web build        # Build Next.js for production
pnpm --filter web start        # Start production server
```

---

## 🎨 Styling & Theming

### **Tailwind CSS Configuration**
- **Version**: 4.1.5
- **PostCSS**: Enabled with autoprefixer
- **Custom Colors**:
  ```css
  --color-blue-1000: #2a8af6    (Primary)
  --color-purple-1000: #a853ba  (Secondary)
  --color-red-1000: #e92a67     (Accent)
  ```

### **CSS Architecture**
- Global styles in `apps/web/app/globals.css`
- Shared theme in `packages/tailwind-config/shared-styles.css`
- Component styles with Tailwind utilities
- Custom CSS prefixes for UI components (`ui-` prefix)

### **Font**
- **Primary Font**: Geist (Google Font)
- **Fallback**: System fonts (Segoe UI, Tahoma, Geneva, Verdana)

---

## 🔐 Authentication Flow

### **JWT Authentication**
1. User signs up → password hashed with Bcrypt
2. JWT token generated with user ID
3. Token sent to client
4. Client includes token in Authorization header: `Bearer {token}`
5. Middleware verifies token on protected routes

### **OTP Verification**
1. User registration → OTP generated (4 digits)
2. Email sent via Nodemailer → Beautiful HTML template
3. User submits OTP → Server validates
4. Account activated → OTP cleared from DB

### **Google OAuth**
1. User initiates Google login
2. Redirect to Google authentication
3. Google returns authorization code
4. Server exchanges code for tokens
5. User info retrieved and stored/updated

---

## 📧 Email Service

### **Mailer Configuration**
- **Service**: Gmail SMTP
- **Authentication**: App-specific password (recommended)
- **Templates**: HTML + Plain text fallback

### **Email Types**
1. **OTP Verification** - Account setup
2. **Billing Reminders** - 1, 3, 7, 14, 30 days before renewal
3. **Custom Emails** - Extensible design

### **Email Template Features**
- Responsive HTML design
- Gradient headers
- Mobile-friendly
- Brand colors and styling

---

## 🤖 AI Integration

### **Google Gemini API**
- **Model**: Gemini 2.5 Flash
- **Purpose**: Generate AI-powered responses to user prompts
- **Endpoint**: `POST /api/v1/response/create-prompt-response`

### **Request Example**
```bash
POST http://localhost:3000/api/v1/response/create-prompt-response
Content-Type: application/json

{
  "prompt": "How can I manage my subscriptions better?"
}
```

### **Response Example**
```json
{
  "success": true,
  "prompt": "How can I manage my subscriptions better?",
  "aiResponse": "Here are some strategies..."
}
```

---

## 🧪 Testing & Validation

### **Input Validation**
- **Zod Schemas** - Runtime type checking
- **Email Validation** - Format verification
- **Password Requirements** - Strength checking
- **OTP Expiration** - Time-based validation

### **Type Checking**
```bash
pnpm check-types      # Full TypeScript compilation check
```

### **Code Quality**
```bash
pnpm lint             # ESLint with strict rules
pnpm badiya           # Prettier auto-formatting
```

---

## 🔄 Turborepo & Monorepo Benefits

### **Advantages**
✅ **Shared Dependencies** - Single node_modules installation  
✅ **Consistent TypeScript Configuration** - Across all projects  
✅ **Unified Linting & Formatting** - ESLint, Prettier configs  
✅ **Efficient Builds** - Task orchestration & caching  
✅ **Workspace Dependencies** - Easy local package imports  

### **Workspace Packages**
- `@repo/eslint-config` - ESLint configurations
- `@repo/tailwind-config` - Tailwind CSS theme
- `@repo/typescript-config` - TypeScript configurations
- `@repo/ui` - Shared React components

---

## 🐛 Error Handling

### **Server Error Handling**
- Try-catch blocks in all controllers
- Consistent error response format
- Detailed console logging
- HTTP status codes (400, 401, 404, 500)

### **Error Response Format**
```json
{
  "success": false,
  "message": "Descriptive error message",
  "error": "Optional error details"
}
```

---

## 📡 Middleware Stack

1. **CORS** - Cross-origin requests enabled
2. **JSON Parser** - Express built-in (5MB limit)
3. **Dotenv** - Environment variable loading
4. **JWT Authentication** - Token verification for protected routes

---

## 🚀 Deployment

### **Backend Deployment (Server)**
```bash
# Build TypeScript
pnpm --filter server build

# Output: apps/server/dist/
# Start: node ./dist/index.js
```

### **Frontend Deployment (Web)**
```bash
# Build Next.js
pnpm --filter web build

# Output: apps/web/.next/
# Start: next start
```

### **Docker Support**
- TypeScript compilation ready
- Environment variables configurable
- Both apps containerizable

---

## 📚 File Size & Performance

### **Package Sizes**
- **Express**: Lightweight API framework
- **Mongoose**: Minimal DB overhead
- **Zod**: ~15KB validation library
- **Bcrypt**: Native binding for fast hashing
- **JWT**: Stateless authentication

### **Optimization**
- ✅ Tree-shaking with native ES modules
- ✅ TypeScript strict mode for safety
- ✅ Minimal dependencies
- ✅ Tailwind CSS production optimization

---

## 🛠️ Development Workflow

### **Adding New Features**

1. **Create Route**
   ```typescript
   // routes/feature.routes.ts
   router.route('/endpoint').post(controller);
   ```

2. **Create Controller**
   ```typescript
   // controllers/feature.controller.ts
   export const controller = async (req: Request, res: Response) => {
     // Implementation
   };
   ```

3. **Add Validation Schema**
   ```typescript
   // schema/feature.schema.ts
   export const featureSchema = z.object({
     field: z.string()
   });
   ```

4. **Create Model** (if needed)
   ```typescript
   // models/feature.model.ts
   const Feature = mongoose.model('Features', schema);
   ```

---

## 📖 Resources

- **Turborepo**: https://turbo.build/
- **Express**: https://expressjs.com/
- **Next.js**: https://nextjs.org/
- **Mongoose**: https://mongoosejs.com/
- **Tailwind CSS**: https://tailwindcss.com/
- **Zod**: https://zod.dev/
- **Google Gemini**: https://ai.google.dev/
- **Nodemailer**: https://nodemailer.com/

---

## 📄 License

ISC

---

## 👥 Contributing

1. Create a feature branch
2. Make your changes
3. Test with `pnpm check-types` and `pnpm lint`
4. Submit a pull request

---

## 📞 Support

For support, email support@loopify.app or open an issue on GitHub.

---

**Built with ❤️ using Turborepo, TypeScript, and modern web technologies**
