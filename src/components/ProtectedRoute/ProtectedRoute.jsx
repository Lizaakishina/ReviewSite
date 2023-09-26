import { useContext } from "react"
import { Redirect, Route } from "react-router-dom"
import { LoginContext } from "../../context/LoginContext"


const ProtectedRoute = ({component: Component, ...props}) => {
  const loggedIn = useContext(LoginContext);
  return (
    <Route>
      {() => 
        loggedIn ? <Component {...props} /> : <Redirect to="/"/>
      }
    </Route>
  )
}

export default ProtectedRoute;