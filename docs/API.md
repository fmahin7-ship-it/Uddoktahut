# API Documentation

**📚 Documentation Navigation:**
[🏠 README](../README.md) | [🏗️ Architecture](./ARCHITECTURE.md) | **🔌 API Guide** | [📋 Testing Guide](./TESTING.md)

## 🔌 API Overview

This document describes the frontend API integration layer for UddoktaHut. All API calls are handled through centralized action functions located in `lib/actions/`.

## 📁 API Structure

```
lib/actions/
├── auth.action.js          # Authentication endpoints
├── store.action.js         # Store management endpoints
├── product.action.js       # Product CRUD operations
├── onboarding.action.js    # User onboarding flow
└── otp.action.js          # OTP verification
```

## 🛡️ Authentication

### **Authentication Method**

- **Type**: JWT Bearer Token + HTTP-only Cookies
- **Storage**: Cookies for security (XSS protection)
- **Headers**: `Authorization: Bearer <token>`

### **Auth Flow**

```javascript
// Login → Get Tokens → Store in Cookies → Include in API Calls
fetch('/api/login')
  → { accessToken, refreshToken }
  → document.cookie = 'accessToken=...'
  → fetch('/api/protected', { credentials: 'include' })
```

## 🏪 Store Management API

### **Update Store Template**

**Endpoint**: `PATCH /store/:storeName/template`

**Function**: `updateStoreTemplate({ storeName, templateName })`

**Location**: `lib/actions/store.action.js`

```javascript
/**
 * Updates the template for a specific store
 * @param {Object} params - Update parameters
 * @param {string} params.storeName - Store identifier
 * @param {string} params.templateName - New template ID
 * @returns {Promise<Object>} Updated store data
 * @throws {Error} When update fails or user unauthorized
 */
export const updateStoreTemplate = async ({ storeName, templateName }) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/store/${storeName}/template`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ templateName }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      let errorText = await response.text();
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || "Failed to update template");
      } catch {
        throw new Error(errorText || "Failed to update template");
      }
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating store template:", error);
    throw error;
  }
};
```

**Request Body**:

```json
{
  "templateName": "classic" | "modernDark" | "boutique"
}
```

**Success Response**:

```json
{
  "success": true,
  "data": {
    "id": "store-id",
    "name": "store-name",
    "template_name": "classic"
  }
}
```

**Error Response**:

```json
{
  "success": false,
  "message": "Unauthorized access",
  "code": "AUTH_ERROR"
}
```

**Usage with React Query**:

```javascript
import { useUpdateTemplate } from "@/hooks/use-template";

const updateTemplateMutation = useUpdateTemplate((newTemplate) => {
  // Success callback
  setUser((prev) => ({ ...prev, template_name: newTemplate }));
});

// Trigger update
updateTemplateMutation.mutate({
  storeName: "my-store",
  templateName: "classic",
});
```

### **Fetch Store Products**

**Endpoint**: `GET /store/:storeName/products`

**Function**: `fetchStoreProducts({ storeName, page, pageSize, search, sortBy, sortOrder })`

```javascript
/**
 * Fetches paginated products for a store
 * @param {Object} params - Query parameters
 * @param {string} params.storeName - Store identifier
 * @param {number} [params.page=1] - Page number
 * @param {number} [params.pageSize=10] - Items per page
 * @param {string} [params.search=""] - Search query
 * @param {string} [params.sortBy="id"] - Sort field
 * @param {string} [params.sortOrder="desc"] - Sort direction
 * @returns {Promise<{data: Array, error: null|string}>}
 */
export const fetchStoreProducts = async ({
  storeName,
  page = 1,
  pageSize = 10,
  search = "",
  sortBy = "id",
  sortOrder = "desc",
}) => {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_API
      }/store/${storeName}/products?page=${page}&pageSize=${pageSize}&search=${encodeURIComponent(
        search
      )}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch store products");

    const productRes = await res.json();
    return { data: productRes?.data || [], error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};
