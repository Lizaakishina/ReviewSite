import React from 'react';
import { Link } from 'react-router-dom';
import './Task.css';

const Task = ({ id, title }) => {
  return (
    <Link to={`/task/` + id}>
      <section className="task">
        <p className="task__name">{title}</p>
        <div className="task__box"></div>
      </section>
    </Link>
  )
}

export default Task
