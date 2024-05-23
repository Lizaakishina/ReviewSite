import { React, useCallback, useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Task from '../Task/Task';
import Fieldset from '../Fieldset/Fieldset';
import logo from '../../images/logo.svg';
import './SubjectDetails.css';
import { useValidation } from '../../hook/useValidation';
import { CurrentUserContext } from '../../context/CurrentUserContext';

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
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid } = useValidation();
  const [tasksModule1, setTasksModule1] = useState(TaskDataModule1);
  const [tasksModule2, setTasksModule2] = useState(TaskDataModule2);
  const [selectedModule, setSelectedModule] = useState('Module1');
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    setIsTeacher(currentUser.is_teacher);
  }, [ currentUser])

  const handleAddTask = useCallback((e) => {
    e.preventDefault();

    const newTask = {
      id: tasksModule1.length + tasksModule2.length + 1,
      title: values.name,
    };

    if (selectedModule === 'Module1') {
      setTasksModule1((prevTasks) => [...prevTasks, newTask]);
    } else if (selectedModule === 'Module2') {
      setTasksModule2((prevTasks) => [...prevTasks, newTask]);
    }

    onSubmit({
      course_id: values.course_id,
      name: values.name,
      text: values.text,
      language: values.language
    });
  }, [values, tasksModule1, tasksModule2, selectedModule, onSubmit]);


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
      {isTeacher && (
      <form className="subject__form form" onSubmit={handleAddTask} noValidate method="post">
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
          <select className="form__select" value={selectedModule} onChange={(e) => setSelectedModule(e.target.value)}>
            <option value="Module1">Модуль 1</option>
            <option value="Module2">Модуль 2</option>
          </select>
          <button type="submit" className="subject__button">Добавить задание</button>
        </form>
        )}
        <div className="subject__container">
          <h2 className="subject__module">Модуль 1</h2>
        </div>
        {tasksModule1.map((subject) => (
          <Task
            key={subject.id}
            id={subject.id}
            title={subject.title}
          />
        ))}
      </div>
      <div className="subject__list">
        <h2 className="subject__module">Модуль 2</h2>
        {tasksModule2.map((subject) => (
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
