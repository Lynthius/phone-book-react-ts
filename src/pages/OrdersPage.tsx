import { useGetClients, useGetOrders } from "../api/queries";
import { useFormik } from "formik";
import { useAddOrder } from "../api/mutations";
import { orderValidationSchema } from "../validators/validators";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

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
          <Select
            name="clientId"
            id="clientId"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.clientId}
            required
          >
            {data.map((el) => (
              <MenuItem value={el.id}>
                {el.name} {el.surname}
              </MenuItem>
            ))}
          </Select>
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
        {dataOrders.map(({title, body, id, quantity, clientId}) => (
          <div>
            <span>
              <strong>Title:</strong>
            </span>
            <span> {title}</span> <br />
            <span>
              <strong>Order:</strong>
            </span>
            <span> {body}</span> <br />
            <span>
              <strong>Order's ID:</strong>
            </span>
            <span> {id}</span>
            <br />
            <span>
              <strong>Quantity:</strong>
              <span> {quantity}</span>
            </span>
            <br />
            <span>
              <strong>Customer's ID:</strong>
            </span>
            <span> {clientId}</span>
            <br />
            <div className="mt-4">
              <Link className="bg-gray-700 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"to={ROUTES.orderId(id)}>Details</Link>
            </div>
            <hr className="mb-4 mt-4" />
          </div>
        ))}
      </div>
    </>
  );
};
