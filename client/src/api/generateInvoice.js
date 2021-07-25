import axios from "axios";
import { Toast } from "../utils/Toast";
export const generateInvoiceInBackend = async (data) => {
  const invoiceData = await axios
    .post("/api/invoice/generate", data)
    .catch((error) => {
      Toast("error", error.message);
      return console.log(error.message);
    });
  Toast("success", "Invoice generated Successfully!");
  return invoiceData;
};
