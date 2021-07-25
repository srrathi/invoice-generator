import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
} from "reactstrap";
import { sendInvoiceEmail } from "../api/sendInvoiceEmail";
import { Toast } from "../utils/Toast";

const SendEmailModal = ({ toggle, modal, data, setEmailSent }) => {
  const [emails, setEmails] = useState("");

  const ValidateEmail = async (mails) => {
    var mailsArray = mails.split(",");
    var emailsCorrect = true;
    mailsArray = mailsArray.filter((mail) => mail !== "");
    mailsArray.filter((mail) => {
      if (
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          mail.trim()
        )
      ) {
        return true;
      }
      Toast("error", `The email - ${mail} you entered is invalid`);
      emailsCorrect = false;
      return false;
    });
    if (emailsCorrect) {
      mailsArray = mailsArray.join(",").replace(/\s\s+/g, " ");

      const dataObj = { ...data, emails: mailsArray };
      const response = await sendInvoiceEmail(dataObj);
      if (response.status === 200) {
        setEmailSent(true);
        toggle();
        window.location.reload();
      }
    }
  };
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Invoice Generated Successfully!
        </ModalHeader>
        <ModalBody>
          <p>Send this invoice to paying person via E-mail.</p>
          <Label>Enter valid e-mail addresses seperated by comma :</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter emails seperated by comma..."
            onChange={(e) => setEmails(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={async () => await ValidateEmail(emails)}
          >
            Send Email
          </Button>{" "}
          <Button
            color="secondary"
            onClick={() => {
              window.location.reload();
              toggle();
            }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default SendEmailModal;
