import React, { useState } from "react";
import ReactDOM from "react-dom";
import SearchArea from "./SearchArea.js";
import { Router } from "@reach/router";
import WatchArea from "./WatchArea.js";
import ColorContext from "./ColorContext";
const App = () => {
  const themeColor = useState("black");
  return (
    <ColorContext.Provider value={themeColor}>
      <div>
        <header>
          <a href="/">RivTube</a>
        </header>
        <Router>
          <SearchArea path="/" />
          <WatchArea path="/watch/:id" />
        </Router>
      </div>
    </ColorContext.Provider>
  );
};

ReactDOM.render(React.createElement(App), document.getElementById("root"));
