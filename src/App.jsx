import React from "react";
import { Routes, Route, BrowserRouter } from "react-router";
import Home from "./pages/Home";

import Chat from "./pages/Chat";
function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="chat" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
   
  );
}

export default App;
