import React,{useState} from "react";
import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import Authentification from "./Pages/Authentification";
import { AuthContext } from "./auth";

function App() {
  const [authTokens, setAuthTokens] = useState(
    localStorage.getItem("tokens") || ""
  );
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  const removeToken = () => {
    localStorage.removeItem("tokens");
    window.location.reload(true);
  }


  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens ,removeToken}}>
<div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/auth" element={<Authentification  />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
    </AuthContext.Provider>
    
  );
}

export default App;
