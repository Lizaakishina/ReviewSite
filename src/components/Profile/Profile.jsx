import { memo, useContext, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import Header from "../Header/Header";
import Subject from '../Subject/Subject';
import Fieldset from '../Fieldset/Fieldset';
import './Profile.css';
import '../Main/Main.css';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useValidation } from '../../hook/useValidation';

const subjectData = [
  {
    id: 1,
    title: "Технологии и методы программирования",
    semester: "2 семестр",
  },
  {
    id: 2,
    title: "Электроника аппаратных средств защиты информации",
    semester: "4 семестр",
  },
  {
    id: 3,
    title: "Схемотехника дискретных устройств",
    semester: "4 семестр",
  },
  {
    id: 4,
    title: "Схемотехника аппаратных средств защиты информации",
    semester: "5 семестр",
  },
  {
    id: 5,
    title: "Основы микро- и радиоэлектроники",
    semester: "5 семестр",
  },
]

const Profile = ({onSignOut, onSubmit}) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useValidation();

  useEffect(() => {
    resetForm(currentUser);
  }, [resetForm, currentUser])

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    onSubmit({
      id: values.id,
      name: values.name,
      teacher_id: values.teacher_id
    })
  }, [values]);

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
          <form className="profile__form form" onSubmit={handleSubmit} noValidate method="post">
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
          <button type="submit" className="profile__addcourse">Добавить курс</button>
        </form>
        </section>
        <section className="subjects">
          {subjectData.map((subject) => (
            <Subject
              key={subject.id}
              id={subject.id}
              title={subject.title}
              semester={subject.semester}
            />
          ))}
        </section>
      </main>
    </>
  )
}

export default memo(Profile)
