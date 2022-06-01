import './App.css';

import { Link, Outlet } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header></Header>
      <Outlet />
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/">Home</Link> |{" "}
        <Link to="/invoices">Invoices</Link> |{" "}
        <Link to="/expenses">Expenses</Link>
      </nav>
      <Footer></Footer>
    </>
  );
}

export default App;
