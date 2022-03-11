// import "./App.css";
import React from 'react';
import { Link, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import SongFeature from './features/Song';
import TodoFeature from './features/Todo';
import NotFound from './components/NotFound';
import CounterFeature from './features/Counter';

function App() {
  return (
    <div className="App">
      Header
      <p>
        <NavLink to="/todos" activeClassName="active-menu">
          Todos
        </NavLink>
      </p>
      <p>
        <NavLink to="/albums">Albums</NavLink>
      </p>
      <p>
        <NavLink to="/counter">Counter</NavLink>
      </p>
      <Switch>
        <Redirect from="/home" to="/" exact />
        <Redirect from="/post-list/:postId" to="/post/:postId" exact />

        <Route path="/" component={CounterFeature} exact />
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={SongFeature} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
