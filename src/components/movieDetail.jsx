import React, { Component } from "react";

class MovieDetail extends Component {
  handleSave = () => this.props.history.push("/");

  render() {
    return (
      <div>
        <h2>Movie Form {this.props.match.params.id}</h2>
        <button onClick={this.handleSave} className="btn btn-primary">
          Save
        </button>
      </div>
    );
  }
}

export default MovieDetail;
