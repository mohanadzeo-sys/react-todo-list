import "./FilterBar.css";
export default function FilterBar({ filter, setFilter }) {
  return (
    <>
      <div className="filter-btns">
        <button
          onClick={() => {
            setFilter("all");
          }}
          className={filter === "all" ? "selected" : ""}
        >
          All
        </button>
        <button
          onClick={() => {
            setFilter("active");
          }}
          className={filter === "active" ? "selected" : ""}
        >
          Active
        </button>
        <button
          onClick={() => {
            setFilter("completed");
          }}
          className={filter === "completed" ? "selected" : ""}
        >
          Completed
        </button>
      </div>
    </>
  );
}
