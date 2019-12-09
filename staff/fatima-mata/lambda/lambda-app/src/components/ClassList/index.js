import React from 'react'
import './index.sass'
import Class from '../Class'
import {Link} from 'react-router-dom'

export default function ({ classes, onRemoveClasses }) {
    return<>
          <div >
                <ul className="student-list">
                    {classes && classes.map(_class => <li className="class-list__item" key={_class.id}><Class _class={_class} onRemove={onRemoveClasses} /></li>)}
                </ul>
            </div>
    </>
}
