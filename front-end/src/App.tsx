import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { Template } from "./components/MainComponents/MainComponents";
import Footer from "./components/partials/Footer/index";
import Header from './components/partials/Header/index';

function App() {
  return (
    <BrowserRouter>
      <Template>
        <Header />
        <Routes />
        <Footer />
      </Template>
    </BrowserRouter>
  );
}

export default App;
