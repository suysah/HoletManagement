import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const {
    isLoading,
    error,
    data: settings = {},
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  console.log("settoihd data", settings);

  return { isLoading, error, settings };
}
