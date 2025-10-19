# Testing Documentation

**📚 Documentation Navigation:**
[🏠 README](../README.md) | [🏗️ Architecture](./ARCHITECTURE.md) | [🔌 API Guide](./API.md) | **📋 Testing Guide**

---

## 🧪 Testing Strategy Overview

UddoktaHut follows a comprehensive testing approach that ensures reliability, maintainability, and confidence in deployments.

## 📊 Testing Pyramid

```
        🔺 E2E Tests (Few, High Value)
       /   \  Critical user journeys
      /     \  Browser automation
     /       \
    📊 Integration Tests (Some)
   /         \ Feature workflows
  /           \ Component interaction
 /             \
📋 Unit Tests (Many, Fast)
Components, Hooks, Utils
```

## 🛠️ Testing Tech Stack

- **Test Runner**: Jest
- **Component Testing**: React Testing Library
- **User Simulation**: @testing-library/user-event
- **API Mocking**: Jest mocks + MSW (planned)
- **Coverage**: Jest built-in coverage
- **Assertions**: Jest matchers + @testing-library/jest-dom

## 📁 Test Organization

```
__tests__/
├── components/           # Component tests
│   ├── TemplateManagement.test.js
│   └── InteractiveTemplateGrid.test.js
├── hooks/               # Custom hook tests
│   ├── useUpdateTemplate.test.js
│   └── useProducts.test.js
├── utils/               # Test utilities
│   ├── test-utils.js    # Custom render functions
│   └── mock-data.js     # Mock data generators
└── integration/         # Integration tests
    └── template-flow.test.js
```

## 🎯 Testing Principles

### **1. Arrange-Act-Assert Pattern**

```javascript
test("should update template successfully", async () => {
  // 🔧 Arrange: Set up test data and mocks
  updateStoreTemplate.mockResolvedValueOnce({ success: true });
  renderWithProviders(<TemplateManagement />);

  // ⚡ Act: Perform user actions
  const button = screen.getByTestId("template-button-classic");
  await user.click(button);

  // ✅ Assert: Verify expected outcomes
  expect(updateStoreTemplate).toHaveBeenCalledWith({
    storeName: "test-store",
    templateName: "classic",
  });
});
```

### **2. Test What Users See and Do**

- ❌ Don't test implementation details
- ✅ Test user interactions and outcomes
- ✅ Test accessibility attributes
- ✅ Test error messages and success states

### **3. Mock External Dependencies**

- ✅ Mock API calls
- ✅ Mock complex child components
- ✅ Mock third-party libraries
- ❌ Don't mock the code you're testing

## 🧩 Component Testing Guide

### **Basic Component Test**

```javascript
import { renderWithProviders } from "../utils/test-utils";
import ComponentName from "../../components/path/ComponentName";

describe("ComponentName", () => {
  test("renders correctly", () => {
    renderWithProviders(<ComponentName />);

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });
});
```

### **Testing User Interactions**

```javascript
import userEvent from "@testing-library/user-event";

test("handles button click", async () => {
  const user = userEvent.setup();
  const mockOnClick = jest.fn();

  renderWithProviders(<Button onClick={mockOnClick} />);

  await user.click(screen.getByRole("button"));

  expect(mockOnClick).toHaveBeenCalledTimes(1);
});
```

### **Testing Async Operations**

```javascript
test("shows loading state during API call", async () => {
  // Mock slow API response
  updateStoreTemplate.mockImplementation(
    () => new Promise((resolve) => setTimeout(resolve, 100))
  );

  renderWithProviders(<TemplateManagement />);

  const button = screen.getByTestId("template-button");
  await user.click(button);

  // Check loading state appears
  expect(screen.getByText("Updating...")).toBeInTheDocument();
  expect(button).toBeDisabled();

  // Wait for completion
  await waitFor(() => {
    expect(button).not.toBeDisabled();
  });
});
```

## 🎣 Hook Testing Guide

### **Testing Custom Hooks**

```javascript
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUpdateTemplate } from "../../hooks/use-template";

// Helper to render hooks with providers
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

test("useUpdateTemplate handles success", async () => {
  updateStoreTemplate.mockResolvedValueOnce({ success: true });

  const { result } = renderHook(() => useUpdateTemplate(), {
    wrapper: createWrapper(),
  });

  // Trigger mutation
  result.current.mutate({
    storeName: "test-store",
    templateName: "classic",
  });

  await waitFor(() => {
    expect(result.current.isSuccess).toBe(true);
  });

  expect(updateStoreTemplate).toHaveBeenCalledWith({
    storeName: "test-store",
    templateName: "classic",
  });
});
```

## 🎭 Mocking Strategies

### **1. Module Mocking**

```javascript
// Mock entire module
jest.mock("../../lib/actions/store.action", () => ({
  updateStoreTemplate: jest.fn(),
  fetchStoreProducts: jest.fn(),
}));

// Import mocked functions
const { updateStoreTemplate } = require("../../lib/actions/store.action");
```

### **2. Component Mocking**

```javascript
// Mock complex child component for focused testing
jest.mock("../../components/ComplexChild", () => {
  return function MockComplexChild({ onAction, disabled }) {
    return (
      <div data-testid="mock-complex-child">
        <button onClick={() => onAction("test-value")} disabled={disabled}>
          Mock Action
        </button>
      </div>
    );
  };
});
```

### **3. Third-Party Library Mocking**

```javascript
// Mock toast notifications
jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  },
}));

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));
```

