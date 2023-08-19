import { useState, useCallback } from "react";
import { TApiResponse } from "types/TApiResponse";

export const useApi = (url: string, method: string): TApiResponse => {
  const [status, setStatus] = useState<Number>(0);
  const [statusText, setStatusText] = useState<String>("");
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const getAPIData = async (body: any) => {
    setLoading(true);
    try {
      let apiResponse;
      if (method === "POST" || method === "PUT" || method === "PATCH") {
        apiResponse = await fetch(url, {
          method,
          body: JSON.stringify(body),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }).then((response) => {
          const json = response.json();
          setStatus(response.status);
          setStatusText(response.statusText);
          setData(json);
        });
      } else {
        apiResponse = await fetch(url).then((response) => {
          const json = response.json();
          setStatus(response.status);
          setStatusText(response.statusText);
          setData(json);
        });
      }
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const load = useCallback(
    (data: any) => {
      getAPIData(data);
    },
    [getAPIData],
  );

  return { load, status, statusText, data, error, loading };
};
