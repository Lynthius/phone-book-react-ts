import { useState, useEffect } from "react";

import { Card } from "../components/Card/Card";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { Form } from "../components/Form/Form";
// import { TestButton } from "../components/TestButton";
import { Cart } from "../components/Cart/Cart";
import { Bus } from "../components/Bus/Bus";
import { useGetClients } from "../api/queries";

export const HomePage = () => {
  const { data, isLoading, isError } = useGetClients()
  const [filteredCardsData, setFilteredCardsData] = useState<Person[]>([]);
  useEffect(() => {
    if (data) {
      setFilteredCardsData(data);
    }
  }, [data]);

  const handleFilterChange = (filteredData: Person[]) => {
    setFilteredCardsData(filteredData);
  };
  if (isError) {
    return <p>Error</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Wrapper>
        <Form onFilterChange={handleFilterChange} />
        {filteredCardsData.map((el) => (
          <Card key={el.id} {...el} />
        ))}
        {/* <TestButton>Click!</TestButton> */}
      </Wrapper>
      <Cart />
      <Bus />
    </>
  );
};
