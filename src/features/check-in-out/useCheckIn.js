import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      toast.success(`booking #${data.id} sucessfully checkedIn`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: () => {
      toast.error("There was an error while checking In");
    },
  });

  return { checkIn, isCheckingIn };
}
