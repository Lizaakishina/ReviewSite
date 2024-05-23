import { memo, useContext, useEffect, useCallback, useState } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../Header/Header";
import Subject from '../Subject/Subject';
import Fieldset from '../Fieldset/Fieldset';
import './Profile.css';
import '../Main/Main.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useValidation } from '../../hook/useValidation';

let subjectData = [
  {
    id: 1,
    title: "Технологии и методы программирования",
    semester: "2",
  },
  {
    id: 2,
    title: "Электроника аппаратных средств защиты информации",
    semester: "4",
  },
  {
    id: 3,
    title: "Схемотехника дискретных устройств",
    semester: "4",
  },
  {
    id: 4,
    title: "Схемотехника аппаратных средств защиты информации",
    semester: "5",
  },
  {
    id: 5,
    title: "Основы микро- и радиоэлектроники",
    semester: "5",
  },
]

const Profile = ({onSignOut, onSubmit}) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useValidation();
  const [subjects, setSubjects] = useState(subjectData);
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    resetForm(currentUser);
    setIsTeacher(currentUser.is_teacher);
  }, [resetForm, currentUser])

  useEffect(() => {
    const savedCourses = JSON.parse(localStorage.getItem('courses'));
    if (savedCourses) {
      setSubjects(savedCourses);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(subjects));
  }, [subjects]);

  const handleAddSubject = useCallback((e) => {
    e.preventDefault();

    const newSubject = {
      id: subjects.length + 1,
      title: values.name,
      semester: values.semester,
    };

    setSubjects((prevSubjects) => [...prevSubjects, newSubject]);

    onSubmit({
      id: values.id,
      name: values.name,
      teacher_id: values.id
    });
  }, [values, subjects, onSubmit]);

  const handleDeleteSubject = useCallback((id) => {
    setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject.id !== id));
  }, []);

  return (
    <>
      <Header loggedIn={true}/>
      <main>
        <section className="profile">
          <div className="decor1"></div>
          <div className="decor2"></div>
          <div className="decor3"></div>
          <div className="decor4"></div>
          <div className="profile__container">
            <NavLink to='/auth/jwt/login'>
              <button type="button" className="button profile__exit" onClick={onSignOut}>Выйти из аккаунта</button>
            </NavLink>
          </div>
          <h2 className="profile__hello">Привет, {currentUser.username}!</h2>
          {isTeacher && (
          <form className="profile__form form" onSubmit={handleAddSubject} noValidate method="post">
            <Fieldset
              input = "name"
              inputType = "name"
              placeholder = "Название курса"
              name="name"
              minLength="4"
              maxLength="40"
              onChange={handleChange}
              errors={errors}
              isValid={isValid}
            />
            <Fieldset
              input = "semester"
              inputType = "semester"
              placeholder = "Семестр курса"
              name="semester"
              minLength="1"
              maxLength="12"
              onChange={handleChange}
              errors={errors}
              isValid={isValid}
            />
            <button type="submit" className="profile__addcourse">Добавить курс</button>
          </form>
          )}
        </section>
        <section className="subjects">
          {subjects.map((subject) => (
            <Subject
              key={subject.id}
              id={subject.id}
              title={subject.title}
              semester={subject.semester}
              onDelete={handleDeleteSubject}
            />
          ))}
        </section>
      </main>
    </>
  )
}

export default memo(Profile)
