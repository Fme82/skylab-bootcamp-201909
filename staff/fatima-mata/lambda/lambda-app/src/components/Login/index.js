import React from 'react'
import './index.sass'
import Feedback from '../Feedback'
import { Link } from 'react-router-dom'

export default function ({ onLogin, error }) {
    return <section className="view log">
        <div className="body">
            <img className='body__image' src="../images/logo.jpg" />
            <section className='login'>
                <form className="login__form" onSubmit={function (event) {
                    event.preventDefault()

                    const { username: { value: username }, password: { value: password } } = event.target

                    onLogin(username, password)
                }}>
                    <h1 className="login__title">LOGIN</h1>
                    <input className="login__input" type="text" placeholder="Username" name="username" autoFocus />
                    <input className="login__input" type="password" placeholder="Password" name="password" />
                    <button className="login__button">ENTER</button>
                    <Link to="/register" className="login__button">REGISTER</Link>
                </form>
            </section>
        </div>
        {error && <Feedback message={error} />}
    </section>
}


