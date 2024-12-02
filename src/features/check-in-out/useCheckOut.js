import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckOut() {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: isLoadingCheckout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`booking #${data.id} sucessfully checked Out`);
      queryClient.invalidateQueries({ active: false });
    },

    onError: () => {
      toast.error("There was an error while checking out");
    },
  });

  return { checkOut, isLoadingCheckout };
}
