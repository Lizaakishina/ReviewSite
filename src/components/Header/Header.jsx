import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import chel from '../../images/chel.svg';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__nav">
        <div className="header__nav header__nav_type_acс">
          <NavLink to="/users/me" className="link header__link_type_acc">Аккаунт</NavLink>
          <div className="header__chelbox">
            <img src={chel} className="header__chel" alt='человечек'/>
          </div>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
