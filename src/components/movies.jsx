import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import _ from "lodash";
import { Link } from "react-router-dom";

export default class Movies extends Component {
  state = {
    movies: [],
    gneres: [],
    currentPage: 1,
    pageSize: 4,
    currentGnere: 0,
    sortColumn: { path: "title", order: "asc" },
    searchMovie: "",
    allmovies: [],
  };

  componentDidMount() {
    const gneres = getGenres();
    const movies = getMovies();

    this.setState({ movies, gneres, allmovies: movies });
  }

  movieDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie.id);
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGnereChange = (gnere) => {
    this.setState({ currentGnere: gnere, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    let movies = [...this.state.movies];

    movies = movies.filter((movie) => {
      if (movie.title.toLowerCase().includes(this.state.searchMovie))
        return movie;
    });

    let moviesCount = movies.length;

    if (this.state.currentGnere) {
      movies = movies.filter(
        (movie) => movie.genre._id === this.state.currentGnere
      );
      moviesCount = movies.length;
    }

    movies = _.orderBy(
      movies,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );

    movies = paginate(movies, this.state.currentPage, this.state.pageSize);

    return { moviesCount: moviesCount, movies: movies };
  };

  handleSearchChange = (searchMovie) => {
    this.setState({ searchMovie, currentPage: 1 });
  };

  render() {
    if (this.state.movies.length <= 0) return <p>No movies to return.</p>;

    const { moviesCount, movies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            gneres={this.state.gneres}
            currentGnere={this.state.currentGnere}
            onGnereChange={this.handleGnereChange}
          />
        </div>
        <div className="col">
          <Link className="btn btn-primary mb-2" to="/movies/new">
            New Movie
          </Link>
          <p>Showing {moviesCount} movies in the database.</p>
          <SearchBox
            value={this.state.searchMovie}
            onChange={this.handleSearchChange}
          />
          <MoviesTable
            movies={movies}
            sortColumn={this.state.sortColumn}
            onDelete={this.movieDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={moviesCount}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
