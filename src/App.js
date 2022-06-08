import './App.css';

import { Link, Outlet } from 'react-router-dom';
import { logout, selectUserName } from './redux/features/authentication/authenticationSlice';
import { useDispatch, useSelector } from 'react-redux';

import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  const userName = useSelector(selectUserName);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <>
      <Header />
      <Outlet />
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/">Home</Link> |{" "}
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link> |{" "}
        <Link to="/profile">Profile</Link> |{" "}
        {!userName && <Link to="/login">Login</Link>}
      </nav>
      {userName && <button onClick={handleLogout}>Logout</button>}
      <Footer />
    </>
  );
}

export default App;
