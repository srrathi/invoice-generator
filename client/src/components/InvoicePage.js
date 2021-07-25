import React, { useEffect, useState } from "react";
import {
  InputGroup,
  Input,
  Button,
  Row,
  Col,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import ItemInput from "./ItemInput";
import { Toast } from "../utils/Toast";
import { generateInvoiceInBackend } from "../api/generateInvoice";
import SendEmailModal from "./SendEmailModal";
import { generateRandomInvoiceId } from "../utils/GenerateRandomId";

const InvoicePage = () => {
  const [items, setItems] = useState([]);
  const [emailSent, setEmailSent] = useState(false);
  const [option, setOptions] = useState({
    companyName: "",
    status: "Pending",
    dueDate: "",
    invoiceId: generateRandomInvoiceId(),
    notes: "",
    date: new Date().toISOString().split("T")[0].split("-").reverse().join("-"),
  });
  const [data, setData] = useState({});
  const [sendDataToBackend, setSendDataToBackend] = useState(false);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const dueDateComparator = () => {
    const dueDate = new Date(option.dueDate.split("/").reverse().join("-"));
    const todayDate = new Date();
    return todayDate.getTime() > dueDate.getTime();
  };

  const generateInvoice = () => {
    if (items.length === 0) {
      return Toast("error", "Please enter atleast 1 item !");
    } else if (
      option.status === "" ||
      option.dueDate === "" ||
      option.companyName === ""
    ) {
      return Toast("error", "Please enter all the details necessary!");
    } else if (dueDateComparator()) {
      return Toast(
        "error",
        "Please enter due date greater than or equal to Today's Date!"
      );
    } else {
      const itemArray = items.map((item) => {
        return {
          name: item.name,
          hoursOfWork: item.hoursOfWork,
          rate: item.rate,
          expenses: item.expenses,
        };
      });
      setData({
        items: itemArray,
        companyName: option.companyName,
        status: option.status,
        invoiceId: option.invoiceId,
        dueDate: option.dueDate,
        notes: option.notes,
      });

      setSendDataToBackend(true);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (sendDataToBackend) {
        const invoiceData = await generateInvoiceInBackend(data);
        if (invoiceData) {
          // console.log(invoiceData);
        }
        toggle();
        setSendDataToBackend(false);
      }
      if (emailSent) {
        setOptions({
          companyName: "",
          status: "Pending",
          dueDate: "",
          invoiceId: generateRandomInvoiceId(),
          notes: "",
          date: new Date()
            .toISOString()
            .split("T")[0]
            .split("-")
            .reverse()
            .join("-"),
        });
        setItems([]);
        setEmailSent(false);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, [sendDataToBackend, setSendDataToBackend, emailSent, setEmailSent]);

  return (
    <div className="my-5">
      <h3 className="text-center mb-4">Enter the details of the Invoice</h3>
      <InputGroup>
        <InputGroupAddon addonType="prepend">
          <InputGroupText className="d-none d-lg-block d-md-block">
            Company Name :
          </InputGroupText>
        </InputGroupAddon>
        <Input
          onChange={(e) =>
            setOptions((prevState) => {
              return { ...prevState, companyName: e.target.value };
            })
          }
          placeholder="Enter name of the company here..."
        />
      </InputGroup>
      <ItemInput items={items} setItems={setItems} />
      <Row className="mt-4">
        <Col sm="12" md="6" lg="6">
          <div className="d-flex align-items-center justify-content-between">
            <Col sm="3" md="3" lg="3">
              <p className="d-inline-block">Invoice Status: </p>
            </Col>
            <Col sm="9" md="9" lg="9">
              <InputGroup className="mb-2">
                <Input
                  onChange={(e) =>
                    setOptions((prevState) => {
                      return { ...prevState, status: e.target.value };
                    })
                  }
                  type="select"
                  name="select"
                  id="exampleSelect"
                  className="w-100"
                  value={option.status}
                >
                  <option>Pending</option>
                  <option>Paid</option>
                  <option>Late</option>
                  <option>Outstanding</option>
                </Input>
              </InputGroup>
            </Col>
          </div>
          <div className="d-flex align-items-center  justify-content-between">
            <Col sm="3" md="3" lg="3">
              <p className="d-inline-block">Due Date: </p>
            </Col>
            <Col sm="9" md="9" lg="9">
              <InputGroup className="my-2">
                <Input
                  type="date"
                  name="date"
                  id="exampleDate"
                  className="w-100"
                  placeholder="date placeholder"
                  onChange={(e) =>
                    setOptions((prevState) => {
                      return { ...prevState, dueDate: e.target.value };
                    })
                  }
                />
              </InputGroup>
            </Col>
          </div>
        </Col>
        <Col sm="12" md="6" lg="6">
          <InputGroup>
            <Input
              rows="3"
              onChange={(e) =>
                setOptions((prevState) => {
                  return { ...prevState, notes: e.target.value };
                })
              }
              type="textarea"
              name="text"
              id="exampleText"
              placeholder="(Optional) Enter your Notes here..."
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="my-2">
        <Col className="my-1" sm="6" md="4" lg="4">
          <p className="font-weight-bold">
            <b>Invoice ID:</b> #{option.invoiceId}
          </p>
        </Col>
        <Col className="my-1" sm="6" md="4" lg="4">
          <p className="font-weight-bold">
            <b>Date:</b> {option.date}
          </p>
        </Col>
        <Col className="my-1" sm="12" md="4" lg="4">
          <Button
            onClick={generateInvoice}
            className="w-100 text-center btn-lg"
            color="primary"
          >
            <i class="far fa-check-square"></i> Generate Invoice
          </Button>
        </Col>
      </Row>
      <SendEmailModal
        setEmailSent={setEmailSent}
        toggle={toggle}
        data={data}
        modal={modal}
      />
    </div>
  );
};

export default InvoicePage;
