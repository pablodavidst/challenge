import react, { useState } from 'react'


export default function Simulador(){

    const [monto,setMonto]=useState(5000)
    const [cuotas,setCuotas]=useState(3)

    return <div className="divext">
        <div className="divint">
            <h1 className="titulo">Simulá tu crédito</h1>
             <form action="">
                    <label htmlFor="id-monto">MONTO TOTAL</label>
                    <input id="id-monto" type="number"/>
                    <label htmlFor="id-cuotas">PLAZO</label>
                    <input id="id-cuotas" type="number"/>
             </form>
        </div>
    </div>
}