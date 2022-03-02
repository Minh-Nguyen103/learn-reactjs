// import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import SongFeature from "./features/Song";
import TodoFeature from "./features/Todo";

function App() {
  return (
    <div className="App">
      Header

      <Route path= '/todos' component = {TodoFeature}/>
      <Route path= '/albums' component = {SongFeature}/>

    </div>
  );
}

export default App;
