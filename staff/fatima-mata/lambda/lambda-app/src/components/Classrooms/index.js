import React from 'react'
import './index.sass'
import ClassroomsList from '../ClassroomsList'
import CreateClassroom from '../CreateClassroom'

export default function ({ user, classrooms, onLogout, onCreateClassroom }) {
    return <section className="view classroo">
        <div className="body">
            <img className='body__image' src="../images/logo.jpg" />
            <h1 className="classrooms__title">My classes</h1>
            <h2 className="classrooms__litle-title">Hello + {user}</h2>
            <CreateClassroom className="classrooms__button" onSubmit={onCreateClassroom} />
            <ClassroomsList className="classrooms__button" classrooms={classrooms} />
            <form onSubmit={event => { event.preventDefault(); onLogout() }}><button className="classrooms__button">Logout</button></form>
        </div>
    </section>
}


