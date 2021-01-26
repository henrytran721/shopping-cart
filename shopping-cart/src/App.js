import './App.css';
import ShoppingCart from './views/ShoppingCart';
import Cart from './views/Cart';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/cart'>
            <Cart />
          </Route>
          <Route path='/'>
            <ShoppingCart />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
