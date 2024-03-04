import { memo, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext';
import chel from '../../images/chel.svg';
import './Header.css';

const Header = () => {
  const loggedIn = useContext(LoginContext);

  return (
    <header className="header">
      {loggedIn? <>
          <div className="header__nav">
            <div className="header__nav header__nav_type_acс">
              <NavLink to="/users/me" className="link header__link_type_acc">Аккаунт</NavLink>
              <div className="header__chelbox">
                <img src={chel} className="header__chel" alt='человечек'/>
              </div>
            </div>
          </div>
        </>
        :<>
          <div className="header__nav">
            <Link to="/auth/register" className="link header__link">Регистрация</Link>
            <Link to="/auth/jwt/login" className="link header__link header__link_type_signin">Войти</Link>
          </div>
        </>
      }
    </header>
  )
}

export default memo(Header)
