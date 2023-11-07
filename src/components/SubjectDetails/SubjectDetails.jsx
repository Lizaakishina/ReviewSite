import React from 'react';
import { Link } from 'react-router-dom';
import Task from '../Task/Task';
import logo from '../../images/logo.svg';
import './SubjectDetails.css';

const TaskData = [
  {
    id: 1,
    title: "Лабораторная работа №1",
  },
  {
    id: 2,
    title: "Лабораторная работа №2",
  },
  {
    id: 3,
    title: "Лабораторная работа №3",
  },
  {
    id: 4,
    title: "Домашняя работа №1",
  },
]

const SubjectDetails = () => {
  return (
    <section className="subjectDetails">
      <Link to="/profile" className="link subjectDetails__linkLogo">
        <img src={logo} alt='логотип' />
        <p className="subjectDetails__text">&larr;</p>
        <p className="subjectDetails__text">Назад</p>
      </Link>
      <div>
      {TaskData.map((subject) => (
        <Task
          key={subject.id}
          id={subject.id}
          title={subject.title}
        />
      ))}
      </div>
    </section>
  )
}

export default SubjectDetails
