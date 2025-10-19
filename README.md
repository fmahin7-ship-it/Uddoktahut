# UddoktaHut Frontend# UddoktaHut - E-commerce Platform

A modern, responsive e-commerce frontend built with Next.js 15 and React 19. This multi-tenant SaaS platform provides customizable store templates, comprehensive product management, and seamless user experiences.[![Next.js](https://img.shields.io/badge/Next.js-15.3.0-black)](https://nextjs.org/)

[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)

## 🚀 Features[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.90.2-red)](https://tanstack.com/query)

[![Jest](https://img.shields.io/badge/Jest-Testing-green)](https://jestjs.io/)

### Core Features

## � **Documentation**

- **Multi-Template Store System** - Dynamic template switching with real-time preview

- **Responsive Design** - Mobile-first approach with Tailwind CSS| Document | Description |

- **JWT Authentication** - Secure user sessions with HTTP-only cookies| ---------------------------------------------- | ------------------------------------------------------------- |

- **Role-based Access Control** - Protected routes and user role management| [📖 **Architecture Guide**](./ARCHITECTURE.md) | System architecture, design patterns, and technical decisions |

- **Product Management** - Full CRUD operations with search and filtering| [🔌 **API Documentation**](./API.md) | Complete API reference and integration guide |

- **Dashboard Analytics** - Store performance metrics and insights| [🧪 **Testing Guide**](./TESTING.md) | Testing strategies, setup, and best practices |

- **Real-time Updates** - Optimistic UI updates with TanStack Query

## �🚀 Overview

### Technical Features

UddoktaHut is a modern, full-stack e-commerce platform built with Next.js 15, featuring dynamic store templates, comprehensive product management, and a robust authentication system. The platform enables entrepreneurs to create and customize their online stores with multiple professional templates.

- **Server-Side Rendering** - Optimized performance with Next.js App Router

- **Component Lazy Loading** - Dynamic imports for better performance## ✨ Key Features

- **Form Validation** - React Hook Form with Zod schema validation

- **Error Handling** - Centralized error management with toast notifications### 🏪 **Multi-Template Store System**

- **Theme System** - Dark/light theme with next-themes

- **Accessibility** - WCAG compliant with Radix UI components- **Dynamic Template Selection**: Choose from multiple professional store templates

- **Testing Infrastructure** - Comprehensive test coverage with Jest- **Real-time Template Switching**: Change store appearance instantly

- **Template Registry**: Centralized template management system

## 📋 Table of Contents- **Server-Side Rendering**: Optimized performance with SSR

- [Architecture](#architecture)### 🛡️ **Authentication & Authorization**

- [Technology Stack](#technology-stack)

- [Installation](#installation)- **JWT-based Authentication**: Secure user sessions

- [Configuration](#configuration)- **Role-based Access Control**: Different access levels for users

- [Usage](#usage)- **Protected Routes**: Middleware-based route protection

- [Project Structure](#project-structure)- **Subscription Management**: Owner subscription validation

- [Testing](#testing)

- [Deployment](#deployment)### 🎨 **Modern UI/UX**

- [Contributing](#contributing)

- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 🏗️ Architecture- **Dark/Light Theme**: Theme switching with next-themes

- **Component Library**: Radix UI components

This frontend follows a modern React architecture with:- **Toast Notifications**: User feedback with Sonner

- **Loading States**: Skeleton loaders and spinners

- **App Router** - Next.js 15 with server and client components

- **State Management** - React Context + TanStack Query for server state### 📊 **Dashboard Features**

- **Component Library** - Modular UI components with Radix UI

- **Template System** - Dynamic template registry with lazy loading- **Product Management**: CRUD operations for products

- **Store Analytics**: Performance metrics and insights

```- **Template Management**: Visual template selection interface

User → Authentication → Dashboard → Store Management- **User Settings**: Profile and store configuration

  ↓         ↓              ↓           ↓

Theme → Context API → React Query → Template System### 🧪 **Testing Infrastructure**

```

- **Unit Testing**: Jest + React Testing Library

For detailed architecture information, see [ARCHITECTURE.md](./docs/ARCHITECTURE.md)- **Component Testing**: Comprehensive component test coverage

- **API Mocking**: MSW for reliable API testing

## 🛠️ Technology Stack- **Coverage Reports**: Detailed code coverage analysis

### Frontend Framework## 🛠️ Technology Stack

- **Next.js 15** - React framework with App Router

- **React 19** - Latest React with concurrent features### **Frontend**

- **JavaScript (ES6+)** - Modern JavaScript features

- **Framework**: Next.js 15 with App Router

### UI & Styling- **Language**: JavaScript (ES6+)

- **Tailwind CSS** - Utility-first CSS framework- **Styling**: Tailwind CSS + CSS Modules

- **Radix UI** - Accessible component primitives- **UI Components**: Radix UI + Custom Components

- **next-themes** - Theme switching system- **State Management**: React Context + TanStack Query

- **Lucide React** - Beautiful icon library- **Forms**: React Hook Form + Zod Validation

- **Sonner** - Toast notifications- **Icons**: Lucide React

### State Management### **Backend Integration**

- **React Context** - Global state management

- **TanStack Query v5** - Server state management and caching- **API**: RESTful API with fetch

- **React Hook Form** - Form state management- **Authentication**: JWT tokens with HTTP-only cookies

- **Data Fetching**: TanStack Query for caching and synchronization

### Validation & Types- **Error Handling**: Centralized error management

- **Zod** - Runtime type validation

- **JavaScript JSDoc** - Type annotations and documentation### **Testing**

### Testing- **Test Runner**: Jest

- **Jest** - JavaScript testing framework- **Component Testing**: React Testing Library

- **React Testing Library** - Component testing utilities- **User Interaction**: @testing-library/user-event

- **Mock Service Worker (MSW)** - API mocking for tests- **API Mocking**: Mock Service Worker (MSW)

- **@testing-library/user-event** - User interaction testing- **Coverage**: Jest Coverage Reports

For complete technology documentation, see [ARCHITECTURE.md](./docs/ARCHITECTURE.md)### **Development Tools**

## 🔧 Installation- **Linting**: ESLint with Next.js config

- **Package Manager**: npm

### Prerequisites- **Version Control**: Git

- Node.js 18+## 🚀 Getting Started

- npm or yarn

- Git### Prerequisites

### Setup Steps- Node.js 18+

- npm or yarn

1. **Clone the repository**- Git

```bash### Installation

git clone https://github.com/FarhanMasud07/UddoktaHut.git

cd uddoktahut1. **Clone the repository**

```

````bash

2. **Install dependencies**git clone https://github.com/FarhanMasud07/UddoktaHut.git

cd uddoktahut

```bash```

npm install

```2. **Install dependencies**



3. **Environment Configuration**```bash

npm install

```bash```

cp .env.example .env.local

# Edit .env.local with your configuration3. **Set up environment variables**

````

```bash

4. **Start Development Server**cp .env.example .env.local

```

```bash

npm run dev4. **Run the development server**

```

```bash

The application will start on `http://localhost:3000`npm run dev

```

## ⚙️ Configuration

5. **Open your browser**

### Environment Variables Navigate to [http://localhost:3000](http://localhost:3000)

````env## 📁 Project Structure

# API Configuration

NEXT_PUBLIC_API_URL=http://localhost:4000```

NEXT_PUBLIC_APP_URL=http://localhost:3000uddoktahut/

├── app/                          # Next.js App Router

# Authentication│   ├── (auth)/                   # Authentication pages

NEXT_PUBLIC_JWT_SECRET=your-jwt-secret│   ├── dashboard/                # Dashboard pages

│   ├── store/[shopSlug]/        # Dynamic store pages

# App Configuration│   ├── context/                  # React Context providers

NEXT_PUBLIC_APP_NAME=UddoktaHut│   └── globals.css               # Global styles

NEXT_PUBLIC_APP_DESCRIPTION=Modern E-commerce Platform├── components/                   # React components

│   ├── common/                   # Shared components

# Development│   ├── dashboard/                # Dashboard-specific components

NODE_ENV=development│   ├── form/                     # Form components

```│   ├── landing/                  # Landing page components

│   ├── shopui/                   # Store UI components

### Next.js Configuration│   └── ui/                       # Base UI components

├── hooks/                        # Custom React hooks

The application uses Next.js configuration in `next.config.mjs` for:├── lib/                          # Utilities and configurations

- Image optimization│   ├── actions/                  # Server actions and API calls

- API routes configuration│   └── validation/               # Zod schemas

- Build optimization├── constants/                    # Application constants

- Environment variable handling├── __tests__/                    # Test files

│   ├── components/               # Component tests

## 🎯 Usage│   ├── hooks/                    # Hook tests

│   └── utils/                    # Test utilities

### Creating a Store└── public/                       # Static assets

````

1. **Register Account** - Sign up with email and password

2. **Onboarding Process** - Choose store type and complete setup## 🧪 Testing

3. **Template Selection** - Pick from available store templates

4. **Product Management** - Add products and configure store### Running Tests

### Managing Templates```bash

# Run all tests

1. **Template Registry** - Browse available templates in dashboardnpm test

2. **Live Preview** - See template changes in real-time

3. **Customization** - Modify colors, layout, and branding# Run tests in watch mode

4. **Template Switching** - Change templates without losing datanpm run test:watch

### Dashboard Features# Generate coverage report

npm run test:coverage

1. **Product Management** - Add, edit, delete products with bulk operations

2. **Store Analytics** - View sales metrics and performance data# Run tests for CI

3. **Template Management** - Switch and customize store appearancenpm run test:ci

4. **User Settings** - Manage profile and store configuration```

## 📁 Project Structure### Writing Tests

```- Component tests go in `**tests**/components/`

uddoktahut/- Hook tests go in `__tests__/hooks/`

├── app/ # Next.js App Router- Use `renderWithProviders()` for components needing context

│ ├── (auth)/ # Authentication pages- Mock external dependencies with `jest.mock()`

│ │ ├── login/ # Login page

│ │ └── signup/ # Registration page### Test Coverage

│ ├── dashboard/ # Protected dashboard pages

│ │ ├── layout.jsx # Dashboard layout with sidebarCurrent coverage focuses on:

│ │ └── page.jsx # Dashboard overview

│ ├── onboarding/ # User onboarding flow- ✅ Template management system (100% coverage)

│ ├── store/[shopSlug]/ # Dynamic public store pages- ✅ React Query mutations and queries

│ ├── context/ # React Context providers- ✅ User context integration

│ │ ├── UserContext.jsx # User authentication state- ✅ Error handling scenarios

│ │ ├── ShopContext.jsx # Store management state

│ │ └── ThemeProvider.jsx # Theme switching context## 📋 Available Scripts

│ ├── globals.css # Global styles and CSS variables

│ └── layout.jsx # Root layout with providers```bash

├── components/ # React componentsnpm run dev # Start development server

│ ├── common/ # Shared componentsnpm run build # Build for production

│ │ ├── Loader.jsx # Loading indicatorsnpm run start # Start production server

│ │ ├── BackButton.jsx # Navigation componentsnpm run lint # Run ESLint

│ │ └── ModeToggle.jsx # Theme togglenpm test # Run Jest tests

│ ├── dashboard/ # Dashboard-specific componentsnpm run test:watch # Run tests in watch mode

│ │ ├── AppSidebar.jsx # Main dashboard sidebarnpm run test:coverage # Generate coverage reports

│ │ ├── NavMain.jsx # Navigation menu```

│ │ └── ProductList.jsx # Product management

│ ├── form/ # Form componentsThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

│ │ ├── LoginForm.jsx # Authentication forms

│ │ └── RegistrationForm.jsx # User registration## 📖 **Project Documentation**

│ ├── landing/ # Landing page components

│ │ ├── Hero.jsx # Main hero sectionFor comprehensive information about this project, please refer to our detailed documentation:

│ │ ├── Features.jsx # Feature showcase

│ │ └── Navbar.jsx # Landing navigation### **🏗️ [Architecture Documentation](./ARCHITECTURE.md)**

│ ├── shopui/ # Store template components

│ │ ├── Shop.jsx # Store layout- **System Design**: Complete architecture overview and design principles

│ │ ├── ProductItem.jsx # Product display- **Component Structure**: Template system, state management, and API integration patterns

│ │ └── Checkout.jsx # Checkout process- **Performance Strategy**: Lazy loading implementation and bundle optimization

│ └── ui/ # Base UI components (Radix UI)- **Security Architecture**: Authentication, authorization, and route protection

│ ├── button.jsx # Button component- **Best Practices**: Code organization and development guidelines

│ ├── card.jsx # Card component

│ └── form.jsx # Form utilities### **🔌 [API Documentation](./API.md)**

├── hooks/ # Custom React hooks

│ └── use-mobile.js # Mobile detection hook- **Authentication Endpoints**: Login, signup, and user management APIs

├── lib/ # Utilities and configurations- **Product Management**: CRUD operations for products and categories

│ ├── actions/ # Server actions and API calls- **Store Operations**: Template selection and store configuration APIs

│ │ ├── auth.action.js # Authentication actions- **Request/Response Examples**: Complete API usage with examples

│ │ └── product.action.js # Product management actions- **Error Handling**: Status codes and error response formats

│ ├── validation/ # Zod validation schemas

│ │ ├── auth.js # Auth form validation### **🧪 [Testing Documentation](./TESTING.md)**

│ │ └── product.js # Product form validation

│ ├── config.js # App configuration- **Testing Strategy**: Unit, integration, and end-to-end testing approach

│ └── utils.js # Utility functions- **Setup Guide**: Jest, React Testing Library, and Playwright configuration

├── constants/ # Application constants- **Test Patterns**: Common testing patterns and utilities

│ └── rootConstant.js # Global constants- **Coverage Reports**: Code coverage goals and monitoring

├── **tests**/ # Test files- **CI/CD Integration**: Automated testing in development workflow

│ ├── components/ # Component tests

│ ├── hooks/ # Hook tests### **🚀 Quick Links**

│ └── utils/ # Test utilities

├── docs/ # Documentation files- **Live Demo**: [Coming Soon] - View the deployed application

│ ├── ARCHITECTURE.md # Architecture documentation- **API Base URL**: `https://your-domain.com/api` - API endpoint for integration

│ ├── API.md # API documentation- **GitHub Repository**: You're already here! ⭐ Star if you find it useful

│ └── TESTING.md # Testing documentation

└── public/ # Static assets## Learn More

    ├── assets/                   # Images and icons

    └── favicon.ico              # Site faviconTo learn more about Next.js, take a look at the following resources:

````

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

## 🧪 Testing- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.



### Running TestsYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!



```bash## Deploy on Vercel

# Run all tests

npm testThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.



# Run tests in watch modeCheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests for CI/CD
npm run test:ci
````

### Testing Strategy

- **Unit Tests** - Individual component and function testing
- **Integration Tests** - Component interaction and API integration
- **User Flow Tests** - Critical user journey testing
- **Visual Regression** - UI consistency testing

### Test Coverage Goals

- Components: 90%+ coverage
- Hooks: 95%+ coverage
- Utilities: 100% coverage
- Critical paths: 100% coverage

For complete testing documentation, see [TESTING.md](./docs/TESTING.md)

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build optimized production bundle
npm run start        # Start production server
npm run lint         # Run ESLint code analysis

# Testing
npm test             # Run Jest test suite
npm run test:watch   # Run tests in watch mode for development
npm run test:coverage # Generate detailed coverage reports
npm run test:ci      # Run tests optimized for CI/CD

# Utilities
npm run analyze      # Bundle analyzer for optimization
npm run clean        # Clean build artifacts
```

## 🚀 Deployment

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Setup

1. **Production Environment Variables**

   ```env
   NODE_ENV=production
   NEXT_PUBLIC_API_URL=https://your-api-domain.com
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   ```

2. **Build Optimization**
   - Automatic code splitting
   - Image optimization
   - Static site generation for public pages
   - Bundle analysis and optimization

### Deployment Platforms

- **Vercel** (Recommended) - Zero-config deployment
- **Netlify** - Static site deployment
- **Docker** - Containerized deployment
- **Traditional Hosting** - Node.js server deployment

For complete deployment guide, see [DEPLOYMENT.md](./docs/DEPLOYMENT.md)

## 🔄 Performance Optimization

### Bundle Optimization

- **Lazy Loading** - Dynamic imports for non-critical components (30-50% size reduction)
- **Code Splitting** - Automatic route-based splitting
- **Tree Shaking** - Dead code elimination
- **Image Optimization** - Next.js automatic image optimization

### Runtime Performance

- **Server Components** - Reduced client-side JavaScript
- **Caching Strategy** - TanStack Query with optimistic updates
- **Skeleton Loading** - Perceived performance improvements
- **Virtual Scrolling** - Efficient large list rendering

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow existing code patterns and conventions
- Write comprehensive tests for new features
- Use TypeScript-style JSDoc comments
- Follow React and Next.js best practices
- Ensure accessibility compliance

### Code Style

- Use ESLint configuration for consistent code style
- Follow React hooks rules and best practices
- Implement proper error boundaries
- Use semantic HTML and ARIA attributes
- Optimize for performance and SEO

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Documentation

- [Architecture Guide](./docs/ARCHITECTURE.md) - Technical architecture and design patterns
- [API Documentation](./docs/API.md) - Complete API reference and integration guide
- [Testing Guide](./docs/TESTING.md) - Testing strategies and implementation guide

## 📞 Support

For support and questions:

- Create an issue on GitHub
- Contact: f.mahin7@gmail.com
- Documentation: Check our comprehensive docs folder

---

**Built with ❤️ by Farhan Masud**
