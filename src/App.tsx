import { useState } from "react";
import "./App.css";
import CardList from "./Components/CardList/CardList";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        <CardList />
      </div>
    </>
  );
}

export default App;
