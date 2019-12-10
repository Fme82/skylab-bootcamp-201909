import React, { useState } from 'react'

export default function ({ onSubmit }) {
    const [name, setName] = useState('')

    return <section className="view">
    
        <h2 className="classrooms__litle-title">Create Classroom</h2>
        <form onSubmit={event => {
            event.preventDefault()

            onSubmit(name)

            setName('')
        }}>
            <input className="classrooms__input" type="text" name="name" value={name} onChange={event => setName(event.target.value)} />
            
            <button className="classrooms__button">Add Classroom</button>
        </form>
    </section>
}