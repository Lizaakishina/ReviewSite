import { React, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Task from '../Task/Task';
import Fieldset from '../Fieldset/Fieldset';
import logo from '../../images/logo.svg';
import './SubjectDetails.css';
import { useValidation } from '../../hook/useValidation';

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

const SubjectDetails = ({onSubmit}) => {
  const { values, handleChange, errors, isValid } = useValidation();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    onSubmit({
      course_id: values.course_id,
      name: values.name,
      text: values.text,
      language: values.language
    })
  }, [values]);

  return (
    <section className="subjectDetails">
      <Link to="/users/me" className="link subjectDetails__linkLogo">
        <img src={logo} alt='логотип' />
        <p className="subjectDetails__text">&larr;</p>
        <p className="subjectDetails__text">Назад</p>
      </Link>
      <div className="decor5"></div>
      <div className="decor6"></div>
      <div className="decor7"></div>
      <div className="decor8"></div>
      <div className="subject__list">
        <div className="subject__container">
          <h2 className="subject__module">Модуль 1</h2>
          <form className="subject__form form" onSubmit={handleSubmit} noValidate method="post">
          <Fieldset
            input = "name"
            inputType = "name"
            placeholder = "Название задания"
            name="name"
            minLength="4"
            maxLength="40"
            onChange={handleChange}
            errors={errors}
            isValid={isValid}
          />
          <Fieldset
            input = "language"
            inputType = "language"
            placeholder = "language"
            name="language"
            minLength="4"
            maxLength="40"
            onChange={handleChange}
            errors={errors}
            isValid={isValid}
          />
          <Fieldset
            input = "text"
            inputType = "text"
            placeholder = "text"
            name="text"
            minLength="4"
            maxLength="40"
            onChange={handleChange}
            errors={errors}
            isValid={isValid}
          />
          <Fieldset
            input = "course_id"
            inputType = "course_id"
            placeholder = "course_id"
            name="course_id"
            minLength="1"
            maxLength="40"
            onChange={handleChange}
            errors={errors}
            isValid={isValid}
          />
          <button type="submit" className="subject__button">Добавить задание</button>
        </form>
        </div>
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
