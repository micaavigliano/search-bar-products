import React from 'react'
import ItemCont from './Components/ItemCont'
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

function App() {
  let history = createBrowserHistory();
  return (
    <Router className="App" history={history}>
      <ItemCont />
    </Router>
  );
}

export default App;
