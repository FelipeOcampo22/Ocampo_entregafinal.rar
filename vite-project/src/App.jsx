import { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Counter from "./components/Counter";
import "./App.css";

function App() {
  
  const initialTasks = window.localStorage.getItem("tasks")
    ? JSON.parse(window.localStorage.getItem("tasks"))
    : [];

  const [tasks, setTasks] = useState(initialTasks);
  const [categories, setCategories] = useState([]); 

  const handleCompleteTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  useEffect(() => {
    
    window.localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("Lista de tareas actualizada en Local Storage:", tasks);
  }, [tasks]);

  useEffect(() => {
    
    const newCategories = [
     
      { name: "TOTAL DE TAREAS", countFunction: () => tasks.length },
      {
        name: "PENDIENTES",
        countFunction: () => tasks.filter((task) => !task.completed).length,
      },
      {
        name: "COMPLETADAS",
        countFunction: () => tasks.filter((task) => task.completed).length,
      },
      
    ];
    setCategories(newCategories);
  }, [tasks]);

  return (
    <>
      <h1 className="title">
         <span className="span-color">Lista de Tareas</span>
      </h1>
      <section className="container">
        <TaskForm addTask={addTask} />
        <TaskList
          tasks={tasks}
          handleCompleteTask={handleCompleteTask}
          handleDeleteTask={handleDeleteTask}
        />
        <section className="counters">
          {categories.map((category) => (
            <Counter
              key={category.name}
              category={category.name}
              countFunction={category.countFunction}
            />
          ))}
        </section>
      </section>
    </>
  );
}

export default App;
