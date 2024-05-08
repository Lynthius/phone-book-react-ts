import { useGetClients, useGetOrders } from "../api/queries";
import { useFormik } from "formik";
import { useAddOrder } from "../api/mutations";
import { orderValidationSchema } from "../validators/validators";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
// ? jak uzyc Select tak aby działał i miał style od MUI
import { Unstable_NumberInput as NumberInput } from "@mui/base";
// ? jak uzyc NumberINput tak aby działał i miał style od MUI

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../routes";

export const OrdersPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetClients();
  const { data: dataOrders, isLoading: isLoadingOrders, isError: isErrorOrders } = useGetOrders();

  type FormValues = {
    clientId: string;
    quantity: number;
    title: string;
    body: string;
  };

  const { mutate } = useAddOrder();
  const formik = useFormik<FormValues>({
    initialValues: {
      clientId: "",
      quantity: 1,
      title: "Your title",
      body: "",
    },
    onSubmit: (values: FormValues) => {
      mutate(values);
      navigate(ROUTES.orders);
    },
    validationSchema: orderValidationSchema,
  });

  if (isError || !data) {
    return <p>Error</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isErrorOrders || !data) {
    return <p>Error</p>;
  }
  if (isLoadingOrders) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className=" text-gray-700 text-lg font-bold mb-2">Add a new Order</h1>
        <div>
          <select
            name="clientId"
            id="clientId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.clientId}
            required
          >
            <option value="" label="Select a Client" disabled>
              Select a Client{" "}
            </option>
            {data.map((el) => (
              <option value={el.id}>
                {el.name} {el.surname}
              </option>
            ))}
          </select>
        </div>
        <hr className="mb-4" />
        <div className="mb-4">
          <TextField
            error={Boolean(formik.touched.title && formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title ? formik.errors.title : null}
            type="text"
            id="title"
            label="Order's title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
        </div>
        <hr className="mb-4" />
        <div className="mb-4">
          <TextField
            error={Boolean(formik.touched.body && formik.errors.body)}
            helperText={formik.touched.body && formik.errors.body ? formik.errors.body : null}
            type="text"
            id="body"
            label="Order"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.body}
          />
        </div>
        <hr className="mb-4" />
        <div className="mb-4">
          <input
            id="quantity"
            type="number"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.quantity}
          />
        </div>
        <button className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded" type="submit">
          submit
        </button>
      </form>
      <div>
        <h2 className="text-white-700 text-lg font-bold mb-2">Orders list:</h2>
        {dataOrders.map((el) => (
          <div>
            <span>
              <strong>Title:</strong>
            </span>
            <span> {el.title}</span> <br />
            <span>
              <strong>Order:</strong>
            </span>
            <span> {el.body}</span> <br />
            <span>
              <strong>Order's ID:</strong>
            </span>
            <span> {el.id}</span>
            <br />
            <span>
              <strong>Quantity:</strong>
              <span> {el.quantity}</span>
            </span>
            <br />
            <span>
              <strong>Customer's ID:</strong>
            </span>
            <span> {el.clientId}</span>
            <hr className="mb-4" />
          </div>
        ))}
      </div>
    </>
  );
};
