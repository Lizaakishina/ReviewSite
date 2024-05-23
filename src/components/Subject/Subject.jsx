import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Subject.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';

function Subject({ id, title, semester, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    setIsTeacher(currentUser.is_teacher);
  }, [currentUser])

  return (
    <div className="subject">
      <Link to={`/subject/` + id}>
        <div className="subject__image">
          {!isTeacher && (
            <p className="subject__percent">Выполнено: 10%</p>
          )}
        </div>
        <p className="subject__semester">{`${semester} семестр`}</p>
      </Link>
      <div className="subject__container">
        <Link to={`/subject/` + id}>
          <p className="subject__name">{title}</p>
        </Link>
        {isTeacher && (
          <button className="subject__delete" onClick={() => setShowConfirmation(true)}>&#128465;</button>
        )}
      </div>
      {showConfirmation && (
        <div className="confirmation-popup">
          <p>Вы действительно хотите удалить эту карточку?</p>
          <button onClick={() => onDelete(id)}>Yes</button>
          <button onClick={() => setShowConfirmation(false)}>No</button>
        </div>
      )}
    </div>
  )
}

export default Subject
