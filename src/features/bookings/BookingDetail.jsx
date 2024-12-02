import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "../check-in-out/useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  // const booking = {};

  const navigate = useNavigate();

  const { booking, isLoading } = useBooking();
  const { checkOut, isLoadingCheckout } = useCheckOut();
  const { deleteBookingApi, isDeletingBooking } = useDeleteBooking();

  const status = booking?.status;
  const id = booking?.id;

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (!booking) return <Empty resourceName="booking" />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkIn/${id} `)}>Check in</Button>
        )}

        {status === "checked-in" && (
          <Button
            onClick={() => {
              checkOut(id);
            }}
            disabled={isLoadingCheckout}
          >
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="deleteBooking">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="deleteBooking">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeletingBooking}
              onConfirm={() =>
                deleteBookingApi(id, { onSettled: () => navigate(-1) })
              }
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
