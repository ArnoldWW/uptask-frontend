import { getAuthenticatedUser } from "@/api/AuthAPI";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const token = localStorage.getItem("UPTASK_TOKEN");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getAuthenticatedUser,
    enabled: !!token, // Just run the query if the token exists
    retry: false,
    refetchOnWindowFocus: false
  });

  return { data, isLoading, isError };
};
