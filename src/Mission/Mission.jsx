import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Mission.css";
import { useState } from "react";
export default function Mission({
  title,
  id,
  isCompleted,
  onToggleComplete,
  deleteMission,
  editMission,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  return (
    <>
      <div className="mission">
        <div className="mission-title">
          {isEditing ? (
            <div>
              <input
                className="edit-input"
                placeholder="Edit Mission Title"
                value={newTitle}
                onChange={(e) => {
                  setNewTitle(e.target.value);
                }}
              ></input>
              <div className="edit-btns">
                <button
                  onClick={() => {
                    editMission(id, newTitle);
                    setIsEditing(false);
                  }}
                  className="edit-btn"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setNewTitle(title);
                    setIsEditing(false);
                  }}
                  className="cancel-btn"
                >
                  cancel
                </button>
              </div>
            </div>
          ) : (
            <h3 className={isCompleted ? "mission-completed" : ""}>{title}</h3>
          )}
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              onToggleComplete(id);
            }}
            className={`btn-check ${isCompleted ? "is-complete" : ""}`}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button
            onClick={() => {
              setIsEditing(true);
            }}
            className="btn-edit"
          >
            <FontAwesomeIcon icon={faPen} />
          </button>
          <button
            onClick={() => {
              deleteMission(id);
            }}
            className="btn-delete"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </>
  );
}
