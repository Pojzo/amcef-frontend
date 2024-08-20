import { useEffect, useState } from "react";
import Login from "./auth/Login";
import Register from "./auth/Register";

import './styles.css';
import LoginStatus from "./auth/LoginStatus";
import useCheckLoggedin from "./hooks/useCheckLoggedIn";
import useLogout from "./hooks/useLogout";

const elementMap = {
  login: Login,
  register: Register
}

const App = () => {
  const [currentPage, setCurrentPage] = useState<(keyof typeof elementMap)>("login");

  const CurrentComponent = elementMap[currentPage];

  const handleRegisterButtonClick = () => {
    setCurrentPage("register");
  }

  const handleLoginButtonClick = () => {
    setCurrentPage("login");
  }
  const { isLoggedIn, checkLoggedIn } = useCheckLoggedin();

  const onLoginStatusChanged = async () => {
    await checkLoggedIn();
  }

  const { logout } = useLogout();
  const handleLogoutButtonClick = async () => {
    await logout();
    console.log(isLoggedIn);
    await checkLoggedIn();
    console.log(isLoggedIn);
  }

  useEffect(() => {
    checkLoggedIn();
  }, [isLoggedIn, checkLoggedIn])

  return (
    <div className="App">
      <LoginStatus isLoggedIn={isLoggedIn} />
      <div className="nav-buttons">
        <button className="nav-button" type="button" onClick={handleRegisterButtonClick}><p style={{ color: 'white' }}>Go to register</p></button>
        <button className="nav-button" type="button" onClick={handleLoginButtonClick}><p style={{ color: 'white' }}>Go to login</p></button>
        <button className="nav-button" style={{ backgroundColor: 'red' }} type="button" onClick={handleLogoutButtonClick}><p style={{ color: 'white' }}>Logout</p></button>
      </div>
      <CurrentComponent onChange={onLoginStatusChanged} />
    </div>
  );
}

export default App;
