import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading: isLoggingIn } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      toast.success("Login was successful");
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard");
    },

    onError: () => {
      toast.error("Provided email or password is incorrect");
    },
  });

  return { login, isLoggingIn };
}
