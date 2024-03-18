//компоненты сайта
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import SubjectDetails from '../SubjectDetails/SubjectDetails';
import TaskDetails from '../TaskDetails/TaskDetails';
import PageNotFound from '../PageNotFound/PageNotFound';
import Preloader from '../Preloader/Preloader';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
//реакт
import { useEffect, useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
//контексты и утилиты
import { CHECKBOX, REGISTER_ERROR_MESSAGE } from '../../utils/constants';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { LoginContext } from '../../context/LoginContext';
import { login, logout, register, getUser, updateUser } from '../../utils/api';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const App = (history) => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({id: '', username: '', email: ''});
  const [isLoaderPage, setIsLoaderPage] = useState(true);
  const [isLoader, setIsLoader] = useState(false);
  const [errorMessageApi, setErrorMessageApi] = useState('');
  const [isButtonInactive, setIsButtonInactive] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem('accessToken');
    if (token) {
      handleGetUser(token);
    } else {
      handleSignOut();
      setIsLoaderPage(false);
    }
  }, []);

  useEffect(() => {
    if(loggedIn) {
      handleGetUser(localStorage.getItem('accessToken'))
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
      const user = await getUser();
      setCurrentUser({id: user.id, name: user.name, email: user.email});
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

  const handleGetUser = async () => {
    try {
      const user = await getUser();
      if (user.email) {
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

  const handleUpdateUser = async ({password, email, is_active, is_superuser, is_verified, username, first_name, last_name, is_teacher}) => {
    try {
      setIsLoader(true);
      const user = await updateUser({password, email, is_active, is_superuser, is_verified, username, first_name, last_name, is_teacher});
      setCurrentUser({password: user.password, email: user.email, is_active: user.is_active, is_superuser: user.is_superuser, is_verified: user.is_verified, username: user.username, first_name: user.first_name, last_name: user.last_name, is_teacher: user.is_teacher});
    } catch (error) {
      error.statusCode === 409 ? setErrorMessageApi(error.message) : setErrorMessageApi(error.message);
    } finally {
      setIsLoader(false);
    }
  }

  const handleSignOut = async ({id, username, password}) => {
    localStorage.removeItem('accessToken');
    logout({id, username, password});
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
              <Redirect push to="/auth/jwt/login"></Redirect>
            </Route>
            <ProtectedRoute
              path="/users/me"
              component={Profile}
              onSignOut={handleSignOut}
              onUpdateUser={handleUpdateUser}>
            </ProtectedRoute>
            <Route path="/auth/register">
              <Register
                onSubmit={handleRegister}
                errorMessageApi={errorMessageApi}
                isLoader={isLoader}
                isButtonInactive={isButtonInactive}/>
            </Route>
            <Route exact path="/auth/jwt/login">
              <Login
                onSubmit={handleLogin}
                errorMessageApi={errorMessageApi}
                isLoader={isLoader}
                isButtonInactive={isButtonInactive}/>
            </Route>
            <Route path="/subject/:id" render={() =>
              <SubjectDetails />
            }>
            </Route>
            <Route path="/task/:id" render={() =>
              <TaskDetails />
            }>
            </Route>
            <Route path="*">
              <PageNotFound />
            </Route>
          </Switch>
        </LoginContext.Provider>
      </CurrentUserContext.Provider>)
    )
  }

export default withRouter(App)
