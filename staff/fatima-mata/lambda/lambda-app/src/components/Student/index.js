import React from 'react'
import './index.sass'
import CreateStudent from '../CreateStudent'


export default function ({ user, onCreateStudent }) {
    return <section className="view createinfo">
        <h2 className="board__user">{user}</h2>
        <CreateStudent onSubmit={onCreateStudent } />
    </section>
}