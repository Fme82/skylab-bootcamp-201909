import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ({ onSubmit, idClassroom }) {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')

    return <section className="view ">
        <div className="body">
            <h2 className="login__title" >Student</h2>
            <form onSubmit={event => {
                event.preventDefault()

                onSubmit(idClassroom, name, surname, email)

                setName('')
                setSurname('')
                setEmail('')
            }}>
                <input className="login__input" type="text" name="name" placeholder="Name" value={name} onChange={event => setName(event.target.value)} />
                <input className="login__input" type="text" name="surname" value={surname} placeholder="Surname" onChange={event => setSurname(event.target.value)} />
                <input className="login__input" type="text" name="email" placeholder="Email" value={email} onChange={event => setEmail(event.target.value)} />
                <button className="classrooms__button">Add Student</button>
                <Link className="body__button" to="/classrooms" >Go Back</Link>
            </form>
        </div>
    </section>
}
