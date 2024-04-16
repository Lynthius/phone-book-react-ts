import "./App.css";
import { useState, useEffect } from "react";
import { Card, Person } from "./components/Card/Card";
import { Wrapper } from "./components/Wrapper/Wrapper";
import { Menu } from "./components/Menu/Menu";
import { Form } from "./components/Form/Form";
// import { Person, cardsData } from "./components/Card/data/cards-data";
import { useAPI } from "./components/test/useApi";
import { TestButton } from "./components/TestButton";
import { Cart } from "./components/Cart/Cart";
import { Bus } from "./components/Bus/Bus";

function App() {
  const { data, isLoading, isError } = useAPI<Person[]>("https://jsonplaceholder.typicode.com/users");
  console.log(data);
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
      <Menu />
      <Wrapper>
        <Form onFilterChange={handleFilterChange} />
        {filteredCardsData.map((el) => (
          <Card key={el.id} {...el} />
        ))}
        <TestButton>Click!</TestButton>
      </Wrapper>
      <Cart />
      <Bus />
    </>
  );
}

export default App;
