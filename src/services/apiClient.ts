/**
 * API Client
 *
 * This file provides a unified way to make API requests using the endpoints defined in endpoints.ts.
 * It handles common API request needs like authentication, error handling, and response parsing.
 */

import { EndpointConfig } from "./endpoints";

// Type for API request options
export interface ApiRequestOptions {
  body?: any;
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  withAuth?: boolean;
}

// Type for API response with generics for type safety
export interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  status: number;
}

/**
 * Makes an API request using the endpoint configuration
 *
 * @param endpoint The endpoint configuration
 * @param options Request options like body, params, headers
 * @returns Promise with typed response
 */
export async function apiRequest<T = any>(
  endpoint: EndpointConfig,
  options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
  try {
    const { body, params, headers = {}, withAuth = true } = options;

    // Construct URL with query parameters if present
    let url = endpoint.url;
    if (params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
      const queryString = queryParams.toString();
      if (queryString) {
        url = `${url}${url.includes("?") ? "&" : "?"}${queryString}`;
      }
    }

    // Setup headers with auth token if required
    const requestHeaders: HeadersInit = {
      "Content-Type": "application/json",
      ...headers,
    };

    if (withAuth) {
      const token = localStorage.getItem("authToken");
      if (token) {
        requestHeaders["Authorization"] = `Bearer ${token}`;
      }
    }

    // Make the request
    const response = await fetch(url, {
      method: endpoint.method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    // Parse the response
    let data = null;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    }

    if (!response.ok) {
      // Handle API error responses
      const error = new Error(
        data?.message || `Request failed with status ${response.status}`
      );
      return {
        data: null,
        error,
        status: response.status,
      };
    }

    return {
      data,
      error: null,
      status: response.status,
    };
  } catch (error) {
    // Handle network or other errors
    return {
      data: null,
      error: error instanceof Error ? error : new Error(String(error)),
      status: 0, // Network error or other client-side error
    };
  }
}
