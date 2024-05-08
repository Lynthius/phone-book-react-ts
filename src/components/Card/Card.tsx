import { Link } from "react-router-dom";
import { Client } from "../../validators/validators";
import { ROUTES } from "../../routes";

export const Card = ({ name, surname, town, street, region, phoneNumber, id }: Client) => {
  return (
    <Link
      to={ROUTES.clientId(id)}
      className="flex flex-wrap flex-col md:flex-row gap-x-8 gap-y-6 p-4 bg-gray-700 rounded-xl animate-fade"
    >
      <div className="flex flex-col min-w-48 gap-2 border-gray-500">
        <div className="flex flex-col">
          <h3 className="font-medium text-lg">{`${name}`}</h3>
          <h3 className="font-medium text-lg">{`${surname}`}</h3>
        </div>
        <div className="flex flex-col">
          <h3>
            <strong>Address:</strong>
          </h3>
          <span>{`${town}`}</span>
          <span>{`${street}`}</span>
          <span>{`${region}`}</span>
        </div>
        <hr />
        <div className="flex flex-col">
          <h3>
            <strong>Phone:</strong>
          </h3>
          <span>{phoneNumber}</span>
        </div>
      </div>
    </Link>
  );
};
