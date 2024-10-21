import { Outlet } from "react-router";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/userAuth";
import ResponsiveAppBar from "./Components/AppBar/AppBar";
import AppAppBar from "./Components/AppAppBar/AppAppBar";
import { ThemeProvider } from "./Context/ThemeContext";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <UserProvider>
        <ThemeProvider>
          {/* <ResponsiveAppBar /> */}
          <AppAppBar />
          {/* <Navbar /> */}
          <Outlet />
          <ToastContainer />
          <Footer />
        </ThemeProvider>
      </UserProvider>
    </>
  );
}

export default App;
