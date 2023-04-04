import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useState, useEffect } from "react";
import Header from "./Organisms/Header";
import Home from "./Pages/Home";
import userServices from "./Api/UserService";
import tokenServices from "./Util/TokenServices";

//material UI Import
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    getUser();
  }, []);

  function handleLogout( ){
    tokenServices.removeToken()
    setUser(undefined)
  }

  async function getUser() {
    const token = await tokenServices.getToken();
    if (token) {
      const tempUser = await userServices.findUser();
      setUser(tempUser);
    }
  }

  return (
    <>
      <Header handleLogout={handleLogout} getUser={getUser} user={user} />
      <div className="header-spacer"></div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
