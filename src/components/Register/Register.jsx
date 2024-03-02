import { useCallback, useContext, useEffect } from 'react';
import { Link, withRouter} from 'react-router-dom';
import { useValidation } from '../../hook/useValidation';
import { LoginContext } from '../../context/LoginContext';
import { EMAIL_PATTERN } from '../../utils/constants';
import Fieldset from '../Fieldset/Fieldset';
import logo from '../../images/logo.svg';
import './Register.css';

const Register = ({history, onSubmit, errorMessageApi, isLoader, isButtonInactive}) => {
  const { values, handleChange, errors, isValid, resetForm } = useValidation();
  const loggedIn = useContext(LoginContext);

  useEffect(() => {
    loggedIn && history.push('/');
  }, [])

  useEffect(() => {
    resetForm()
  }, [loggedIn, resetForm]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    onSubmit({
      name: values.name,
      email: values.email,
      password: values.password
    })
  }, [values]);

  return (
    <main>
      <section className="register">
        <Link to="/profile" className="link register__linkLogo">
          <img src={logo} className="register__logo" alt='логотип' />
        </Link>
        <h2 className="register__hello noselect">Добро пожаловать!</h2>
        <form className="form register__form" onSubmit={handleSubmit} noValidate>
          <Fieldset
            input = "text"
            inputType = "name"
            placeholder = "Имя"
            name="name"
            minLength="4"
            maxLength="40"
            onChange={handleChange}
            errors={errors}
            isValid={isValid}
          />
          <Fieldset
            input = "email"
            inputType = "email"
            placeholder = "E-mail"
            pattern={EMAIL_PATTERN}
            name="email"
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
            errorMessage="Что-то пошло не так..."
            name="password"
            minLength="8"
            maxLength="50"
            onChange={handleChange}
            errors={errors}
            isValid={isValid}
          />
          <span className={`register__errorMessage ${!!errorMessageApi && "register__errorMessage_active"}`}>{errorMessageApi}</span>
          <button className={`form__button ${!isValid && "form__button_inactive"}`} disabled={!isValid && !isButtonInactive}>
            {isLoader ? "Регистрация" : "Зарегистрироваться"}
          </button>
        </form>
        <p className="register__question noselect">Уже зарегистрированы? <Link to="/auth/jwt/login" className="register__link link">Войти</Link></p>
      </section>
    </main>
  )
}

export default withRouter(Register)
