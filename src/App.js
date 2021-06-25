import "./App.css";
import Movies from "./components/movies";
import NavBarMovies from "./components/moviesNavBar";
import Customers from "./components/customers";
import NotFound from "./components/notFound";
import MovieDetail from "./components/movieDetail";
import Rentals from "./components/rentals";
import LoginForm from "./components/loginForm";
import { Route, Switch, Redirect } from "react-router-dom";
import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBarMovies />
        <main className="container">
          <Switch>
            <Route path="/movies/:id" exact component={MovieDetail} />
            <Route path="/login" exact component={LoginForm} />
            <Route path="/rentals" exact component={Rentals} />
            <Route path="/customers" exact component={Customers} />
            <Route path="/movies" exact component={Movies} />
            <Route path="/not-found" component={NotFound} />
            <Redirect path="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
