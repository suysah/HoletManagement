import { useQuery } from "@tanstack/react-query";
import { getCurrentSession } from "../../services/apiAuth";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryFn: getCurrentSession,
    queryKey: ["user"],
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
