import React, { useState } from "react";
import {
  Card,
  CardTitle,
  Row,
  Col,
  Table,
  InputGroup,
  Input,
  Button,
} from "reactstrap";
import { Toast } from "../utils/Toast";
import UpdateStatusModal from "./UpdateStatusModal";

const InvoiceCard = ({ data }) => {
  const [updatedStatus, setUpdatedStatus] = useState({
    invoiceMongoDbId: data._id,
    currentStatus: data.status,
    status: "",
  });
  const [modal, setModal] = useState(false);
  const [showUpdateButton, setShowUpdateButton] = useState(false);
  var totalExpense = 0;

  const toggle = () => setModal(!modal);
  return (
    <Row>
      <Col lg="12" md="12" sm="12" className="my-3">
        <Card className="shadow-lg" body>
          <div className="d-flex justify-content-between">
            <CardTitle tag="h5">{data.companyName}</CardTitle>
            <p>
              <b>Invoice Id : </b>
              #{data.invoiceId}
            </p>
          </div>
          <Table className="my-3" striped hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Hours</th>
                <th>Rate</th>
                <th>Expense</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, index) => {
                totalExpense += item.expenses;
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.hoursOfWork}</td>
                    <td>{item.rate}</td>
                    <td>${item.expenses}</td>
                  </tr>
                );
              })}
              <tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td>Total:</td>
                <td>${totalExpense}/-</td>
              </tr>
            </tbody>
          </Table>
          <Row className="align-items-center">
            <Col className="my-2 mt-4" lg="4" sm="12">
              <b>Due Date : </b>
              {data.dueDate.split("-").reverse().join("/")}
            </Col>
            <Col className="my-2" lg="4" sm="12">
              <b>Current Status : </b>
              {data.status}
            </Col>
            <Col className="my-2 text-justify" lg="4" sm="12">
              <b>Notes : </b>
              {data.notes}
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col className="my-2 mt-4" lg="4" sm="12">
              <b>Generation Date : </b>
              {new Date(data.date)
                .toISOString()
                .split("T")[0]
                .split("-")
                .reverse()
                .join("/")}
            </Col>
            <Col
              className="d-flex align-items-center my-2 justify-content-between"
              lg="4"
              sm="12"
            >
              <p className="mr-2 mt-1">
                <b>Update&nbsp;Status&nbsp;:&nbsp;</b>
              </p>
              <InputGroup className="w-75 mb-2">
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  className="w-100"
                  onChange={(e) => {
                    setShowUpdateButton(true);
                    return setUpdatedStatus((prevState) => {
                      return { ...prevState, status: e.target.value };
                    });
                  }}
                >
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Late</option>
                  <option>Outstanding</option>
                </Input>
              </InputGroup>
            </Col>
            <Col lg="4" sm="12">
              {showUpdateButton ? (
                <Button
                  onClick={() => {
                    if (data.status === updatedStatus.status) {
                      return Toast(
                        "error",
                        "Both previous and new status are same!"
                      );
                    }
                    return setModal(true);
                  }}
                  className="w-100"
                >
                  Update Status
                </Button>
              ) : null}
            </Col>
          </Row>
          <UpdateStatusModal
            updatedStatus={updatedStatus}
            modal={modal}
            toggle={toggle}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default InvoiceCard;
