import { withRouter } from 'react-router-dom';
import './PageNotFound.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

const PageNotFound = ({history}) => {
  const handleClick = () => {
    history.goBack();
  }

  return (
    <main>
      <section className="pageNotFound">
        <h2 className="pageNotFound__title">404</h2>
        <p className="pageNotFound__subtitle">Страница не найдена</p>
        <NavLink to="/auth/jwt/login">
          <button className="button pageNotFound__link" to="/auth/jwt/login" onClick={handleClick}>Назад</button>
        </NavLink>
      </section>
    </main>
  )
}

export default withRouter(PageNotFound)
