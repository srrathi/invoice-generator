import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { updateInvoiceStatus } from "../api/updateStatus";
import { Toast } from "../utils/Toast";

const UpdateStatusModal = ({ toggle, modal, updatedStatus }) => {
  const confirmHandler = async () => {
    // console.log("Confirm Function");
    const responseData = await updateInvoiceStatus({
      id: updatedStatus.invoiceMongoDbId,
      status: updatedStatus.status,
    });
    if (responseData) {
      // console.log(responseData);
      Toast("success", "Invoice Status updated successfully!!");
      toggle();
    }
  };
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Confirm Status Update</ModalHeader>
        <ModalBody>
          Change Status of this Invoice from {updatedStatus.currentStatus} to{" "}
          {updatedStatus.status}
        </ModalBody>
        <ModalFooter>
          <Button onClick={async () => await confirmHandler()} color="primary">
            Confirm
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UpdateStatusModal;
