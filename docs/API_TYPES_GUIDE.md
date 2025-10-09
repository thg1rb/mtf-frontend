# API Request Types Best Practices

## 📁 File Structure

```
lib/
  api/
    config.ts          # API configuration
    client.ts          # HTTP client
    endpoints.ts       # Endpoint definitions
    index.ts           # Main exports
    agent/
      agents.ts        # Agent API functions & query options
      types.ts         # Agent request/response types
    employee/
      employees.ts     # Employee API functions & query options
      types.ts         # Employee request/response types
```

## 🎯 Why Separate Request/Response Types?

### ❌ Bad Practice - No Separation
```typescript
// Using domain types directly
const createEmployee = async (data: Employee) => {
  // Problem: Employee has 'id' but API doesn't accept it
  // Problem: Employee might have UI-specific fields
  return apiClient.post('/employees', data);
};
```

### ✅ Good Practice - Separate DTOs
```typescript
// Using specific request types
const createEmployee = async (data: CreateEmployeeRequest) => {
  // Clear: Only fields needed for creation
  // Type-safe: Can't accidentally send 'id'
  return apiClient.post<CreateEmployeeResponse>('/employees', data);
};
```

## 📝 Type Naming Conventions

### Request Types (Data you send TO the API)
- `CreateXRequest` - For POST requests to create
- `UpdateXRequest` - For PUT/PATCH requests to update
- `GetXsRequest` - For GET requests with filters/pagination
- `DeleteXRequest` - For DELETE requests (if needed)

### Response Types (Data you receive FROM the API)
- `CreateXResponse` - Response from POST
- `UpdateXResponse` - Response from PUT/PATCH
- `GetXsResponse` - Response from GET (usually paginated)
- `GetXResponse` - Response for single item
- `DeleteXResponse` - Response from DELETE

## 💡 Pattern Examples

### Pattern 1: Create Request (Required Fields Only)
```typescript
export interface CreateEmployeeRequest {
  // Only fields required for creation
  firstname: string;
  lastname: string;
  employerId: string;
  nationality: "myanmar" | "laos" | "cambodia";
  bloodType: "A" | "B" | "AB" | "O";
  // Note: id, status, createdAt are set by backend
}
```

### Pattern 2: Update Request (All Optional)
```typescript
export interface UpdateEmployeeRequest {
  // All fields optional for partial updates
  firstname?: string;
  lastname?: string;
  status?: "active" | "inactive";
  bloodType?: "A" | "B" | "AB" | "O";
}
```

### Pattern 3: Get Request (Query Parameters)
```typescript
export interface GetEmployeesRequest {
  // Filters
  search?: string;
  status?: "active" | "inactive";
  nationality?: "myanmar" | "laos" | "cambodia";
  
  // Pagination
  page?: number;
  limit?: number;
  
  // Sorting
  sortBy?: "firstname" | "lastname" | "nationality";
  sortOrder?: "asc" | "desc";
  
  // Index signature for type compatibility
  [key: string]: string | number | undefined;
}
```

### Pattern 4: Get Response (Paginated)
```typescript
export interface GetEmployeesResponse {
  data: Employee[];    // Array of items
  total: number;       // Total count
  page: number;        // Current page
  limit: number;       // Items per page
}
```

## 🔨 Usage in API Functions

```typescript
// lib/api/employee/employees.ts
import { apiClient } from "../client";
import { ENDPOINTS } from "../endpoints";
import type {
  CreateEmployeeRequest,
  CreateEmployeeResponse,
  GetEmployeesRequest,
  GetEmployeesResponse,
} from "./types";

// GET with filters
const getEmployees = async (
  params?: GetEmployeesRequest
): Promise<GetEmployeesResponse> => {
  return apiClient.get<GetEmployeesResponse>(
    ENDPOINTS.employees.base,
    params
  );
};

// POST create
export const createEmployee = async (
  data: CreateEmployeeRequest
): Promise<CreateEmployeeResponse> => {
  return apiClient.post<CreateEmployeeResponse>(
    ENDPOINTS.employees.create,
    data
  );
};

// PUT update
export const updateEmployee = async (
  id: string,
  data: UpdateEmployeeRequest
): Promise<UpdateEmployeeResponse> => {
  return apiClient.put<UpdateEmployeeResponse>(
    ENDPOINTS.employees.update(id),
    data
  );
};
```

## 🎨 Usage in Components

```typescript
// app/(agent)/employees/new/page.tsx
import { useMutation } from '@tanstack/react-query';
import { createEmployee } from '@/lib/api/employee/employees';
import type { CreateEmployeeRequest } from '@/lib/api/employee/types';

export default function NewEmployeePage() {
  const mutation = useMutation({
    mutationFn: (data: CreateEmployeeRequest) => createEmployee(data),
    onSuccess: (response) => {
      // response is typed as CreateEmployeeResponse
      console.log('Created employee:', response);
    },
  });

  const handleSubmit = (formData: CreateEmployeeRequest) => {
    mutation.mutate(formData);
  };

  return (
    <EmployeeForm onSubmit={handleSubmit} />
  );
}
```

## ✨ Benefits

| Benefit | Description |
|---------|-------------|
| **Type Safety** | TypeScript catches missing/wrong fields at compile time |
| **Clear Contracts** | Explicitly shows what API expects/returns |
| **Separation of Concerns** | Domain types ≠ API types |
| **Better Autocomplete** | IDE suggests correct fields |
| **Validation** | Easy to add Zod/Yup validation |
| **Documentation** | Self-documenting API contracts |
| **Refactoring** | Change API without breaking domain logic |

## 🚀 Advanced: With Validation

```typescript
// lib/api/employee/validation.ts
import { z } from 'zod';

export const createEmployeeSchema = z.object({
  firstname: z.string().min(1, 'First name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  employerId: z.string().uuid(),
  nationality: z.enum(['myanmar', 'laos', 'cambodia']),
  bloodType: z.enum(['A', 'B', 'AB', 'O']),
  // ... more validation
});

// Type inferred from schema
export type CreateEmployeeRequest = z.infer<typeof createEmployeeSchema>;

// Usage in component
const handleSubmit = (formData: unknown) => {
  const validated = createEmployeeSchema.parse(formData);
  mutation.mutate(validated); // Type-safe!
};
```

## 📊 Summary

```typescript
// ✅ Do This
types.ts:           // API-specific request/response types
  - CreateXRequest
  - UpdateXRequest
  - GetXsRequest
  - XResponse

employees.ts:       // API functions using these types
  - const create = (data: CreateXRequest): Promise<XResponse>

// ❌ Don't Do This
employees.ts:
  - const create = (data: Employee) => // Using domain type
  - const create = (data: any) =>      // No types
  - Inline types everywhere            // Not reusable
```

---

**Remember:** Request/Response types are your API contract. Keep them separate from domain types for maximum flexibility and type safety! 🎯
