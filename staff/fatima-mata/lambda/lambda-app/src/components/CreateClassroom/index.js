import React from 'react'
import './index.sass'
import Feedback from '../Feedback'
import { Link } from 'react-router-dom'

export default function ({ onCreateClassroom, error}) {
    return <section className="view reg _hide">
        <form onSubmit={function (event) {
            event.preventDefault()

            const { name: { value: name } } = event.target

            onCreateClassroom(name)
        }}> 
                
            <div className="body-register">
                <img className='body-register__image' src="../images/logo.jpg"/>
                <form className="register__form">
                <h1 className="register__title">CREATE CLASS</h1>
                <input className="register__input" type="text" name="name" placeholder="name" />
                <button className="register__button">ENTER</button>
                <Link to="/board" className="register__button">GO BACK</Link>
                </form> 
            </div>
        </form>
        {error && <Feedback message={error} />}
    </section>
}