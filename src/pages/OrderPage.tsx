import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetOrderById } from "../api/queries";
import { useGetClientById } from "../api/queries";
import { ROUTES } from "../routes";

export const OrderPage = () => {
  const params = useParams<{ id: string }>();
  const { data: orderData, isError: orderIsError, isLoading: orderIsLoading } = useGetOrderById(params.id);
  const [clientId, setClientId] = useState(null);
  const { data: clientData, isError: clientIsError, isLoading: clientIsLoading } = useGetClientById(clientId);

  useEffect(() => {
    if (orderData && orderData.clientId) {
      setClientId(orderData.clientId);
    }
  }, [orderData]);

  if (orderIsError || clientIsError) {
    return <p>Error</p>;
  }
  if (orderIsLoading || (clientId && clientIsLoading)) {
    return <p>Loading...</p>;
  }
  if (!orderData) {
    return <p>Order not found</p>;
  }
  if (!clientData) {
    return <p>Client not found</p>;
  }

  return (
    <>
      <h1 className=" text-white-700 text-lg font-bold mb-2">Order Info:</h1>
      <div>
        <div className="text-white-800">
          <strong>Title:</strong>
          <span className="text-gray-300"> {orderData.title}</span>
        </div>
        <div className="text-white-800">
          <strong>Order ID:</strong>
          <span className="text-gray-300"> {orderData.id}</span>
        </div>
        <div className="text-white-800">
          <strong>Order information:</strong>
          <span className="text-gray-300"> {orderData.body}</span>
        </div>
        <div className="text-white-800">
          <strong>Quantity:</strong>
          <span className="text-gray-300"> {orderData.quantity}</span>
        </div>
        <hr className="mb-4 mt-4" />
        <div className="text-white-800">
          <strong>Customer's name:</strong>
          <span className="text-gray-300">
            {" "}
            {clientData.name} {clientData.surname}
          </span>
        </div>
        <div className="mt-4">
          {params.id ? (
            <Link
              className="bg-gray-700 hover:bg-gray-500 text-white items-center font-bold py-2 px-4 rounded"
              to={ROUTES.clientEdit(orderData.clientId)}
            >
              Edit Client
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
};
