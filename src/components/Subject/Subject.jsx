import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Subject.css';

function Subject({ id, title, semester, onDelete }) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = () => {
    onDelete(id);
    setShowConfirmation(false);
  };

  return (
    <div className="subject">
      <Link to={`/subject/` + id}>
        <div className="subject__image">
          <p className="subject__percent">Выполнено: 10%</p>
        </div>
        <p className="subject__semester">{semester}</p>
        </Link>
        <div className="subject__container">
          <p className="subject__name">{title}</p>
          <button className="subject__delete" onClick={() => setShowConfirmation(true)}>&#128465;</button>
        </div>
      {showConfirmation && (
        <div className="confirmation-popup">
          <p>Вы действительно хотите удалить эту карточку?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={() => setShowConfirmation(false)}>No</button>
        </div>
      )}
    </div>
  )
}

export default Subject
