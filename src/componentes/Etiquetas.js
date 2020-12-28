import react, { useState } from 'react'


export default function Etiquetas({min,max}){

    return <div className="et-mm">
        <h3>{min}</h3>
        <h3>{max}</h3>
    </div>
}