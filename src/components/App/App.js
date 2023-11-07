//компоненты сайта
import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import SubjectDetails from '../SubjectDetails/SubjectDetails.jsx';
import TaskDetails from '../TaskDetails/TaskDetails.jsx';
import PageNotFound from '../PageNotFound/PageNotFound';
import Preloader from '../Preloader/Preloader';
//реакт
import { useEffect, useState } from 'react';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
//контексты и утилиты
import { JWT, CHECKBOX, REGISTER_ERROR_MESSAGE } from '../../utils/constants';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { LoginContext } from '../../context/LoginContext';
import { getUser, login, register } from '../../utils/mainApi';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({_id: '', name: '', email: ''});
  const [isLoaderPage, setIsLoaderPage] = useState(true);
  const [isLoader, setIsLoader] = useState(false);
  const [errorMessageApi, setErrorMessageApi] = useState('');
  const [isButtonInactive, setIsButtonInactive] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(JWT);
    if (token) {
      handleGetUser(token);
    } else {
      handleSignOut();
      setIsLoaderPage(false);
    }
  }, [])

  useEffect(() => {
    if(loggedIn) {
      handleGetUser(localStorage.getItem(JWT))
    } else {

    }
  }, [loggedIn])

  const handleRegister = async ({name, email, password}) => {
    try {
      setIsLoader(true);
      setIsButtonInactive(true);
      //const res = await register({name, email, password});
      handleLogin({email, password});
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

  const handleLogin = async ({email, password}) => {
    try {
      setIsLoader(true);
      setIsButtonInactive(true);
      const res = await login({email, password});
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
      if(user.name) {
        setLoggedIn(true);
        setCurrentUser({_id: user._id, name: user.name, email: user.email});
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
    setCurrentUser({_id: '', name: '', email: ''});
  }

    return (isLoaderPage ? <Preloader /> :
      (<CurrentUserContext.Provider value={currentUser}>
        <LoginContext.Provider value={loggedIn}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/signin" />
            </Route>
            <Route exact path="/profile">
              <Main />
            </Route>
            <Route path="/signup">
              <Register onSubmit={handleRegister} errorMessageApi={errorMessageApi} isLoader={isLoader} isButtonInactive={isButtonInactive}/>
            </Route>
            <Route path="/signin">
              <Login onSubmit={handleLogin} errorMessageApi={errorMessageApi} isLoader={isLoader} isButtonInactive={isButtonInactive}/>
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

  export default withRouter(App);
