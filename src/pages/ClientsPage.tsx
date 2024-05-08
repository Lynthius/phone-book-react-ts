import { Link } from "react-router-dom";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { Card } from "../components/Card/Card";
import { useGetClients } from "../api/queries";

export const ClientsPage = () => {
  const { data, isLoading, isError } = useGetClients()

  if (isError || !data) {
    return <p>Error</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
      <Wrapper>
        {data.map((el) => (
          <Card key={el.id} {...el} />
        ))}
        <Link className="bg-gray-700 hover:bg-gray-500 text-white flex items-center font-bold py-2 px-4 rounded" to="/clients/add">
          Add Client
        </Link>
      </Wrapper>
  );
};
