import { useEffect } from "react";
import { getCabin } from "../../services/apiCabins";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

const AddCabin = () => {
  useEffect(function () {
    getCabin().then((data) => console.log(data));
  });

  return (
    <>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button> Add new form </Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </>
  );
};

export default AddCabin;
