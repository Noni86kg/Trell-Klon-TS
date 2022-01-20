import React, { useState } from "react";
import { Todo } from "../models/models";
import { Droppable, Draggable } from "react-beautiful-dnd";
import SingleOnHold from "./SingleOnHold";

interface props {
  onHoldData: Array<Todo>;
  handleAdd: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onHold: string;
}

const OnHold: React.FC<props> = ({
  onHoldData,
  handleAdd,
  onHold,
  handleChange,
}) => {
  const [onHoldToggle, setonHoldToggle] = useState<boolean>(false);
  let a: string = "a";
  return (
    <Droppable droppableId="on-hold">
      {(provided, snapshot) => (
        <section
          className={`on-hold ${snapshot.isDraggingOver ? "dragactive" : ""}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div>
            <ul>On Hold</ul>
            {onHoldData?.map((item, index) => {
              return <SingleOnHold key={item.id} index={index} item={item} />;
            })}
          </div>
          {provided.placeholder}
          <form
            id="3"
            onSubmit={(e) => {
              handleAdd(e);
            }}
          >
            <div className="bottom">
              <button
                className="add-btn"
                onClick={() => setonHoldToggle(!onHoldToggle)}
              >
                + Add Item
              </button>
              {onHoldToggle && (
                <button type="submit" className="save-btn">
                  Save Item
                </button>
              )}
            </div>
            {onHoldToggle && (
              <div className="bottom-text-area">
                <textarea
                  rows={6}
                  cols={50}
                  value={onHold}
                  name="onHold"
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

export default OnHold;
