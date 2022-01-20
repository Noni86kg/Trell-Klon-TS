import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Todo } from "../models/models";

interface props {
  index: number;
  item: Todo;
}

const SingleInProgres: React.FC<props> = ({ index, item }) => {
  return (
    <Draggable draggableId={item.id.toString()} index={index}>
      {(provided, snapshot) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={` ${snapshot.isDragging ? "drag" : ""}`}
        >
          {item.backlog}
          {item.inProgres}
          {item.complete}
          {item.onHold}
        </li>
      )}
    </Draggable>
  );
};

export default SingleInProgres;
