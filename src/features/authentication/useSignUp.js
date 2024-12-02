import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signUp as signUpApi } from "../../services/apiAuth";

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,
    mutationKey: ["user"],

    onSuccess: (user) => {
      console.log(user);

      toast.success(
        "Account successfull created please verify the new account from the users email address. "
      );
    },
  });

  return { signUp, isLoading };
}
