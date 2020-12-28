import react, { useEffect, useState } from 'react'
import Acciones from '../componentes/Acciones'
import Etiquetas from '../componentes/Etiquetas'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function Simulador(){

    const [monto,setMonto]=useState(5000)
    const [plazo,setPlazo]=useState(3)
    const [cuotaFija,setCuotaFija]=useState(null)

    const handleChangeMonto = (e)=>{
        setMonto(e.target.value)
    }

    const handleChangePlazo = (e)=>{
        setPlazo(e.target.value)
    }    

    const handleSlidePlazo = (valor)=>{
        setPlazo(valor)
    }

    const handleSlideMonto = (valor)=>{
        setMonto(valor)
    }    

    useEffect(()=>{
        
        setCuotaFija(calcularCuotaFija(plazo,monto))

    },[plazo,monto])

    return <div className="divext">
        <div className="divint">
            <span className="titulo">Simulá tu crédito</span>
             <form action="">
                    <div className="divForm">
                        <label htmlFor="id-monto">MONTO TOTAL</label>
                        <input id="id-monto" type="number" value={monto} onChange={handleChangeMonto}/>
                    </div>
                    <div className="c-slider">
                        <Slider min={5000} max={50000} onChange={handleSlideMonto} value={monto}/>
                        <Etiquetas min='$5.000' max='$50.000'/>
                    </div>
                    <div className="divForm">
                        <label htmlFor="id-cuotas">PLAZO</label>
                        <input id="id-cuotas" type="number" value={plazo} onChange={handleChangePlazo}/>
                    </div>
                    <div className="c-slider">
                        <Slider min={3} max={24} onChange={handleSlidePlazo} value={plazo}/>
                        <Etiquetas min='3' max='24'/>
                    </div>
             </form>
             <div>
                <div className="c-fija">
                    <h3>CUOTA FIJA POR MES</h3>
                    {cuotaFija && cuotaFija > 0 && <h2>{`$ ${cuotaFija}`}</h2>}
                </div>
                <Acciones/>
             </div>
        </div>
    </div>
}

function calcularCuotaFija(plazo,monto){
    let cuota = 0;

    if (plazo && plazo>0){
        cuota = monto / plazo
    }

    return cuota.toFixed(2)
}
