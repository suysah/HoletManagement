/* eslint-disable react/prop-types */
import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingId }) {
  const { isLoadingCheckout, checkOut } = useCheckOut();

  return (
    <Button
      onClick={() => checkOut(bookingId)}
      variation="primary"
      size="small"
      disabled={isLoadingCheckout}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
