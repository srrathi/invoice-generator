const express = require("express");
const InvoiceSchema = require("../models/InvoiceSchema");
const router = express.Router();
const emailUtils = require("../utils/emailUtils");

// To get all the Invoices
router.get("/list", async (req, res) => {
  const invoices = await InvoiceSchema.find({});
  // console.log(invoices);
  res.json(invoices);
});

// To send Invoice via Email
router.post("/email", async (req, res) => {
  const { status, dueDate, items, invoiceId, notes, emails, companyName } =
    req.body;
  const invoice = {
    items: items,
    status: status,
    dueDate: dueDate,
    invoiceId: invoiceId,
    notes: notes,
    emails: emails,
    companyName: companyName,
    date: new Date(),
  };
  try {
    emailUtils.sendInvoiceEmail(invoice);
    res.status(200).json("Invoice sent via Email successfully!");
  } catch (error) {
    console.log(error);
    console.log("Email not sent");
    res.status(500).json("Server Error");
  }
});

// To Generate a new Invoice
router.post("/generate", async (req, res) => {
  const { status, dueDate, items, invoiceId, notes, companyName } = req.body;
  const invoice = {
    items: items,
    status: status,
    dueDate: dueDate,
    invoiceId: invoiceId,
    notes: notes,
    companyName: companyName,
    date: new Date(),
  };
  try {
    let userInvoice = await InvoiceSchema.findOne({
      invoiceId,
    });
    if (userInvoice) {
      res.status(500).json("Invoice with same Invoice ID already exists");
    } else {
      userInvoice = new InvoiceSchema(invoice);
      await userInvoice.save();
      // console.log(userInvoice);
      res.json(userInvoice);
    }
  } catch (error) {
    console.log(error);
    console.log("Mongodb error");
    res.status(500).json("Server Error");
  }
});

// To update the status of a Invoice
router.patch("/status/:id", async (req, res) => {
  const { status } = req.body;
  const invoiceObjectId = req.params.id;
  try {
    const updatedInvoice = await InvoiceSchema.findByIdAndUpdate(
      invoiceObjectId,
      {
        $set: {
          status: status,
        },
      }
    );
    // console.log(updatedInvoice);
    res.status(200).json(updatedInvoice);
  } catch (error) {
    console.log(error);
    console.log("Mongodb error");
    res.status(500).json("Server Error");
  }
});

module.exports = router;
