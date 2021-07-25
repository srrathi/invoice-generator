import axios from "axios";
import { Toast } from "../utils/Toast";

export const getAllInvoices = async () => {
//   console.log("Function called!!!!!!!!!");
  const invoices = await axios
    .get("http://localhost:4000/api/invoice/list")
    .catch((error) => {
      Toast("error", error.message);
      console.log(error.message);
    });
  return invoices.data;
};
