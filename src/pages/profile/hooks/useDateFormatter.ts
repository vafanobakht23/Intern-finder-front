import { useCallback } from "react";
import useActiveLocale from "./useActiveLocale";

const useDateFormatter = (): {
  formatter: (
    date: string | undefined,
    options?: { format?: "date" | "weekday" }
  ) => string;
} => {
  const locale = useActiveLocale();
  const formatter = useCallback(
    (
      date: string | undefined,
      options?: { format?: "date" | "weekday" }
    ): string => {
      const weekdayIntl = new Intl.DateTimeFormat(locale, {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const dateIntl = new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
      const dateTimeIntl = new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      if (!date) return "";
      if (options?.format === "date") return dateIntl.format(new Date(date));
      if (options?.format === "weekday")
        return weekdayIntl.format(new Date(date));
      return dateTimeIntl.format(new Date(date));
    },
    [locale]
  );
  return {
    formatter,
  };
};

export default useDateFormatter;
