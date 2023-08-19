import { useState, useCallback } from "react";

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface FetchOptions {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: BodyInit;
}

export function useCrudApi<T>(baseUrl: string): {
  fetchAll: () => Promise<void>;
  fetchOne: (id: number) => Promise<void>;
  create: (data: any) => Promise<any>;
  update: (id: number, data: any) => Promise<void>;
  remove: (id: number) => Promise<void>;
  response: ApiResponse<T[]>;
} {
  const [response, setResponse] = useState<ApiResponse<T[]>>({
    data: null,
    error: null,
    loading: false,
  });

  const makeRequest = useCallback(
    async (url: string, options: FetchOptions = {}) => {
      setResponse({ ...response, loading: true, error: null });

      try {
        const response = await fetch(url, {
          method: options.method || "GET",
          headers: options.headers || {},
          body: options.body,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const responseData = await response.json();
        const resp = {
          data: responseData,
          error: null,
          loading: false,
        };
        setResponse(resp);
        return responseData;
      } catch (error) {
        const resp = {
          data: null,
          error: error,
          loading: false,
        };
        // @ts-ignore
        setResponse(resp);
        return error;
      }
    },
    [response],
  );

  const fetchAll = useCallback(async () => {
    await makeRequest(baseUrl);
  }, [baseUrl, makeRequest]);

  const fetchOne = useCallback(
    async (id: number) => {
      await makeRequest(`${baseUrl}/${id}`);
    },
    [baseUrl, makeRequest],
  );

  const create = useCallback(
    async (data: any) => {
      return await makeRequest(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    [baseUrl, makeRequest],
  );

  const update = useCallback(
    async (id: number, data: any) => {
      await makeRequest(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
    [baseUrl, makeRequest],
  );

  const remove = useCallback(
    async (id: number) => {
      await makeRequest(`${baseUrl}/${id}`, {
        method: "DELETE",
      });
    },
    [baseUrl, makeRequest],
  );

  return { fetchAll, fetchOne, create, update, remove, response };
}
