//компоненты сайта
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import SubjectDetails from '../SubjectDetails/SubjectDetails';
import TaskDetails from '../TaskDetails/TaskDetails';
import PageNotFound from '../PageNotFound/PageNotFound';
import Preloader from '../Preloader/Preloader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
//реакт
import { useEffect, useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
//контексты и утилиты
import { JWT, CHECKBOX, REGISTER_ERROR_MESSAGE } from '../../utils/constants';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { LoginContext } from '../../context/LoginContext';
import { getUser, login, register } from '../../utils/api';
import { NavLink, Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({id: '', username: '', email: ''});
  const [isLoaderPage, setIsLoaderPage] = useState(true);
  const [isLoader, setIsLoader] = useState(false);
  const [errorMessageApi, setErrorMessageApi] = useState('');
  const [isButtonInactive, setIsButtonInactive] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem(JWT);
    if (token) {
      handleGetUser(token);
    } else {
      let JWT = 'newlyGeneratedJWT';
      localStorage.setItem('JWT', JWT);
      handleGetUser(JWT);
    }
  }, []);

  useEffect(() => {
    if(loggedIn) {
      handleGetUser(localStorage.getItem(JWT))
    } else {

    }
  }, [loggedIn])

  const handleRegister = async ({email, password, is_active, is_superuser, is_verified, username, first_name, last_name, is_teacher}) => {
    try {
      setIsLoader(true);
      setIsButtonInactive(true);
      const res = await register({email, password, is_active, is_superuser, is_verified, username, first_name, last_name, is_teacher});
      handleLogin({username, password});
    } catch (error) {
      if (error.statusCode === 400) {
        setErrorMessageApi(REGISTER_ERROR_MESSAGE)
      } else if (error.statusCode === 409) {
        setErrorMessageApi(error.message)
      } else {
        setErrorMessageApi(error.message)
      }
      setIsButtonInactive(false);
    } finally {
      setIsLoader(false);
    }
  }

  const handleLogin = async ({username, password}) => {
    try {
      setIsLoader(true);
      setIsButtonInactive(true);
      const res = await login({username, password});
      localStorage.setItem(JWT, res.token);
      const user = await getUser(res.token);
      setCurrentUser({_id: user._id, name: user.name, email: user.email});
      setLoggedIn(true);
    } catch (error) {
      setLoggedIn(false);
      setErrorMessageApi(error.message);
      setIsButtonInactive(false);
      console.log(error);
    } finally {
      setIsLoader(false);
    }
  }

  const handleGetUser = async (token) => {
    try {
      const user = await getUser(token);
      if(user.email) {
        setLoggedIn(true);
        setCurrentUser({id: user.id, email: user.email, is_active: user.is_active, is_superuser: user.is_superuser, is_verified: user.is_verified, username: user.username, first_name: user.first_name, last_name: user.last_name, is_teacher: user.is_teacher});
        setIsLoaderPage(false);
      } else {
        handleSignOut();
      }
    } catch (error) {
      handleSignOut();
      setIsLoaderPage(false);
      console.log(error);
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem(JWT);
    sessionStorage.removeItem(CHECKBOX);
    setLoggedIn(false);
    setIsButtonInactive(false);
    setCurrentUser({id: '', username: '', email: ''});
  }

    return (isLoaderPage ? <Preloader /> :
      (<CurrentUserContext.Provider value={currentUser}>
        <LoginContext.Provider value={loggedIn}>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <ProtectedRoute
              path="/users/me"
              onSignOut={handleSignOut}
              errorMessageApi={errorMessageApi}
              isLoader={isLoader}>
            </ProtectedRoute>
            <Route path="/auth/register">
              <Register
                onSubmit={handleRegister}
                errorMessageApi={errorMessageApi}
                isLoader={isLoader}
                isButtonInactive={isButtonInactive}/>
            </Route>
            <Route path="/auth/jwt/login">
              <Login
                onSubmit={handleLogin}
                errorMessageApi={errorMessageApi}
                isLoader={isLoader}
                isButtonInactive={isButtonInactive}/>
            </Route>
            <ProtectedRoute path="/subject/:id" render={() =>
              <SubjectDetails />
            }>
            </ProtectedRoute>
            <ProtectedRoute path="/task/:id" render={() =>
              <TaskDetails />
            }>
            </ProtectedRoute>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </LoginContext.Provider>
      </CurrentUserContext.Provider>)
    )
  }

export default withRouter(App)
