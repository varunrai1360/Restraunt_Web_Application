import React, { Component } from "react";
// import logo from "./logo.svg";
import './App.css';
// import { Navbar, NavbarBrand } from 'reactstrap';
// import Menu from './components/MenuComponent.js';
// import { DISHES } from './shared/dishes.js';
import Main from './components/MainComponents';


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
      <div className="App">
        <Main />
      </div>
    );
  }
}
export default App;