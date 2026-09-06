import "./ToDoList.css";
import FilterBar from "../FilterBar/FilterBar";
import Mission from "../Mission/mission";
import { useEffect, useState } from "react";

export default function ToDoList() {
  const intialArray = [];

  const [Missions, setMissions] = useState(() => {
    const saved = localStorage.getItem("missions");
    return saved ? JSON.parse(saved) : intialArray;
  });
  const [inputTitle, setInputTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const Nextid = Missions.length;
  const completedCount = Missions.filter((m) => m.isCompleted).length;
  const totalCount = Missions.length;
  useEffect(() => {
    localStorage.setItem("missions", JSON.stringify(Missions));
  }, [Missions]);

  const mappedMission = renderAll();

  function renderAll() {
    if (filter === "all") {
      return Missions.map((m) => {
        return (
          <Mission
            key={m.id}
            title={m.title}
            id={m.id}
            isCompleted={m.isCompleted}
            editMission={editMission}
            onToggleComplete={toggleComplete}
            deleteMission={deleteMission}
          />
        );
      });
    } else if (filter === "active") {
      return Missions.filter((m) => m.isCompleted === false).map((m) => {
        return (
          <Mission
            key={m.id}
            title={m.title}
            id={m.id}
            isCompleted={m.isCompleted}
            editMission={editMission}
            onToggleComplete={toggleComplete}
            deleteMission={deleteMission}
          />
        );
      });
    } else if (filter === "completed") {
      return Missions.filter((m) => m.isCompleted === true).map((m) => {
        return (
          <Mission
            key={m.id}
            title={m.title}
            id={m.id}
            isCompleted={m.isCompleted}
            editMission={editMission}
            onToggleComplete={toggleComplete}
            deleteMission={deleteMission}
          />
        );
      });
    }
  }

  function addMission(Nextid) {
    if (inputTitle === "" || inputTitle === null) {
      return;
    } else {
      Nextid++;
      const newMission = {
        id: Nextid,
        title: inputTitle,
        isCompleted: false,
      };
      const updatedMissions = [...Missions, newMission];
      setMissions(updatedMissions);
      setInputTitle("");
    }
  }
  function toggleComplete(id) {
    setMissions(
      Missions.map((m) => {
        if (id === m.id) {
          return { ...m, isCompleted: !m.isCompleted };
        } else {
          return m;
        }
      }),
    );
  }
  function deleteMission(id) {
    setMissions(Missions.filter((m) => m.id !== id));
  }

  function editMission(id, newTitle) {
    if (newTitle === "" || newTitle === null) {
      return;
    }
    setMissions(
      Missions.map((m) => {
        if (m.id == id) {
          return { ...m, title: newTitle };
        } else {
          return m;
        }
      }),
    );
  }

  return (
    <>
      <div className="page">
        <h1>My Missions</h1>
        <p className="mission-counter">
          {completedCount} of {totalCount} completed
        </p>
        <div className="line"></div>
        <FilterBar filter={filter} setFilter={setFilter} />
        <div className="missions">
          {mappedMission.length !== 0 ? (
            mappedMission
          ) : (
            <p>There are no missions yet!</p>
          )}
        </div>
        <div className="add-mission">
          <input
            type="text"
            name="Mission Title"
            id="Mission Title"
            placeholder="Mission Title"
            value={inputTitle}
            onChange={(e) => {
              setInputTitle(e.target.value);
            }}
          />
          <button
            onClick={() => {
              addMission(Nextid);
            }}
            className="mission-btn"
          >
            Add a mission
          </button>
        </div>
      </div>
    </>
  );
}
