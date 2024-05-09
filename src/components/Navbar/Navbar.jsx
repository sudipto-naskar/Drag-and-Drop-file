import React from 'react';
import './Navbar.css';
import { Link } from 'react-scroll';
import Plant from '../../images/plant.png';

const Navbar = () => {
  return (
    <nav>
      <ul class='nav-bar'>
        <li class='logo'><a href='/'><img src={Plant} alt='' /></a></li>
        <div class="menu">
          <ul style={{ listStyleType: 'none' }}>

            <Link spy={true} to='Home' smooth={true} activeClass='activeClass'>
              <li>Home</li>
            </Link>
            <Link spy={true} to='Output' smooth={true}>
              <li>Output</li>
            </Link>
            <Link spy={true} to='Team' smooth={true}>
              <li>Our Team</li>
            </Link>
          </ul>
        </div>
      </ul>
    </nav>
  )
}

export default Navbar