import Joi from "joi-browser";
import React from "react";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie, getMovie } from "../services/fakeMovieService";
import Form from "./common/form";

class MovieDetail extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    genres: [],
    movieNotExists: false,
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .integer()
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };

  doSubmit = (movie) => {
    saveMovie(movie);
    this.props.history.push("/");
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    if (this.props.match.params.id !== "new") {
      const movie = getMovie(this.props.match.params.id);
      if (movie) {
        const data = {};

        data._id = movie._id;
        data.title = movie.title;
        data.numberInStock = movie.numberInStock.toString();
        data.dailyRentalRate = movie.dailyRentalRate.toString();
        data.genreId = movie.genre._id;

        this.setState({ data });
      } else this.props.history.replace("/not-found");
    }
  }

  render() {
    const { match } = this.props;
    return (
      <React.Fragment>
        <h2>Movie Form {match.params.id === "new" ? "" : match.params.id}</h2>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title", "text")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "text")}
          {this.renderInput("dailyRentalRate", "Rate", "text")}
          {this.renderButton("Save")}
        </form>
      </React.Fragment>
    );
  }
}

export default MovieDetail;
