import React from 'react'
import './index.sass'
import Student from '../Student'
import {Link} from 'react-router-dom'

export default function ({ students, onRemoveStudent }) {
    return<>
          <div className="body">
                <img className='body__image' src="../images/logo.jpg" />
                <h1 className="student-list__title">STUDENTS</h1>
                <Link to="/student-create" className="student-list__button">ADD STUDENT</Link>
                <ul className="student-list">
                    {students && students.map(student => <li className="student-list__item" key={student.id}><Student student={student} onRemove={onRemoveStudent} /></li>)}
                </ul>
            </div>
    </>
}