```

**Query Parameters**:

- `page`: Page number (1-indexed)
- `pageSize`: Number of items per page
- `search`: Search in product names/descriptions
- `sortBy`: Field to sort by (`id`, `name`, `price`, `createdAt`)
- `sortOrder`: `asc` or `desc`

**Response**:

```json
{
  "data": [
    {
      "id": "product-1",
      "name": "Product Name",
      "price": 29.99,
      "description": "Product description",
      "imageUrl": "https://...",
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## 🔐 Authentication API

### **Get Authenticated User**

**Function**: `getAuthenticUser({ id })`

**Location**: `lib/actions/auth.action.js`

```javascript
/**
 * Fetches authenticated user data
 * @param {Object} params
 * @param {string} params.id - User ID from middleware
 * @returns {Promise<{user: Object|null}>}
 */
export const getAuthenticUser = async ({ id }) => {
  try {
    // Implementation details...
    return { user: userData };
  } catch (error) {
    return { user: null };
  }
};
```

## 🧪 API Testing

### **Mocking API Calls**

```javascript
// In tests, mock the entire module
jest.mock("../../lib/actions/store.action", () => ({
  updateStoreTemplate: jest.fn(),
  fetchStoreProducts: jest.fn(),
}));

// Control the mock behavior
const { updateStoreTemplate } = require("../../lib/actions/store.action");

// Mock success
updateStoreTemplate.mockResolvedValueOnce({ success: true });

// Mock error
updateStoreTemplate.mockRejectedValueOnce(new Error("Network error"));

// Verify calls
expect(updateStoreTemplate).toHaveBeenCalledWith({
  storeName: "test-store",
  templateName: "classic",
});
```

### **Testing with React Query**

```javascript
import { renderWithProviders } from "../utils/test-utils";
import { useUpdateTemplate } from "@/hooks/use-template";

test("should handle API success", async () => {
  updateStoreTemplate.mockResolvedValueOnce({ success: true });

  const TestComponent = () => {
    const mutation = useUpdateTemplate();
    return (
      <button
        onClick={() =>
          mutation.mutate({ storeName: "test", templateName: "classic" })
        }
      >
        Update
      </button>
    );
  };

  const { user } = renderWithProviders(<TestComponent />);

  await user.click(screen.getByRole("button"));

  await waitFor(() => {
    expect(updateStoreTemplate).toHaveBeenCalled();
  });
});
```

## 🔧 Error Handling

### **Standardized Error Format**

All API functions follow this error handling pattern:

```javascript
try {
  const response = await fetch(url, options);

  if (!response.ok) {
    let errorText = await response.text();
    try {
      const errorJson = JSON.parse(errorText);
      throw new Error(errorJson.message || "Operation failed");
    } catch (parseError) {
      throw new Error(errorText || "Operation failed");
    }
  }

  return await response.json();
} catch (error) {
  console.error("API Error:", error);
  throw error; // Re-throw for React Query to handle
}
```

### **Error Types**

1. **Network Errors**: Connection/timeout issues
2. **Authentication Errors**: Invalid/expired tokens
3. **Validation Errors**: Invalid request data
4. **Server Errors**: Backend processing failures

### **Error Handling in Components**

```javascript
const updateTemplateMutation = useUpdateTemplate();

if (updateTemplateMutation.error) {
  // Handle error state
  return <div>Error: {updateTemplateMutation.error.message}</div>;
}

if (updateTemplateMutation.isPending) {
  // Handle loading state
  return <div>Updating template...</div>;
}
```

## 📊 Performance Considerations

### **Request Optimization**

- **Caching**: React Query handles automatic caching
- **Deduplication**: Multiple identical requests are deduplicated
- **Background Updates**: Stale data is updated in background
- **Retry Logic**: Failed requests are automatically retried

### **Bundle Size**

- **Tree Shaking**: Only used functions are included
- **Code Splitting**: API functions can be dynamically imported
- **Minimal Dependencies**: Pure fetch-based implementation

## 🔍 Debugging

### **Development Tools**

- **React Query DevTools**: Inspect queries and mutations
- **Browser Network Tab**: Monitor actual HTTP requests
- **Console Logging**: API errors are logged with context

### **Common Issues**

1. **CORS Errors**: Check backend CORS configuration
2. **Authentication Failures**: Verify token storage and headers
3. **Network Timeouts**: Increase timeout or check connectivity
4. **Response Parsing**: Verify response content-type

## 🚀 Best Practices

### **API Function Design**

- ✅ Always include error handling
- ✅ Use TypeScript-style JSDoc comments
- ✅ Return consistent data structures
- ✅ Include request/response examples
- ✅ Log errors with context

### **React Query Integration**

- ✅ Use custom hooks for API calls
- ✅ Handle loading and error states
- ✅ Implement optimistic updates where appropriate
- ✅ Configure appropriate cache times
- ✅ Use query invalidation for related data

### **Testing**

- ✅ Mock external API calls
- ✅ Test both success and error scenarios
- ✅ Verify correct parameters are passed
- ✅ Test loading and error states
- ✅ Use realistic mock data

This API documentation provides a complete reference for frontend developers working with the UddoktaHut platform APIs.
