import { useNavigate as useRouterNavigate } from "react-router-dom";

export const useNavigate = () => {
  const navigate = useRouterNavigate();

  const customNavigate = (
    routePath: string,
    params: Record<string, string | number> = {}
  ) => {
    let str = routePath;
    for (const key of Object.keys(params))
      str = str.replaceAll(`:${key}`, String(params[key]));
    navigate(str);
  };
  return customNavigate;
};