## 🧰 Test Utilities

### **Custom Render Function**

```javascript
// __tests__/utils/test-utils.js
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "../../app/context/UserContext";

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, cacheTime: 0 },
      mutations: { retry: false },
    },
  });

export const mockUser = {
  id: "test-user-id",
  storeName: "test-store",
  template_name: "modern",
  isActive: true,
};

export const renderWithProviders = (
  ui,
  { queryClient = createTestQueryClient(), user = mockUser, ...options } = {}
) => {
  const Wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      <UserProvider initialData={user}>{children}</UserProvider>
    </QueryClientProvider>
  );

  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
    queryClient,
  };
};
```

### **Mock Data Generators**

```javascript
// __tests__/utils/mock-data.js
export const createMockUser = (overrides = {}) => ({
  id: "test-user-id",
  email: "test@example.com",
  storeName: "test-store",
  template_name: "modern",
  isActive: true,
  ...overrides,
});

export const createMockProduct = (overrides = {}) => ({
  id: "product-1",
  name: "Test Product",
  price: 29.99,
  description: "Test product description",
  ...overrides,
});
```

## 📋 Test Scenarios Coverage

### **Template Management Tests**

**✅ Rendering Tests**

- Renders with default template
- Renders with custom user template
- Handles undefined template gracefully

**✅ User Interaction Tests**

- Template selection triggers API call
- Correct parameters passed to API
- Success toast shown on completion
- Error toast shown on failure

**✅ Loading State Tests**

- Buttons disabled during API call
- Loading indicator appears
- Components re-enable after completion

**✅ Error Handling Tests**

- Network errors handled gracefully
- Invalid responses handled
- User gets appropriate feedback

**✅ Edge Case Tests**

- Missing user data
- Missing store name
- Undefined template values

### **React Query Integration Tests**

```javascript
test("invalidates related queries on success", async () => {
  const { queryClient } = renderWithProviders(<TemplateManagement />);

  // Set up initial cache
  queryClient.setQueryData(["store", "test-store"], { template: "modern" });

  // Mock successful update
  updateStoreTemplate.mockResolvedValueOnce({ success: true });

  // Trigger template change
  const button = screen.getByTestId("template-button-classic");
  await user.click(button);

  // Verify cache invalidation
  await waitFor(() => {
    expect(
      queryClient.getQueryState(["store", "test-store"]).isInvalidated
    ).toBe(true);
  });
});
```

## 🎯 Testing Best Practices

### **✅ Do's**

- **Test user behavior**: What users see and do
- **Use semantic queries**: `getByRole`, `getByLabelText`
- **Test accessibility**: ARIA attributes, keyboard navigation
- **Mock external dependencies**: APIs, complex components
- **Write descriptive test names**: What is being tested
- **Use data-testid sparingly**: Only when semantic queries fail
- **Test error scenarios**: Network failures, validation errors
- **Keep tests isolated**: Each test should be independent

### **❌ Don'ts**

- **Don't test implementation details**: Internal state, private methods
- **Don't test third-party libraries**: Trust they work correctly
- **Don't create overly complex mocks**: Keep mocks simple and focused
- **Don't test styling**: Unless it affects functionality
- **Don't duplicate integration tests**: in unit tests
- **Don't ignore async operations**: Always wait for completion

## 🚀 Running Tests

### **Available Commands**

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage

# CI-friendly test run
npm run test:ci
```

### **Coverage Targets**

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

### **Coverage Reports**

```bash
npm run test:coverage

# Generates coverage report in:
# - Terminal: Summary table
# - coverage/lcov-report/index.html: Detailed HTML report
```

## 🔍 Debugging Tests

### **Common Issues and Solutions**

**1. Tests Timeout**

```javascript
// Increase timeout for slow operations
test("slow operation", async () => {
  // ...test code
}, 10000); // 10 second timeout
```

**2. Async Operations Not Waited**

```javascript
// Always wait for async operations
await waitFor(() => {
  expect(screen.getByText("Success")).toBeInTheDocument();
});
```

**3. Mock Not Working**

```javascript
// Clear mocks between tests
beforeEach(() => {
  jest.clearAllMocks();
});
```

**4. State Not Updating**

```javascript
// Wait for React to update
await waitFor(() => {
  expect(screen.getByText("Updated")).toBeInTheDocument();
});
```

### **Debugging Tools**

- **`screen.debug()`**: Print current DOM
- **`console.log()`**: Debug values and state
- **Jest Verbose**: `npm test -- --verbose`
- **React DevTools**: Inspect component state

## 📈 Test Metrics

### **Current Coverage**

- **TemplateManagement.jsx**: 100% coverage
- **useUpdateTemplate hook**: 100% coverage
- **Test utilities**: Complete setup

### **Testing Goals**

- [ ] All critical components tested
- [ ] All custom hooks tested
- [ ] Error scenarios covered
- [ ] User workflows tested
- [ ] Performance edge cases covered

## 🎓 Learning Resources

### **Testing Philosophy**

- [Testing Trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

### **React Testing Library**

- [Queries Cheat Sheet](https://testing-library.com/docs/queries/about/)
- [User Event API](https://testing-library.com/docs/user-event/intro/)

### **Jest Documentation**

- [Jest Mocking](https://jestjs.io/docs/mock-functions)
- [Async Testing](https://jestjs.io/docs/asynchronous)

This comprehensive testing documentation ensures that all developers can write effective, maintainable tests for the UddoktaHut platform.
