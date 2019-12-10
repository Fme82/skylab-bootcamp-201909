import React from 'react'
import './index.sass'
import { Link } from 'react-router-dom'

export default function ({ classroom: { name, infos: [ Info ] }}) {
    return <a href="#">
        <h2 className="classroom__name">{name}</h2>
        <ul>
        <li><Link to="/info" className="classroom__button">Info</Link></li>
        <li><Link to="/student" className="classroom__button">Student</Link></li>
        </ul>
    </a>
}

