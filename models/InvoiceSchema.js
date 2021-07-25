const mongoose = require("mongoose");

// Schema for Invoice
const InvoiceSchema = new mongoose.Schema({
  items: [
    {
      type: {
        type: { type: String },
      },
      name: {
        type: String,
        trim: true,
        required: true,
      },
      hoursOfWork: {
        type: Number,
        required: true,
      },
      rate: {
        type: Number,
        required: true,
      },
      expenses: {
        type: Number,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  invoiceId: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
