import React, { useState } from "react";
import { Todo } from "../models/models";
import { Droppable } from "react-beautiful-dnd";
import SingleInProgres from "./SingleInProgres";

interface props {
  inProgresData: Array<Todo>;
  handleAdd: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  inProgres: string;
}

const InProgres: React.FC<props> = ({
  inProgresData,
  handleAdd,
  inProgres,
  handleChange,
}) => {
  const [inProgresDataToggle, setinProgresDataToggle] =
    useState<boolean>(false);
  return (
    <Droppable droppableId="in-progress">
      {(provided, snapshot) => (
        <section
          className={`in-progress ${
            snapshot.isDraggingOver ? "dragactive" : ""
          }`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div>
            <ul>In Progres</ul>
            {inProgresData?.map((item, index) => {
              return (
                <SingleInProgres key={item.id} index={index} item={item} />
              );
            })}
          </div>
          {provided.placeholder}
          <form
            id="1"
            onSubmit={(e) => {
              handleAdd(e);
            }}
          >
            <div className="bottom">
              <button
                className="add-btn"
                onClick={() => setinProgresDataToggle(!inProgresDataToggle)}
              >
                + Add Item
              </button>
              {inProgresDataToggle && (
                <button type="submit" className="save-btn">
                  Save Item
                </button>
              )}
            </div>
            {inProgresDataToggle && (
              <div className="bottom-text-area">
                <textarea
                  rows={6}
                  cols={50}
                  value={inProgres}
                  name="inProgres"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            )}
          </form>
        </section>
      )}
    </Droppable>
  );
};

export default InProgres;
