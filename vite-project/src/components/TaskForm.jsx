import { useState } from "react";
import PropTypes from "prop-types";
import { BiListCheck } from "react-icons/bi";

const TaskForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState("");

  const handleInputChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (taskName.trim() === "") return; 

    addTask({ id: new Date().getTime(), name: taskName, completed: false });
    setTaskName(""); 
  };

  return (
    <div>
      <h2 className="subtitle">INGRESE UNA TAREA</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="INGRESE SU TAREA"
          maxLength={200}
          value={taskName}
          onChange={handleInputChange}
        />
        <button className="btn" title="Agregar tarea" type="submit">
        <BiListCheck />
        </button>
      </form>
    </div>
  );
};


TaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default TaskForm;

