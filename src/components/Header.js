import { useContext } from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../store/authContext";
import logo from "../assets/logo-icon.png";
import styles from "./Header.module.css";

const Header = () => {
  const authCtx = useContext(AuthContext);

  const styleActiveLink = ({ isActive }) => {
    return {
      color: isActive ? "#f57145" : "",
    };
  };

  return (
    <header className={`${styles.header} flex-row`}>
      <div className="flex-row">
        <img src={logo} alt="dm-logo" className={styles.logo} />
        <h2>Expense Tracker</h2>
      </div>
      <nav>
        {authCtx.token ? (
          <ul className={styles.main_nav}>
            <li>
              <NavLink style={styleActiveLink} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink style={styleActiveLink} to="tracker">
                Tracker
              </NavLink>
            </li>
            <li>
              <NavLink style={styleActiveLink} to="statement">
                Statement
              </NavLink>
            </li>
            <li>
              <button
                className={styles.logout_btn}
                onClick={() => authCtx.logout()}
              >
                Logout
              </button>
            </li>
          </ul>
        ) : (
          <ul className={styles.main_nav}>
            <li>
              <NavLink style={styleActiveLink} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink style={styleActiveLink} to="/signin">
                Sign In
              </NavLink>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
