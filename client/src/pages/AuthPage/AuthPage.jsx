import React, {useState, useContext} from 'react'
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import {AuthContext} from '../../context/AuthContext'
import axios from 'axios'
import './AuthPage.scss'

const AuthPage = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const {login} = useContext(AuthContext)
  const changeHandler = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
    // console.log(`${e.target.name}: ${e.target.value}`)
  }
  const registerHandler = async () => {
    try {
      await axios.post('/api/auth/registration', {...form}, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => console.log(response))
    } catch (error) {
      console.error(error)
    }        
  }
  const loginHandler = async () => {
    try {
      await axios.post('/api/auth/login', {...form}, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        login(response.data.token, response.data.userId)
      })
    } catch (error) {
      console.error(error)
    }        
  }

  return (
    <BrowserRouter>
      <Switch>
        <div className="container">
          <div className="auth-page">
            <Route path='/login'>
              <h3 className="title-form">Авторизация</h3>
              <form className="form form-login" onSubmit={e => e.preventDefault()}>
                <div className="row">
                  <div className="input-field col s12">
                    <input 
                      type="email" 
                      name="email" 
                      className="validate" 
                      onChange={changeHandler} 
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="input-field col s12">
                    <input 
                      type="password" 
                      name="password" 
                      className="validate"
                      onChange={changeHandler} 
                    />
                    <label htmlFor="password">Пароль</label>
                  </div>
                </div>
                <div className="row">
                  <button 
                    className="btn blue wawes-effect wawes-light"
                    onClick={loginHandler}
                  >
                    Войти
                  </button>
                  <Link to="/registration" className="btn-outline btn-reg">Нет аккаунта?</Link>
                </div>
              </form>
            </Route>
            <Route path='/registration'>
              <h3 className="title-form">Регистрация</h3>
              <form className="form form-login" onSubmit={e => e.preventDefault()}>
                <div className="row">
                  <div className="input-field col s12">
                    <input 
                      type="email" 
                      name="email" 
                      className="validate" 
                      onChange={changeHandler} 
                    />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="input-field col s12">
                    <input 
                      type="password" 
                      name="password" 
                      className="validate"
                      onChange={changeHandler} 
                    />
                    <label htmlFor="password">Пароль</label>
                  </div>
                </div>
                <div className="row">
                  <button 
                    className="btn blue wawes-effect wawes-light"
                    onClick={registerHandler}
                  >
                    Зарегистрироваться
                  </button>
                  <Link to="/login" className="btn-outline btn-reg">Уже есть аккаунт?</Link>
                </div>
              </form>
            </Route>
          </div>
        </div>
      </Switch>
    </BrowserRouter>
  )
}

export default AuthPage
