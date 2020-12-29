import React, { useEffect, useState } from 'react'
import Acciones from '../componentes/Acciones'
import Etiquetas from '../componentes/Etiquetas'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function Simulador(){

    const [monto,setMonto]=useState(5000)
    const [plazo,setPlazo]=useState(3)
    const [cuotaFija,setCuotaFija]=useState(0)


    useEffect(()=>{
        
        if (inputsValidos(plazo,monto)){  
            setCuotaFija(calcularCuotaFija(plazo,monto))
        }else{
            setCuotaFija(null)
        }

    },[plazo,monto])

    const handleChangeMonto = (e)=>{
        setMonto(e.target.value)
    }

    const handleChangePlazo = (e)=>{
        setPlazo(e.target.value)
    }    

    const handleChangeSlidePlazo = (valor)=>{
        setPlazo(valor)
    }

    const handleChangeSlideMonto = (valor)=>{
        setMonto(valor)
    }    

    return <div className="divext">
        <div className="divint">
            <span className="titulo">Simulá tu crédito</span>
             <form>
                    <div className="divForm">
                        <label htmlFor="id-monto">MONTO TOTAL</label>
                        <input id="id-monto" 
                                type="number" 
                                required 
                                min={5000} 
                                max={50000} 
                                value={monto} 
                                onChange={handleChangeMonto}/>
                    </div>
                    <div className="c-slider">
                        <Slider min={5000} max={50000} onChange={handleChangeSlideMonto} value={monto}/>
                        <Etiquetas min='$ 5.000' max='$ 50.000' ajustarMargenes/>
                    </div>
                    <div className="divForm">
                        <label htmlFor="id-cuotas">PLAZO</label>
                        <input id="id-cuotas" 
                                type="number" 
                                required min={3} 
                                max={24} 
                                value={plazo} 
                                onChange={handleChangePlazo}/>
                    </div>
                    <div className="c-slider">
                        <Slider min={3} max={24} onChange={handleChangeSlidePlazo} value={plazo}/>
                        <Etiquetas min='3' max='24'/>
                    </div>
             </form>
             {cuotaFija && <Detalle cuotaFija={cuotaFija}/>}             
             {!cuotaFija && <span className="error">El monto o plazo no es válido. Verifique los valores ingresados</span>}
        </div>
    </div>
}

function calcularCuotaFija(plazo,monto){
    let cuota = 0;

    if (plazo>0){
        cuota = monto / plazo
    }

    return cuota.toFixed(2)
}

function inputsValidos(plazo,monto){

    if (Number(plazo)<3 || Number(plazo)>24 || Number(monto)<5000 || Number(monto)>50000){
        return false
    }else{
        return true
    }
}

function imprimirCuota(cuotaFija){
    return cuotaFija.replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

function Detalle({cuotaFija}){
    return <div className="c-detalle">
                <div className="mb-10">
                    <span className="et-c-fija">CUOTA FIJA POR MES</span>
                    <span className="c-fija-s">{`$ ${imprimirCuota(cuotaFija)}`}</span>
                </div>
                <Acciones/>
            </div>
}