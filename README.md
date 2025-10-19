# UddoktaHut Frontend

A modern, responsive e-commerce frontend built with Next.js 15 and React 19. This **multi-tenant SaaS platform** allows multiple entrepreneurs to run their own isolated online stores on a shared infrastructure, each with customizable templates, independent product catalogs, and tenant-specific user management.

> **🔗 Full-Stack Project**: This frontend integrates with [UddoktaHut Backend](https://github.com/FarhanMasud07/UddoktaHut-Backend) - a robust Node.js/Express API with PostgreSQL database, JWT authentication, and multi-tenant architecture.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.90.2-red)](https://tanstack.com/query)
[![Jest](https://img.shields.io/badge/Jest-Testing-green)](https://jestjs.io/)

## 🚀 Key Features

### Multi-Tenant SaaS Architecture

- **Multi-Tenant Platform** - Each user gets their own isolated store with custom subdomain/slug
- **Data Isolation** - Complete separation of store data, products, and customers per tenant
- **Tenant Management** - Dynamic store creation and configuration per user
- **Scalable Infrastructure** - Supports unlimited stores on shared infrastructure

### Core Features

- **Multi-Template Store System** - Dynamic template switching with live preview per store
- **Responsive Design** - Mobile-first approach using Tailwind CSS
- **JWT Authentication** - Secure user sessions with HTTP-only cookies
- **Role-based Access Control** - Protected routes and user permissions (admin, store owner, customer)
- **Product Management** - Complete CRUD operations with search and filtering per store
- **Dashboard Analytics** - Store-specific performance metrics and insights
- **Real-time Updates** - Optimistic UI with TanStack Query

### Performance Optimizations

- **Component Lazy Loading** - 30-50% bundle size reduction with dynamic imports
- **Server-Side Rendering** - Optimized SEO and initial load performance
- **Code Splitting** - Route-based and component-level splitting
- **Caching Strategy** - Intelligent query caching and invalidation

## 🔗 Project Ecosystem

| Repository                                                                    | Technology Stack                  | Description                                       |
| ----------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------- |
| **[UddoktaHut Frontend](https://github.com/FarhanMasud07/UddoktaHut)**        | Next.js 15, React 19, TailwindCSS | Modern responsive frontend with dynamic templates |
| **[UddoktaHut Backend](https://github.com/FarhanMasud07/UddoktaHut-Backend)** | Node.js, Express, PostgreSQL      | Multi-tenant API with subscription management     |

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Frontend**: React 19, JavaScript (ES6+)
- **Styling**: Tailwind CSS, Radix UI components
- **State Management**: React Context + TanStack Query v5
- **Forms**: React Hook Form + Zod validation
- **Testing**: Jest + React Testing Library + MSW
- **Performance**: Dynamic imports, lazy loading, SSR

## 📋 Documentation

- **[Architecture Guide](./docs/ARCHITECTURE.md)** - System design, component architecture, and performance strategies
- **[API Documentation](./docs/API.md)** - Complete API reference and integration guide
- **[Testing Guide](./docs/TESTING.md)** - Testing strategies, utilities, and coverage goals
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Production deployment and hosting options

## 🔧 Installation & Setup

### Prerequisites

- Node.js 18+ and npm/yarn
- [UddoktaHut Backend](https://github.com/FarhanMasud07/UddoktaHut-Backend) running locally or deployed
- Git for version control

### Quick Start

1. **Clone the repository**

```bash
git clone https://github.com/FarhanMasud07/UddoktaHut.git
cd uddoktahut
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment setup**

```bash
cp .env.example .env.local
# Configure your backend API URL
```

4. **Configure environment variables**

```env
NEXT_PUBLIC_API_URL=http://localhost:4000  # Your backend URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

5. **Start development server**

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## 📁 Project Structure

```
uddoktahut/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Protected dashboard
│   ├── onboarding/        # User onboarding flow
│   └── store/[shopSlug]/  # Dynamic store pages
├── components/             # React components
│   ├── common/            # Shared components
│   ├── dashboard/         # Dashboard features
│   ├── form/              # Form components
│   ├── landing/           # Landing page
│   ├── shopui/            # Store templates
│   └── ui/                # Base UI components
├── lib/                    # Utilities and configurations
│   ├── actions/           # API actions
│   └── validation/        # Zod schemas
├── docs/                   # Documentation
└── __tests__/             # Test files
```

## 🧪 Testing & Quality

### Running Tests

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode for development
npm run test:coverage # Generate coverage reports
```

### Test Coverage Goals

- **Components**: 90%+ coverage
- **Hooks**: 95%+ coverage
- **Utilities**: 100% coverage
- **Critical Paths**: 100% coverage

### Code Quality

- ESLint for code standards
- Jest for unit/integration testing
- React Testing Library for component testing
- MSW for API mocking

## 📈 Performance Features

- **Lazy Loading**: Template and component-level lazy loading
- **Bundle Optimization**: Tree shaking and code splitting
- **Caching**: TanStack Query with smart invalidation
- **SEO**: Server-side rendering and meta optimization

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Code linting

# Testing
npm test             # Run tests
npm run test:ci      # CI/CD optimized tests
npm run test:coverage # Coverage reports
```

## 🌐 Deployment

Supports multiple deployment platforms:

- **Vercel** (Recommended for Next.js)
- **Netlify**
- **Docker** containerization
- **Traditional hosting** with PM2

See [Deployment Guide](./docs/DEPLOYMENT.md) for detailed instructions.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

- **Frontend Issues**: [Create an issue](https://github.com/FarhanMasud07/UddoktaHut/issues)
- **Backend Issues**: [Backend Repository](https://github.com/FarhanMasud07/UddoktaHut-Backend/issues)
- **Email**: f.mahin7@gmail.com
- **Documentation**: Comprehensive guides in `./docs/` folder

---

**🚀 Built with ❤️ by [Farhan Masud](https://github.com/FarhanMasud07) - Full-Stack Developer**
