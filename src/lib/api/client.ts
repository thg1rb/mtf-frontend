import { API_CONFIG } from './config';
import { getAuthToken } from '@/lib/auth/storage';

type QueryParams = Record<string, string | number | boolean | undefined | null>;

type RequestOptions = RequestInit & {
  params?: QueryParams;
};

class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.timeout = API_CONFIG.timeout;
  }

  // Helper to build URL with query parameters
  private buildURL(endpoint: string, params?: QueryParams): string {
    const url = `${this.baseURL}${endpoint}`;
    
    if (!params) return url;

    // Filter out undefined/null values and build query string
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `${url}?${queryString}` : url;
  }

  // Generic fetch wrapper
  private async request<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    const { params, ...fetchOptions } = options || {};
    const url = this.buildURL(endpoint, params);
    
    // Add default headers
    const headers: Record<string, string> = {
      ...API_CONFIG.headers,
      ...(fetchOptions?.headers as Record<string, string>),
    };

    // Add authorization header if token exists
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        signal: AbortSignal.timeout(this.timeout),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      // Centralized error handling
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Convenience methods
  async get<T>(endpoint: string, params?: QueryParams): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  async post<T>(endpoint: string, data?: unknown, params?: QueryParams): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      params,
    });
  }

  async put<T>(endpoint: string, data?: unknown, params?: QueryParams): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      params,
    });
  }

  async patch<T>(endpoint: string, data?: unknown, params?: QueryParams): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      params,
    });
  }

  async delete<T>(endpoint: string, params?: QueryParams): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', params });
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();
