import React from 'react'
import './index.sass'
import Classroom from '../Classroom'

export default function ({ classrooms }) {
    return <ul className="classroom-list">
        {classrooms.map(classroom => <p className="classroom-list__item" key={classroom.id}><Classroom classroom={classroom} /></p>)}
    </ul>
}