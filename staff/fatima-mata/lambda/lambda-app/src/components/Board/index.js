import React from 'react'
import './index.sass'
import ClassroomList from '../ClassroomList'
import { Link } from 'react-router-dom'

export default function ({ onLogout, classrooms }) {
    return <section className="view boar">
            <div className="body">
                <img className='body__image' src="../images/logo.jpg" />
                <h1 className="board__title">MY CLASSROOMS</h1>
                <Link to="/create-classroom" className="board__button" >ADD CLASS ROOM</Link>
                <ClassroomList classes={classrooms}/>
                <form className="board__button" onSubmit={event => { event.preventDefault(); onLogout() }}><button>Logout</button></form>
            </div>
    </section>
}


