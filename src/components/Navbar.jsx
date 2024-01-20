import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar.css'

const Navbar = (props) => {
  let menu;
  if(props.username == ''){
    menu = (
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    
    )
  }
  else{
    menu = (
      <li><Link to="/account">Account</Link></li>
    );
  }
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cars">Cars</Link>
        </li>
        {menu}
        {/* <li>
          <Link to="/rentals">Rentals</Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navbar;
