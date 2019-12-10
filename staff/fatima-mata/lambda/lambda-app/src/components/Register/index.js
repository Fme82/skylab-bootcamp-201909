import React from 'react'
import './index.sass'
import Feedback from '../Feedback'
import { Link } from 'react-router-dom'

export default function ({ onRegister, error }) {
    return <section className="view reg _hide">


        <div className="body-register">
            <img className='body-register__image' src="../images/logo.jpg" />
            <form className="register__form" onSubmit={function (event) {
                event.preventDefault()

                const { name: { value: name }, surname: { value: surname }, email: { value: email }, username: { value: username }, password: { value: password } } = event.target

                onRegister(name, surname, email, username, password)
            }}>
                <h1 className="register__title">REGISTER</h1>
                <input className="register__input" type="text" name="name" placeholder="Name" />
                <input className="register__input" type="text" name="surname" placeholder="Surname" />
                <input className="register__input" type="email" name="email" placeholder="e-mail" />
                <input className="register__input" type="username" name="username" placeholder="Username" />
                <input className="register__input" type="password" name="password" placeholder="Password" />
                <button className="register__button">ENTER</button>
                <Link to="/login" className="register__button">GO BACK</Link>
            </form>
        </div>
        {error && <Feedback message={error} />}
    </section>
}