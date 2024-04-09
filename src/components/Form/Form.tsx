import React, { useState } from "react";
// import { Person, cardsData } from "../Card/data/cards-data";
import { useAPI } from "../test/useApi"

type Person = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: object;
  phone: string;
  website: string;
  company: object;
};

type FormProps = {
  onFilterChange: (filteredData: Person[]) => void;
};

export const Form = ({ onFilterChange }: FormProps) => {
  const { data } = useAPI (
    "https://jsonplaceholder.typicode.com/users"
  );
  const [searchInput, setSearchInput] = useState("");
  // const [filteredResults, setFilteredResults] = useState(cardsData);

  const searchItems = (searchInput: string) => {
    setSearchInput(searchInput);
    console.log(searchInput);

    if (searchInput !== "") {
      const filteredData = data.filter((item) => {
        return item.name.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase())
      });
      // setFilteredResults(filteredData);
      onFilterChange(filteredData);
    } else {
      console.log("empty");
      // setFilteredResults(cardsData);
      onFilterChange(data);
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // console.log(filteredResults);
    return searchInput;
  };

  return (
    <form id="search-contacts">
      <div className="flex flex-row items-center gap-2 text-gray-800">
        <div className="flex flex-col justify-start gap-2">
          <label className="text-left text-sm ml-1" htmlFor="surname">
            Search by name:
          </label>
          <div className="flex flex-row gap-2">
            <input
              className="rounded-full text-white bg-gray-400 px-6 py-2 text-sm"
              type="text"
              name="name-filter"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => searchItems(e.target.value)}
            />
            <button onClick={handleSubmit} >
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 15a4 4 0 1 0 8 0a4 4 0 1 0-8 0m7.5 3.5L21 21M4 6h16M4 12h4m-4 6h4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
