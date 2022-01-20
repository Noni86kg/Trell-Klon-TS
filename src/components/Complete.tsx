import React, { useState } from "react";
import { Todo } from "../models/models";
import { Droppable } from "react-beautiful-dnd";
import SingleComplete from "./SingleComplete";

interface props {
  completeData: Array<Todo>;
  handleAdd: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  complete: string;
}

const Complete: React.FC<props> = ({
  completeData,
  handleAdd,
  complete,
  handleChange,
}) => {
  const [completeToggle, setcompleteToggle] = useState<boolean>(false);
  return (
    <Droppable droppableId="complete">
      {(provided, snapshot) => (
        <section
          className={`complete ${snapshot.isDraggingOver ? "dragactive" : ""}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div>
            <ul>Complete</ul>
            {completeData?.map((item, index) => {
              return <SingleComplete key={item.id} index={index} item={item} />;
            })}
          </div>
          {provided.placeholder}
          <form
            id="2"
            onSubmit={(e) => {
              handleAdd(e);
            }}
          >
            <div className="bottom">
              <button
                className="add-btn"
                onClick={() => setcompleteToggle(!completeToggle)}
              >
                + Add Item
              </button>
              {completeToggle && (
                <button type="submit" className="save-btn">
                  Save Item
                </button>
              )}
            </div>
            {completeToggle && (
              <div className="bottom-text-area">
                <textarea
                  rows={6}
                  cols={50}
                  value={complete}
                  name="complete"
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

export default Complete;
