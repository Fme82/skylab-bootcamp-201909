import React from 'react'
import './index.sass'

export default function({ onRegister, onLogin }) {
    return <section className="view land">
        <div className="body">
            <img className='body__image' src="../images/logo.jpg" />
            <h1 className="landing__title">Welcome to Lambda App</h1>
            <p className="landing__text">Please, proceed to </p>
            <a className="landing__button" href="" onClick={event => { event.preventDefault(); onRegister() }}>Register</a>  
            <a className="landing__button" href="" onClick={event => { event.preventDefault(); onLogin() }}>Login</a>.
        </div>
    </section>
}


