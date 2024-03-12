import Header from "../Header/Header";
import Subject from '../Subject/Subject';
import './Profile.css';
import '../Main/Main.css';
import { memo, useCallback, useContext, useEffect } from "react";
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
          <div className="profile__container">
            <form className="form profile__form" name="profileEdit" onSubmit={handleSubmit} noValidate>
              <fieldset className="profile__flexbox">
                <div className="profile_edit-username">
                  <label htmlFor="name" className="profile__text">Username:</label>
                  <input
                    className="profile__input"
                    placeholder="Введите для изменения"
                    type="text" id="name"
                    name="username"
                    value={values.first_name || currentUser.first_name}
                    minLength="4"
                    maxLength="40"
                    onChange={handleChange}
                    required
                  />
                </div>
                <span className={`form__inputError ${!!errors.username && 'form__inputError_active'}`}>{errors.username}</span>
              </fieldset>
              <div className="profile__line"></div>
              <button className={`button profile__edit ${isButtonActive && "profile__edit_active"}`} disabled={!isButtonActive}>
                {isButtonInactive ? "Сохранение..." : "Редактировать"}
              </button>
            </form>
          </div>
          <button type="button" className="button profile__exit" onClick={onSignOut}>Выйти из аккаунта</button>
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
