import React, { useState } from "react";
import { Todo } from "../models/models";
import { Droppable } from "react-beautiful-dnd";
import SingleBacklog from "./SingleBacklog";

interface props {
  backlogData: Array<Todo>;
  handleAdd: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  backlog: string;
}

const Backlog: React.FC<props> = ({
  backlogData,
  handleAdd,
  handleChange,
  backlog,
}) => {
  const [backlogToggle, setBacklogToggle] = useState<boolean>(false);
  return (
    <Droppable droppableId="backlog">
      {(provided, snapshot) => (
        <section
          className={`backlog ${snapshot.isDraggingOver ? "dragactive" : ""}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div>
            <ul>Backlog</ul>
            {backlogData?.map((item, index) => {
              return <SingleBacklog key={item.id} index={index} item={item} />;
            })}
          </div>
          {provided.placeholder}
          <form
            id="0"
            name="backlog"
            onSubmit={(e) => {
              handleAdd(e);
            }}
          >
            <div className="bottom">
              <button
                className="add-btn"
                onClick={() => setBacklogToggle(!backlogToggle)}
              >
                + Add Item
              </button>
              {backlogToggle && (
                <button type="submit" className="save-btn">
                  Save Item
                </button>
              )}
            </div>
            {backlogToggle && (
              <div className="bottom-text-area">
                <textarea
                  rows={6}
                  cols={50}
                  value={backlog}
                  name="backlog"
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

export default Backlog;
