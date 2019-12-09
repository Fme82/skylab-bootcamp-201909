import React from 'react'
import './index.sass'

export default function ({ student:{ name, surname, email, id}, onRemove }){
    return<>
        <h3>{name} {surname}</h3>
        <p>{email}</p>
        <button onClick={()=>{
            onRemove(id)
        }}>remove</button>
    </>


}