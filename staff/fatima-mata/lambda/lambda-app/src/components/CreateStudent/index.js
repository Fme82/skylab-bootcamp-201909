import React from 'react'
import './index.sass'
import Feedback from '../Feedback'
import { Link } from 'react-router-dom'

export default function ({ onCreateStudent, error}) {
    return <section className="view reg _hide">
        <form onSubmit={function (event) {
            event.preventDefault()

            const { name: { value: name }, surname: { value: surname }, email: { value: email }, className: { value: className } } = event.target

            onCreateStudent(name, surname, email, className)
        }}> 
                
            <div className="body-register">
                <img className='body-register__image' src="../images/logo.jpg"/>
                <form className="register__form">
                <h1 className="register__title">CREATE STUDENT</h1>
                <input className="register__input" type="text" name="name" placeholder="name" />
                <input className="register__input" type="text" name="surname" placeholder="surname" />
                <input className="register__input" type="email" name="email" placeholder="e-mail" />
                <input className="register__input" type="username" name="classname" placeholder="className" />
                <button className="register__button">ENTER</button>
                <Link to="/classList" className="register__button">GO BACK</Link>
                </form> 
            </div>
        </form>
        {error && <Feedback message={error} />}
    </section>
}