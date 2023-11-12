import React from 'react';
import { Link } from 'react-router-dom';
import './Subject.css';

function Subject({ id, title, semester }) {
  return (
    <div className="subject">
      <Link to={`/subject/` + id}>
        <div className="subject__image">
          <p className="subject__percent">Выполнено: 10%</p>
        </div>
        <p className="subject__semester">{semester}</p>
        <p className="subject__name">{title}</p>
      </Link>
    </div>
  )
}

export default Subject
