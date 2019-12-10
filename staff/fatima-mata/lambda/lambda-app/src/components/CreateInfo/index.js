import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ({ onSubmit, idClassroom }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    return <section className="view ">
        <div className="body">
            <h2 className="login__title" >Info</h2>
            <form onSubmit={event => {
                event.preventDefault()

                onSubmit(idClassroom, title, description)

                setTitle('')
                setDescription('')
            }}>
                <input className="login__input" type="text" name="title" placeholder="Title" value={title} onChange={event => setTitle(event.target.value)} />
                <input className="login__input" type="text" name="description" placeholder="Description" value={description} onChange={event => setDescription(event.target.value)} />
                <button className="classrooms__button">Add Info</button>
                <Link className="body__button" to="/classrooms" >Go Back</Link>
            </form>
        </div>
    </section>
}
