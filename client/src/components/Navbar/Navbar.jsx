import React, {useContext} from 'react'
import {AuthContext} from '../../context/AuthContext'
import './Navbar.scss'

const Navbar = () => {
  const {logout, isLogin} = useContext(AuthContext)
  return (
    <nav>
      <div className="nav-wrapper navbar blue">
        <a href="/" className="brand-logo">MERN ToDo App</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {isLogin
            ? <li><a href="/" onClick={logout}>Выйти</a></li>
            : <li><a href="/">Войти</a></li>
          }
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
