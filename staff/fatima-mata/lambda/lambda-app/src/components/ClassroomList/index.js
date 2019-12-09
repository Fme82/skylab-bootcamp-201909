import React from 'react'
import './index.sass'
import Classroom from '../Classroom'

export default function ({ classrooms, onRemoveClassroom }) {
    return<>
          <div >
                <ul className="student-list">
                    {classrooms && classrooms.map(_class => <li className="class-list__item" key={_class.id}><Classroom _class={_class} onRemove={onRemoveClassroom} /></li>)}
                </ul>
            </div>
    </>
}
