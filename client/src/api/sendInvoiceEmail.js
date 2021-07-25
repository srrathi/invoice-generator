import axios from "axios";
import { Toast } from "../utils/Toast";
export const sendInvoiceEmail = async (data) => {
  const response = await axios
    .post("/api/invoice/email", data)
    .catch((error) => {
      Toast("error", error.message);
      return console.log(error.message);
    });
  Toast("success", "Invoice E-mail sent Successfully!");
  return response;
};
