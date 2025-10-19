# UddoktaHut - E-commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.3.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue)](https://reactjs.org/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.90.2-red)](https://tanstack.com/query)
[![Jest](https://img.shields.io/badge/Jest-Testing-green)](https://jestjs.io/)

## � **Documentation**

| Document                                       | Description                                                   |
| ---------------------------------------------- | ------------------------------------------------------------- |
| [📖 **Architecture Guide**](./ARCHITECTURE.md) | System architecture, design patterns, and technical decisions |
| [🔌 **API Documentation**](./API.md)           | Complete API reference and integration guide                  |
| [🧪 **Testing Guide**](./TESTING.md)           | Testing strategies, setup, and best practices                 |

## �🚀 Overview

UddoktaHut is a modern, full-stack e-commerce platform built with Next.js 15, featuring dynamic store templates, comprehensive product management, and a robust authentication system. The platform enables entrepreneurs to create and customize their online stores with multiple professional templates.

## ✨ Key Features

### 🏪 **Multi-Template Store System**

- **Dynamic Template Selection**: Choose from multiple professional store templates
- **Real-time Template Switching**: Change store appearance instantly
- **Template Registry**: Centralized template management system
- **Server-Side Rendering**: Optimized performance with SSR

### 🛡️ **Authentication & Authorization**

- **JWT-based Authentication**: Secure user sessions
- **Role-based Access Control**: Different access levels for users
- **Protected Routes**: Middleware-based route protection
- **Subscription Management**: Owner subscription validation

### 🎨 **Modern UI/UX**

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: Theme switching with next-themes
- **Component Library**: Radix UI components
- **Toast Notifications**: User feedback with Sonner
- **Loading States**: Skeleton loaders and spinners

### 📊 **Dashboard Features**

- **Product Management**: CRUD operations for products
- **Store Analytics**: Performance metrics and insights
- **Template Management**: Visual template selection interface
- **User Settings**: Profile and store configuration

### 🧪 **Testing Infrastructure**

- **Unit Testing**: Jest + React Testing Library
- **Component Testing**: Comprehensive component test coverage
- **API Mocking**: MSW for reliable API testing
- **Coverage Reports**: Detailed code coverage analysis

## 🛠️ Technology Stack

### **Frontend**

- **Framework**: Next.js 15 with App Router
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS + CSS Modules
- **UI Components**: Radix UI + Custom Components
- **State Management**: React Context + TanStack Query
- **Forms**: React Hook Form + Zod Validation
- **Icons**: Lucide React

### **Backend Integration**

- **API**: RESTful API with fetch
- **Authentication**: JWT tokens with HTTP-only cookies
- **Data Fetching**: TanStack Query for caching and synchronization
- **Error Handling**: Centralized error management

### **Testing**

- **Test Runner**: Jest
- **Component Testing**: React Testing Library
- **User Interaction**: @testing-library/user-event
- **API Mocking**: Mock Service Worker (MSW)
- **Coverage**: Jest Coverage Reports

### **Development Tools**

- **Linting**: ESLint with Next.js config
- **Package Manager**: npm
- **Version Control**: Git

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/FarhanMasud07/UddoktaHut.git
cd uddoktahut
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
uddoktahut/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   ├── dashboard/                # Dashboard pages
│   ├── store/[shopSlug]/        # Dynamic store pages
│   ├── context/                  # React Context providers
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── common/                   # Shared components
│   ├── dashboard/                # Dashboard-specific components
│   ├── form/                     # Form components
│   ├── landing/                  # Landing page components
│   ├── shopui/                   # Store UI components
│   └── ui/                       # Base UI components
├── hooks/                        # Custom React hooks
├── lib/                          # Utilities and configurations
│   ├── actions/                  # Server actions and API calls
│   └── validation/               # Zod schemas
├── constants/                    # Application constants
├── __tests__/                    # Test files
│   ├── components/               # Component tests
│   ├── hooks/                    # Hook tests
│   └── utils/                    # Test utilities
└── public/                       # Static assets
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run tests for CI
npm run test:ci
```

### Writing Tests

- Component tests go in `__tests__/components/`
- Hook tests go in `__tests__/hooks/`
- Use `renderWithProviders()` for components needing context
- Mock external dependencies with `jest.mock()`

### Test Coverage

Current coverage focuses on:

- ✅ Template management system (100% coverage)
- ✅ React Query mutations and queries
- ✅ User context integration
- ✅ Error handling scenarios

## 📋 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm test             # Run Jest tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage reports
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 📖 **Project Documentation**

For comprehensive information about this project, please refer to our detailed documentation:

### **🏗️ [Architecture Documentation](./ARCHITECTURE.md)**

- **System Design**: Complete architecture overview and design principles
- **Component Structure**: Template system, state management, and API integration patterns
- **Performance Strategy**: Lazy loading implementation and bundle optimization
- **Security Architecture**: Authentication, authorization, and route protection
- **Best Practices**: Code organization and development guidelines

### **🔌 [API Documentation](./API.md)**

- **Authentication Endpoints**: Login, signup, and user management APIs
- **Product Management**: CRUD operations for products and categories
- **Store Operations**: Template selection and store configuration APIs
- **Request/Response Examples**: Complete API usage with examples
- **Error Handling**: Status codes and error response formats

### **🧪 [Testing Documentation](./TESTING.md)**

- **Testing Strategy**: Unit, integration, and end-to-end testing approach
- **Setup Guide**: Jest, React Testing Library, and Playwright configuration
- **Test Patterns**: Common testing patterns and utilities
- **Coverage Reports**: Code coverage goals and monitoring
- **CI/CD Integration**: Automated testing in development workflow

### **🚀 Quick Links**

- **Live Demo**: [Coming Soon] - View the deployed application
- **API Base URL**: `https://your-domain.com/api` - API endpoint for integration
- **GitHub Repository**: You're already here! ⭐ Star if you find it useful

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
