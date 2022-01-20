import React, { useState, useEffect } from "react";
import "./Board.css";
import { Todo } from "../models/models";
import Backlog from "./Backlog";
import InProgres from "./InProgres";
import Complete from "./Complete";
import OnHold from "./OnHold";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const Board = () => {
  const [backlogData, setBacklogData] = useState<Array<Todo>>([]);
  const [backlog, setBacklog] = useState<string>("");
  const [inProgresData, setInProgresData] = useState<Array<Todo>>([]);
  const [inProgres, setInProgres] = useState<string>("");
  const [completeData, setCompleteData] = useState<Array<Todo>>([]);
  const [complete, setComplete] = useState<string>("");
  const [onHoldData, setOnHoldData] = useState<Array<Todo>>([]);
  const [onHold, setOnHold] = useState<string>("");

  // HandleChange
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.name === "backlog") setBacklog(e.target.value);
    else if (e.target.name === "inProgres") setInProgres(e.target.value);
    else if (e.target.name === "complete") setComplete(e.target.value);
    else if (e.target.name === "onHold") setOnHold(e.target.value);
  };

  // HandleAdd
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (e.target as HTMLTextAreaElement).id;

    if (id === "0" && backlog) {
      setBacklogData([...backlogData, { id: Date.now(), backlog }]);
      setBacklog("");
    } else if (id === "1" && inProgres) {
      setInProgresData([...inProgresData, { id: Date.now(), inProgres }]);
      setInProgres("");
    } else if (id === "2" && complete) {
      setCompleteData([...completeData, { id: Date.now(), complete }]);
      setComplete("");
    } else if (id === "3" && onHold) {
      setOnHoldData([...onHoldData, { id: Date.now(), onHold }]);
      setOnHold("");
    }
  };
  // Local Storage
  useEffect(() => {
    if (localStorage.getItem("backlogData")) {
      const useLocalStorageData = JSON.parse(localStorage.backlogData);
      setBacklogData(useLocalStorageData);
    }
    if (localStorage.getItem("inProgresData")) {
      const useLocalStorageData = JSON.parse(localStorage.inProgresData);
      setInProgresData(useLocalStorageData);
    }
    if (localStorage.getItem("completeData")) {
      const useLocalStorageData = JSON.parse(localStorage.completeData);
      setCompleteData(useLocalStorageData);
    }
    if (localStorage.getItem("onHoldData")) {
      const useLocalStorageData = JSON.parse(localStorage.onHoldData);
      setOnHoldData(useLocalStorageData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("backlogData", JSON.stringify(backlogData));
  }, [backlogData]);
  useEffect(() => {
    localStorage.setItem("inProgresData", JSON.stringify(inProgresData));
  }, [inProgresData]);
  useEffect(() => {
    localStorage.setItem("completeData", JSON.stringify(completeData));
  }, [completeData]);
  useEffect(() => {
    localStorage.setItem("onHoldData", JSON.stringify(onHoldData));
  }, [onHoldData]);

  // Drag and Drop
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    let add: any;
    let active: Array<Todo>;
    let complete: Array<Todo>;

    // Source Logic
    if (source.droppableId === "backlog") {
      active = backlogData;
      add = active[source.index];
      active.splice(source.index, 1);
      setBacklogData(active);
      localStorage.setItem("backlogData", JSON.stringify(active));
    } else if (source.droppableId === "complete") {
      active = completeData;
      add = active[source.index];
      active.splice(source.index, 1);
      setCompleteData(active);
      localStorage.setItem("completeData", JSON.stringify(active));
    } else if (source.droppableId === "on-hold") {
      active = onHoldData;
      add = active[source.index];
      active.splice(source.index, 1);
      setOnHoldData(active);
      localStorage.setItem("onHoldData", JSON.stringify(active));
    } else if (source.droppableId === "in-progress") {
      active = inProgresData;
      add = active[source.index];
      active.splice(source.index, 1);
      setInProgresData(active);
      localStorage.setItem("inProgresData", JSON.stringify(active));
    }

    // Destination Logic
    if (destination.droppableId === "backlog") {
      complete = backlogData;
      complete.splice(destination.index, 0, add);
      setBacklogData(complete);
      localStorage.setItem("backlogData", JSON.stringify(complete));
    } else if (destination.droppableId === "complete") {
      complete = completeData;
      complete.splice(destination.index, 0, add);
      setCompleteData(complete);
      localStorage.setItem("completeData", JSON.stringify(complete));
    } else if (destination.droppableId === "on-hold") {
      complete = onHoldData;
      complete.splice(destination.index, 0, add);
      setOnHoldData(complete);
      localStorage.setItem("onHoldData", JSON.stringify(complete));
    } else if (destination.droppableId === "in-progress") {
      complete = inProgresData;
      complete.splice(destination.index, 0, add);
      setInProgresData(complete);
      localStorage.setItem("inProgresData", JSON.stringify(complete));
    }
  };

  return (
    <div className="board">
      <DragDropContext onDragEnd={onDragEnd}>
        <Backlog
          backlogData={backlogData}
          handleAdd={handleAdd}
          handleChange={handleChange}
          backlog={backlog}
        />
        <InProgres
          inProgresData={inProgresData}
          handleAdd={handleAdd}
          inProgres={inProgres}
          handleChange={handleChange}
        />
        <Complete
          completeData={completeData}
          handleAdd={handleAdd}
          handleChange={handleChange}
          complete={complete}
        />
        <OnHold
          onHoldData={onHoldData}
          handleAdd={handleAdd}
          handleChange={handleChange}
          onHold={onHold}
        />
      </DragDropContext>
    </div>
  );
};

export default Board;
