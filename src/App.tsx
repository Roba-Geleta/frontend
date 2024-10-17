import { Outlet } from "react-router";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/userAuth";
import ResponsiveAppBar from "./Components/AppBar/AppBar";

function App() {
  return (
    <>
      <UserProvider>
        <ResponsiveAppBar />
        {/* <Navbar /> */}
        <Outlet />
        <ToastContainer />
      </UserProvider>
    </>
  );
}

export default App;
