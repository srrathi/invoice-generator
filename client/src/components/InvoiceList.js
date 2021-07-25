import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink } from "reactstrap";
import { getAllInvoices } from "../api/getAllInvoices";
import InvoiceCard from "./InvoiceCard";

const InvoiceList = () => {
  const [listItems, setListItems] = useState("ALL");
  const [invoicesList, setInvoicesList] = useState([]);

  const invoiceFetcher = async () => {
    const invoices = await getAllInvoices();
    var filterInvoices = [];
    switch (listItems) {
      case "ALL":
        setInvoicesList(invoices.reverse());
        break;
      case "PENDING":
        filterInvoices = invoices.filter(
          (invoice) => invoice.status === "Pending"
        );
        setInvoicesList(filterInvoices.reverse());
        if (filterInvoices.length === 0) {
          setListItems("");
        }
        break;
      case "PAID":
        filterInvoices = invoices.filter(
          (invoice) => invoice.status === "Paid"
        );
        setInvoicesList(filterInvoices.reverse());
        if (filterInvoices.length === 0) {
          setListItems("");
        }
        break;
      case "OUTSTANDING":
        filterInvoices = invoices.filter(
          (invoice) => invoice.status === "Outstanding"
        );
        setInvoicesList(filterInvoices.reverse());
        if (filterInvoices.length === 0) {
          setListItems("");
        }
        break;
      case "LATE":
        filterInvoices = invoices.filter(
          (invoice) => invoice.status === "Late"
        );
        setInvoicesList(filterInvoices.reverse());
        if (filterInvoices.length === 0) {
          setListItems("");
        }
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    async function fetchData() {
      // You can await here
      await invoiceFetcher();
      // ...
    }
    fetchData();
    // console.log("In use State");
    // eslint-disable-next-line
  }, [listItems]);

  const renderList = (listName) => {
    // console.log(listName);
    return setListItems(listName);
  };

  return (
    <div>
      <Nav className="mt-5" tabs>
        <NavItem onClick={() => renderList("ALL")}>
          <NavLink active={listItems === "ALL" ? true : false} href="#">
            ALL
          </NavLink>
        </NavItem>
        <NavItem onClick={() => renderList("PENDING")}>
          <NavLink active={listItems === "PENDING" ? true : false} href="#">
            PENDING
          </NavLink>
        </NavItem>
        <NavItem onClick={() => renderList("PAID")}>
          <NavLink active={listItems === "PAID" ? true : false} href="#">
            PAID
          </NavLink>
        </NavItem>
        <NavItem onClick={() => renderList("OUTSTANDING")}>
          <NavLink active={listItems === "OUTSTANDING" ? true : false} href="#">
            OUTSTANDING
          </NavLink>
        </NavItem>
        <NavItem onClick={() => renderList("LATE")}>
          <NavLink active={listItems === "LATE" ? true : false} href="#">
            LATE
          </NavLink>
        </NavItem>
      </Nav>
      {invoicesList.map((invoice) => (
        <InvoiceCard data={invoice} key={invoice._id} />
      ))}
      {listItems === "" ? (
        <p className="text-center my-3">There are NO {listItems} Invoices</p>
      ) : null}
    </div>
  );
};

export default InvoiceList;
