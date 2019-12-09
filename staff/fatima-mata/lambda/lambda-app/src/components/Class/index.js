import React from 'react'
import './index.sass'

export default function ({ _class:{ className, id}, onRemove }){
    return<>
        <h3>{className} </h3>
        <button onClick={()=>{
            onRemove(id)
        }}>remove</button>
    </>


}