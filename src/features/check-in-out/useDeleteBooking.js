import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { mutate: deleteBookingApi, isLoading: isDeletingBooking } =
    useMutation({
      mutationFn: (bookingId) => deleteBooking(bookingId),
      onSuccess: () => {
        toast.success(`booking successfully deleted`);
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
      },

      onError: () => {
        toast.error("There was an error while deleting booking");
      },
    });

  return { deleteBookingApi, isDeletingBooking };
}
