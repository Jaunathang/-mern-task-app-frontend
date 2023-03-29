import React from 'react'
import { FaEdit, FaCheckDouble, FaTrashAlt } from 'react-icons/fa';

function Task({ task, index, deleteTask, getSingleTask, setToComplete }) {
  return (
    <div className={task.completed ? 'task completed' : 'task'}>
      <p>
        <b>{index + 1}. </b>
        {task.name}
      </p>
      {/* Little challenge -> Use emmet !! :) */}
      <div className='task-icons'>
        <FaCheckDouble color='green' onClick={() => setToComplete(task)} />
        <FaEdit color='purple' onClick={() => getSingleTask(task)} />
        <FaTrashAlt color='red' onClick={() => deleteTask(task._id)} />
      </div>
    </div>
  )
}

export default Task