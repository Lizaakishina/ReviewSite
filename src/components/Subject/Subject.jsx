import React from 'react';
import { Link } from 'react-router-dom';
import './Subject.css';

function Subject({ id, title }) {
  return (
    <div className="subject">
      <div className="subject__image"></div>
      <Link to={`/subject/` + id}>
        <p className="subject__name">{title}</p>
      </Link>
    </div>
  )
}

export default Subject
