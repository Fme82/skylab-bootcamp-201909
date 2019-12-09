import React from 'react'
import './index.sass'
import Feedback from '../Feedback'
import { Link } from 'react-router-dom'

export default function ({ onCreateClass, error}) {
    return <section className="view reg _hide">
        <form onSubmit={function (event) {
            event.preventDefault()

            const { className: { value: className } } = event.target

            onCreateClass(className)
        }}> 
                
            <div className="body-register">
                <img className='body-register__image' src="../images/logo.jpg"/>
                <form className="register__form">
                <h1 className="register__title">CREATE CLASS</h1>
                <input className="register__input" type="text" name="className" placeholder="name" />
                <button className="register__button">ENTER</button>
                <Link to="/board" className="register__button">GO BACK</Link>
                </form> 
            </div>
        </form>
        {error && <Feedback message={error} />}
    </section>
}