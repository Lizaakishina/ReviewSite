import React from 'react';
import { Link } from 'react-router-dom';
import './Task.css';

const Task = ({ id, title }) => {
  return (
    <section className="task">
      <Link to={`/task/` + id}>
        <p className="task__name">{title}</p>
      </Link>
      <div className="task__box"></div>
    </section>
  )
}

export default Task
