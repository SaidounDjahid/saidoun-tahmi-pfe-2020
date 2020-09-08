//css et ui de la barre de nav
import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const navbarCSS = css`
ul.topnav {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
    height: 4.5vh;
  }
  
  ul.topnav li {float: left; cursor: pointer;}
  
  ul.topnav li a {
    display: block;
    color: white;
    text-align: center;
    height: 100%;
    text-decoration: none;
  }

  ul.topnav li:not(.right) a {
    padding: 14px 16px;
  }
  
  ul.topnav li a:hover:not(.active) {background-color: #111;}
  
  ul.topnav li a.active {background-color: #4CAF50;}
  
  ul.topnav li.right {float: right;}
  
  .right a img {
    height: 4.5vh;
    width: auto;
  }


  @media screen and (max-width: 600px) {
    ul.topnav {
      height: 45px;
    }
    .right a img {
      height: 45px;
      width: auto;
    }
  }

`;
// la barre de nav permet d'aller a la page login (login de l'user )
export default function Navbar(props) {
  const { activePage, setPage } = props;
  const navpages = ['home', 'votar', 'admin',];

  return (
    <nav className={navbarCSS}>
      <ul className="topnav">
        <li><a className={activePage === navpages[0] ? 'active' : 'inactive'} onClick={() => setPage('home')} role="button" tabIndex={0}>Accueil</a></li>
        <li><a className={activePage === navpages[1] ? 'active' : 'inactive'} onClick={() => setPage('login')} role="button" tabIndex={0}>Électeur</a></li>
        <li><a className={activePage === navpages[2] ? 'active' : 'inactive'} onClick={() => setPage('adminLogin')} role="button" tabIndex={0}>Administrateur </a></li>
       
       

        <li className="right">
          <a href="https://www.usthb.dz/fr">
            <img src="./images/algerie.png" alt="" />
          </a>
        </li>
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  activePage: PropTypes.string.isRequired,
  setPage: PropTypes.func.isRequired
};
