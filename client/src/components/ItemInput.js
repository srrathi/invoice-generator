import React, { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Row,
  Col,
  Button,
  Table,
} from "reactstrap";
import { Toast } from "../utils/Toast";

const ItemInput = ({ items, setItems }) => {
  const [dataObj, setDataObj] = useState({
    name: "",
    hoursOfWork: "",
    rate: "",
    expenses: "",
  });
  var totalExpense = 0;

  const inputHandler = (action, value) => {
    switch (action) {
      case "name":
        setDataObj(() => {
          return { ...dataObj, name: value };
        });
        break;
      case "hour":
        if (value < 0) {
          setDataObj(() => {
            return { ...dataObj, hoursOfWork: "" };
          });
        }
        if (value >= 0 && dataObj.rate >= 0) {
          setDataObj(() => {
            return {
              ...dataObj,
              expenses: value * dataObj.rate,
              hoursOfWork: value,
            };
          });
        }
        break;
      case "rate":
        if (value < 0) {
          setDataObj(() => {
            return { ...dataObj, rate: "" };
          });
        }
        if (value >= 0 && dataObj.hoursOfWork >= 0) {
          setDataObj(() => {
            return {
              ...dataObj,
              expenses: value * dataObj.hoursOfWork,
              rate: value,
            };
          });
        }
        break;

      default:
        break;
    }
  };

  const addItemHandler = () => {
    var checkToAddItem = true;
    Object.keys(dataObj).forEach((key) => {
      if (dataObj[key] === "") {
        checkToAddItem = false;
      }
    });
    if (checkToAddItem) {
      Toast("success", "Item added to list!");
      setItems((prevState) => [
        ...prevState,
        { ...dataObj, key: Math.random() },
      ]);
      setDataObj({
        name: "",
        hoursOfWork: "",
        rate: "",
        expenses: "",
      });
    } else {
      Toast("error", "Please fill all the item Input fields!");
    }
  };

  const deleteItemHandler = (key) => {
    setItems((prevState) => prevState.filter((item) => item.key !== key));
    Toast("success", "Item removed from List sucessfully!");
  };

  return (
    <>
      <Row className="mt-2">
        <Col sm={12} md={6} lg={6}>
          <InputGroup className="my-1">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <span role="img">👉</span>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              onChange={(e) => inputHandler("name", e.target.value)}
              placeholder="Service Name"
              value={dataObj.name}
            />
          </InputGroup>
        </Col>
        <Col sm={12} md={6} lg={6}>
          <InputGroup className="my-1">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <span role="img">⏱️</span>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              onChange={(e) => inputHandler("hour", e.target.value)}
              type="number"
              value={dataObj.hoursOfWork}
              placeholder="Hours of Work"
            />
          </InputGroup>
        </Col>

        <Col sm={12} md={6} lg={6}>
          <InputGroup className="my-1">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <span role="img">↗️</span>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              onChange={(e) => inputHandler("rate", e.target.value)}
              type="number"
              placeholder="Rate (in $)/hr"
              value={dataObj.rate}
            />
          </InputGroup>
        </Col>
        <Col sm={12} md={6} lg={6}>
          <InputGroup className="my-1">
            <InputGroupAddon addonType="prepend">
              <InputGroupText>
                <span role="img">💲</span>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              value={`Expenses: $${dataObj.expenses}`}
              type="text"
              placeholder="Total Expense"
              disabled={true}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Col sm="12" md="12" lg="12">
          <Button
            color="primary"
            onClick={addItemHandler}
            className=" w-100 my-2"
          >
            <i className="fas fa-plus-circle"></i> Add this Item
          </Button>
        </Col>
      </Row>

      <Table className="my-3" striped hover responsive>
        {items.length !== 0 ? (
          <>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Hours</th>
                <th>Rate</th>
                <th>Expense</th>
                <th>Remove</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => {
                totalExpense += item.expenses;
                return (
                  <tr key={item.key}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.hoursOfWork}</td>
                    <td>{item.rate}</td>
                    <td>${item.expenses}</td>
                    <td>
                      <button
                        onClick={() => deleteItemHandler(item.key)}
                        className="btn btn-danger"
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr>
                <th></th>
                <td></td>
                <td></td>
                <td>Total :</td>
                <td>${totalExpense}/-</td>
                <td></td>
              </tr>
            </tbody>
          </>
        ) : null}
      </Table>
    </>
  );
};

export default ItemInput;
