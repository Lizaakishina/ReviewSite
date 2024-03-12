import Header from "../Header/Header";
import Subject from '../Subject/Subject';
import './Profile.css';
import '../Main/Main.css';
import { memo, useCallback, useContext, useEffect } from "react";
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useValidation } from '../../hook/useValidation';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

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

const Profile = ({onSignOut, onUpdateUser, isButtonInactive}) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useValidation();
  const isButtonActive = (isValid && (currentUser.username !== values.username || currentUser.email !== values.email));

  useEffect(() => {
    resetForm(currentUser);
  }, [resetForm, currentUser])

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onUpdateUser({
      id: 0,
      email: values.email,
      is_active: true,
      is_superuser: false,
      is_verified: false,
      username: values.username,
      first_name: values.first_name,
      last_name: values.last_name,
      is_teacher: true
    });
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
          <h2 className="profile__hello">Привет, {currentUser.username}!</h2>
          <NavLink to='/auth/jwt/login'>
            <button type="button" className="button profile__exit" onClick={onSignOut}>Выйти из аккаунта</button>
          </NavLink>
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
