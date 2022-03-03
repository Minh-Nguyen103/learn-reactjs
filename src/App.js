// import "./App.css";
import React from "react";
import { Link, NavLink, Redirect, Route, Switch } from "react-router-dom";
import SongFeature from "./features/Song";
import TodoFeature from "./features/Todo";

function App() {
  return (
    <div className="App">
      Header

      <p><NavLink to='/todos' activeClassName="active-menu">Todos</NavLink></p>
      <p><NavLink to='/albums'>Albums</NavLink></p>

      <Switch>
      <Redirect from="/home" to='/' />
      <Redirect from="/post-list/:postId" to='/post/:postId' />


      <Route path= '/todos' component = {TodoFeature}/>
      <Route path= '/albums' component = {SongFeature}/>
      </Switch>

     

    </div>
  );
}

export default App;
