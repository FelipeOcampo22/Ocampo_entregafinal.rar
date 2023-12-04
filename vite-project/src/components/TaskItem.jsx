import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { BiSolidCheckCircle } from "react-icons/bi";
import { BiBlock } from "react-icons/bi";

const TaskItem = ({ task, handleCompleteTask, handleDeleteTask }) => {
  const [completed, setCompleted] = useState(task.completed);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const confirmDeletion = () => {
    const isConfirmed = window.confirm(
      "¿Estas seguro que deseás eliminar esta tarea?"
    );
    setConfirmDelete(isConfirmed); 
  };

  const handleComplete = () => {
    setCompleted(!completed);
    handleCompleteTask(task.id); 
  };

  useEffect(() => {
    if (confirmDelete) {
      handleDeleteTask(task.id); 
    }
  }, [confirmDelete, handleDeleteTask, task.id]);

  return (
    <div style={{ textDecoration: completed ? "line-through" : "none" }}>
      <li>{task.name}</li>
      <button
        className="btn"
        title="Marcar como completada"
        onClick={handleComplete}>
        <BiSolidCheckCircle />
      </button>
      <button className="btn" title="Eliminar" onClick={confirmDeletion}>
        <BiBlock/>
      </button>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  handleCompleteTask: PropTypes.func.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
};

export default TaskItem;
