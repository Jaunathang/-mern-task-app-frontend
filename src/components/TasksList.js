import React, { useEffect, useState } from 'react';
import Task from './Task';
import TaskForm from './TaskForm';
import { toast } from 'react-toastify';
import axios from 'axios';
import { SERVER_URL } from '../App';
import loadingGif from '../assets/loader.gif';

function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    completed: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${SERVER_URL}/api/tasks`);
      setTasks(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  const createTask = async (event) => {
    event.preventDefault();
    if (formData.name === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
      await axios.post(`${SERVER_URL}/api/tasks`, formData);
      // TODO Make initial object
      setFormData({ ...formData, name: "" });
      getTasks();
      toast.success("Task added sucessfully!");
    } catch (error) {
      toast.error(error.message);
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${SERVER_URL}/api/tasks/${id}`);
      //Reload the tasks list! :)
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  }

  const getSingleTask = async (task) => {
    setFormData({
      name: task.name,
      completed: false
    });
    setTaskId(task._id);
    setIsEditing(true);
  }

  const updateTask = async (event) => {
    event.preventDefault();
    if (formData.name === "") {
      return toast.error("Input field cannot be empty");
    }
    try {
      await axios.put(`${SERVER_URL}/api/tasks/${taskId}`, formData);
      setFormData({ ...formData, name: "" });
      setIsEditing(false);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  }

  const setToComplete = async (task) => {
    // TODO There is a bit of repetition here. Flow to be reviewed.
    const newFormData = {
      name: task.name,
      completed: true
    };
    try {
      await axios.put(`${SERVER_URL}/api/tasks/${task._id}`, newFormData);
      getTasks();
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    setCompletedTasks(tasks.filter(task => task.completed));
  }, [tasks]);

  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm name={formData.name} handleInputChange={handleInputChange} createTask={createTask} isEditing={isEditing} updateTask={updateTask} />
      <div className='--flex-between --pb'>
        <p>
          <b>Total Tasks:</b> {tasks.length}
        </p>
        <p>
          <b>Completed Tasks:</b> {completedTasks.length}
        </p>
      </div>
      <hr />
      {isLoading && (
        <div className='--flex-center'>
          <img src={loadingGif} alt="loading animation" />
        </div>
      )}
      {!isLoading && tasks.length === 0 ?
        (<p className='--py'>No task found.</p>) :
        (<>
          {tasks.map((task, index) => {
            return (
              <Task key={task._id} task={task} index={index} deleteTask={deleteTask} getSingleTask={getSingleTask} setToComplete={setToComplete} />
            );
          })}
        </>)
      }
    </div>
  )
}

export default TasksList