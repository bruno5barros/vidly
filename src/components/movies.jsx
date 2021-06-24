import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";

export default class Movies extends Component {
  state = {
    movies: getMovies(),
    gneres: getGenres(),
    currentPage: 1,
    pageSize: 4,
    currentGnere: 0,
    sortColumn: { path: "title", order: "asc" },
  };

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
          <p>Showing {moviesCount} movies in the database.</p>
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
