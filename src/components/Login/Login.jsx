import { useCallback, useContext, useEffect } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import { useValidation } from '../../hook/useValidation';
import { LoginContext } from '../../context/LoginContext';
import { EMAIL_PATTERN } from '../../utils/constants';
import Fieldset from '../Fieldset/Fieldset';
import logo from '../../images/logo.svg';
import './Login.css';

const Login = ({history, onSubmit, errorMessageApi, isLoader, isButtonInactive}) => {
  const { values, handleChange, errors, isValid, resetForm } = useValidation();
  const loggedIn = useContext(LoginContext);

  useEffect(() => {
    loggedIn && history.push('/users/me');
  }, [])

  useEffect(() => {
    resetForm();
  }, [loggedIn, resetForm])

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    onSubmit({
      username: values.username,
      password: values.password
    })
  }, [values]);

  return (
    <main>
      <section className="login">
        <img src={logo} className="login__logo login__linkLogo" alt='логотип' />
        <h2 className="login__hello noselect">Рады видеть!</h2>
        <form className="login__form form" onSubmit={handleSubmit} noValidate method="post">
          <Fieldset
            input = "email"
            inputType = "email"
            placeholder = "E-mail"
            pattern={EMAIL_PATTERN}
            name="username"
            minLength="4"
            maxLength="40"
            onChange={handleChange}
            errors={errors}
            isValid={isValid}
          />
          <Fieldset
            input = "password"
            inputType = "password"
            placeholder = "Пароль"
            name="password"
            minLength="4"
            maxLength="50"
            onChange={handleChange}
            errors={errors}
            isValid={isValid}
          />
          <span className={`login__errorMessage ${!!errorMessageApi && "login__errorMessage_active"}`}>{errorMessageApi}</span>
          <button type="submit" className={`form__button ${!isValid && "form__button_inactive"}`} disabled={!isValid && !isButtonInactive}>
            {isLoader ? "Выполняется вход..." : "Войти"}
            <NavLink to="/users/me" className="link header__link_type_acc"></NavLink>
          </button>
        </form>
        <p className="login__ask noselect">Ещё не зарегистрированы? <Link to="/auth/register" className="login__link link">Регистрация</Link></p>
      </section>
    </main>
  )
}

export default withRouter(Login)
