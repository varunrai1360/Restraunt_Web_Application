import React, { Component } from "react";
import { BrowserRouter } from 'react-router-dom';
// import logo from "./logo.svg";
import './App.css';
// import { Navbar, NavbarBrand } from 'reactstrap';
// import Menu from './components/MenuComponent.js';
// import { DISHES } from './shared/dishes.js';
import Main from './components/MainComponents';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
const store = ConfigureStore();


/* class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES
    };
  }
  render() {
    return (

      <div>
      <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        < Menu  dishes={this.state.dishes} />
      </div>
        

    );
  }
}*/

class App extends Component {

  render() {
    return (
      <Provider store={store}>
      <BrowserRouter>
      <div className="App">
        <Main />
      </div>
      </BrowserRouter>
      </Provider>
    );
  }
}
export default App;