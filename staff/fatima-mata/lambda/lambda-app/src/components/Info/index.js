import React from 'react'
import './index.sass'
import CreateInfo from '../CreateInfo'


export default function ({ user, onCreateInfo }) {
    return <section className="view createinfo">
        <h2 className="board__user">{user}</h2>
        <CreateInfo onSubmit={onCreateInfo } />
    </section>
}