import React from 'react';
import { Link } from 'react-router-dom';
import Task from '../Task/Task';
import logo from '../../images/logo.svg';
import './SubjectDetails.css';

const TaskDataModule1 = [
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

const TaskDataModule2 = [
  {
    id: 1,
    title: "Лабораторная работа №4",
  },
  {
    id: 2,
    title: "Лабораторная работа №5",
  },
  {
    id: 3,
    title: "Лабораторная работа №6",
  },
  {
    id: 4,
    title: "Домашняя работа №2",
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
      <div className="decor5"></div>
      <div className="decor6"></div>
      <div className="decor7"></div>
      <div className="decor8"></div>
      <div className="subject__list">
        <h2 className="subject__module">Модуль 1</h2>
        {TaskDataModule1.map((subject) => (
          <Task
            key={subject.id}
            id={subject.id}
            title={subject.title}
          />
        ))}
      </div>
      <div className="subject__list">
        <h2 className="subject__module">Модуль 2</h2>
        {TaskDataModule2.map((subject) => (
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
