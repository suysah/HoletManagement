import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useCheckIn } from "./useCheckIn";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const moveBack = useMoveBack();
  const { checkIn, isCheckingIn } = useCheckIn();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid || false);
  }, [booking?.isPaid]);

  if (isLoading || isCheckingIn || isLoadingSettings || !booking || !settings) {
    return <Spinner />;
  }

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numGuests * numNights;

  const handleCheckin = () => {
    if (!confirmPaid) return;

    const breakfastData = addBreakfast
      ? {
          hasBreakfast: true,
          extraPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        }
      : {};

    checkIn({
      bookingId,
      breakfast: breakfastData,
    });
  };

  const formattedTotalPrice = !addBreakfast
    ? formatCurrency(totalPrice)
    : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(
        totalPrice
      )} + ${formatCurrency(optionalBreakfastPrice)})`;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => setAddBreakfast((prev) => !prev)}
            id="breakFast"
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}.
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((prev) => !prev)}
          id="confirm"
          disabled={isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {formattedTotalPrice}.
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
