import React from "react";

const ListGroup = (props) => {
  const { gneres, currentGnere, onGnereChange, valueProperty, textProperty } =
    props;

  return (
    <div className="list-group">
      <a
        key="0"
        className={
          currentGnere === 0
            ? "list-group-item list-group-item-action active"
            : "list-group-item list-group-item-action"
        }
        onClick={() => onGnereChange(0)}
      >
        All Genres
      </a>
      {gneres.map((gnere) => (
        <a
          key={gnere[valueProperty]}
          className={
            currentGnere === gnere[valueProperty]
              ? "list-group-item list-group-item-action active"
              : "list-group-item list-group-item-action"
          }
          onClick={() => onGnereChange(gnere[valueProperty])}
        >
          {gnere[textProperty]}
        </a>
      ))}
    </div>
  );
};

ListGroup.defaultProps = { textProperty: "name", valueProperty: "_id" };

export default ListGroup;
