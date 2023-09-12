import { useLocation } from "react-router-dom";

export const GERMANY = "de-de";
export const GERMANY_COUNTRY = "Germany";
export const AUSTRIAN = "de-at";
export const AUSTRIAN_COUNTRY = "Austria";
export const BRITISH = "en-gb";
export const BRITISH_COUNTRY = "United Kingdom";
export const US = "en-us";
export const US_COUNTRY = "United States";

export const locales = [GERMANY, AUSTRIAN, BRITISH];

export type ValuesOf<T extends string[]> = T[number];

const useActiveLocale = (): ValuesOf<typeof locales> => {
  const location = useLocation();
  let locale = BRITISH;
  locales.forEach((loc) => {
    if (location.pathname.startsWith(`/${loc}`)) {
      locale = loc;
    }
  });
  return locale;
};

export default useActiveLocale;
