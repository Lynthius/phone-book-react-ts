import "./App.css";
import { Card } from "./components/Card/Card";
import { Wrapper } from "./components/Wrapper/Wrapper";
import { Menu } from "./components/Menu/Menu";
import { cardsData } from "./components/Card/data/cards-data";

function App() {
  return (
    <>
    <Menu />
    <Wrapper>
      {cardsData.map((el) => (
        <Card key={el.id} {...el} />
        // <Card>{el}</Card>
      ))}
    </Wrapper>
    </>
  );
}

export default App;