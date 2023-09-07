import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Store } from "types/Store";

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

interface FetchOptions {
  method?: HttpMethod;
  headers?: HeadersInit;
  body?: BodyInit;
}

export function useCrudApi<T>(baseUrl: string): {
  fetchAll: () => Promise<void>;
  fetchOne: (id: number) => Promise<any>;
  create: (data: any, hasToken: boolean) => Promise<any>;
  update: (id: number, data: any) => Promise<any>;
  remove: (id: number) => Promise<void>;
  response: ApiResponse<T[]>;
} {
  const token = useSelector((state: Store) => state.token);
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
    [response]
  );

  const fetchAll = useCallback(async () => {
    await makeRequest(baseUrl);
  }, [baseUrl, makeRequest]);

  const fetchOne = useCallback(
    async (id: number) => {
      return await makeRequest(`${baseUrl}/${id}`);
    },
    [baseUrl, makeRequest]
  );

  const create = useCallback(
    async (data: any, hasToken: boolean) => {
      return await makeRequest(baseUrl, {
        method: "POST",
        headers: hasToken
          ? {
              ...(data instanceof FormData
                ? {}
                : { "Content-Type": "application/json" }),
              Authorization: `Token ${token}`,
            }
          : {
              ...(data instanceof FormData
                ? {}
                : { "Content-Type": "application/json" }),
            },
        body: data,
      });
    },
    [baseUrl, makeRequest]
  );

  const update = useCallback(
    async (id: number, data: any) => {
      return await makeRequest(`${baseUrl}/${id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(data),
      });
    },
    [baseUrl, makeRequest]
  );

  const remove = useCallback(
    async (id: number) => {
      await makeRequest(`${baseUrl}/${id}`, {
        method: "DELETE",
      });
    },
    [baseUrl, makeRequest]
  );

  return { fetchAll, fetchOne, create, update, remove, response };
}
