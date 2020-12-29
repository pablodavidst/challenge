import React from 'react'

export default function Etiquetas({min,max,ajustarMargenes}){

    return <div className="et-mm">
        <h3 className={ajustarMargenes ? 'mlm-30':''}>{min}</h3>
        <h3 className={ajustarMargenes ? 'mrm-30':''}>{max}</h3>
    </div>
}