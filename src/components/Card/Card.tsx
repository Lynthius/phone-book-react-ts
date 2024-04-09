// import React from "react";

export type Person = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
};

export const Card = ({ name, address, phone }: Person) => {
  return (
    <div className="flex flex-wrap flex-col md:flex-row gap-x-8 gap-y-6 p-4 bg-gray-700 rounded-xl animate-fade">
      {/* <img className="w-16 h-16 rounded-full" src={imgSrc} alt="" /> */}
      <div className="border-l pl-8 border-gray-500">
        <div className="flex flex-col">
          <h3 className="font-medium text-lg">{`${name}`}</h3>
        </div>
        <div className="flex flex-col">
          <h4>Address:</h4>
          <h4>{`${address.street}, ${address.zipcode}`}</h4>
          <h4>{address.street}</h4>
          <h4>{address.suite}</h4>
        </div>
        <div className="flex flex-col">
          <h4>{phone}</h4>
        </div>
      </div>
    </div>
  );
};
