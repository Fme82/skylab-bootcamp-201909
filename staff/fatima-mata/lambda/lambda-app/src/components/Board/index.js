import React from 'react'
import './index.sass'
import ClassList from '../ClassList'
import { Link } from 'react-router-dom'

export default function ({ onLogout, classes }) {
    return <section className="view boar">
            <div className="body">
                <img className='body__image' src="../images/logo.jpg" />
                <h1 className="board__title">MY CLASSES</h1>
                <Link to="/class-create" className="board__button" >ADD CLASS</Link>
                <ClassList classes={classes}/>
                <form className="board__button" onSubmit={event => { event.preventDefault(); onLogout() }}><button>Logout</button></form>
            </div>
    </section>
}


