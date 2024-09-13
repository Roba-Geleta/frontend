import { useState } from "react";
import "./App.css";
import CardList from "./Components/CardList/CardList";
import Search from "./Components/Search/Search";

function App() {
  // const [count, setCount] = useState(0);
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e);
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(e);
  };

  return (
    <>
      <div className="App">
        <Search onClick={onClick} search={search} handleChange={handleChange} />
        <CardList />
      </div>
    </>
  );
}

export default App;
