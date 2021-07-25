import axios from "axios";
import { Toast } from "../utils/Toast";

export const updateInvoiceStatus = async (data) => {
  console.log("API call Function");

  const responseData = await axios
    .patch(`/api/invoice/status/${data.id}`, {
      status: data.status,
    })
    .catch((error) => {
      Toast("error", error.message);
      console.log(error.message);
    });
  return responseData;
};
