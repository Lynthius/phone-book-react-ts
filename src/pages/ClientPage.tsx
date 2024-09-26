import { Link, useParams, useNavigate } from "react-router-dom";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { Card } from "../components/Card/Card";
import { ROUTES } from "../routes";
import { useGetClientById } from "../api/queries";
import { useDeleteClient } from "../api/mutations";

export const ClientPage = () => {
  const params = useParams<{id:string}>();

  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetClientById(params.id);
  const { mutate } = useDeleteClient();

  if (isError) {
    return <p>Error</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>Client not found</p>;
  }

  const handleDelete = (data: string) => {
    mutate(data);
    navigate(ROUTES.clients);
  };

  return (
    <Wrapper>
      <Card {...data} />
      {params.id ? (
        <Link
          className="bg-gray-700 hover:bg-gray-500 text-white flex items-center font-bold py-2 px-4 rounded"
          to={ROUTES.clientEdit(params.id)}
        >
          Edit Client
        </Link>
      ) : null}
      <button
        onClick={() => handleDelete(params.id || "")}
        className="bg-red-600 hover:bg-red-500 text-white flex items-center font-bold py-2 px-4 rounded"
      >
        Delete Client
      </button>
    </Wrapper>
  );
};
