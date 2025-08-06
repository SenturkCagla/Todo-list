import { useState } from 'react';
import './App.css';
import TaskPopup from './TaskPopup';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);

  function addTask() {
    setTasks([...tasks, { id: tasks.length + 1, title: `Task ${tasks.length + 1}` }]);
    triggerAnimation();
  }

  function triggerAnimation() {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  }

  function openPopup(id) {
    const task = tasks.find(t => t.id === id);
    setInputValue(task ? task.title : "");
    setActiveTaskId(id);
    setShowPopup(true);
  }

  function closePopup() {
    setShowPopup(false);
    setActiveTaskId(null);
    setInputValue("");
  }

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function saveTask() {
      setTasks(tasks.map(task =>
        task.id === activeTaskId ? { ...task, title: inputValue } : task
      ));
      closePopup();
    
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
    closePopup();
  }
function toggleCompleted(id) {
  setTasks(tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  ));
  closePopup();
}


  return (
    <>
      <div className="container">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`task_box ${task.completed ? "completed" : ""}`}
            onClick={() => openPopup(task.id)}
          >
            <div className="task">{task.title}</div>
          </div>
        ))}

        <div
          className={`add_box ${isAnimating ? "animate" : ""}`}
          onClick={()=>{
            const newTAskId = tasks.length + 1;
            addTask();
            openPopup(newTAskId);
            triggerAnimation
          } }
            
        >
          <button>+</button>
        </div>
      </div>

      <TaskPopup
        visible={showPopup}
        onClose={closePopup}
        inputValue={inputValue}
        onChange={handleChange}
        onDelete={deleteTask}
        onToggleCompleted={toggleCompleted}
        taskId={activeTaskId}
        onSaveTask={saveTask}
      />
    </>
  );
}

export default App;
