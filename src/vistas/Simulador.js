import react, { useEffect, useState } from 'react'
import Acciones from '../componentes/Acciones'
import Etiquetas from '../componentes/Etiquetas'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function Simulador(){

    const [monto,setMonto]=useState(5000)
    const [plazo,setPlazo]=useState(3)
    const [cuotaFija,setCuotaFija]=useState(0)

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
        
        if (inputsValidos(plazo,monto)){  
            setCuotaFija(calcularCuotaFija(plazo,monto))
        }else{
            asignarValoresDefault(plazo,monto,setPlazo,setMonto)
        }

    },[plazo,monto])

    return <div className="divext">
        <div className="divint">
            <span className="titulo">Simulá tu crédito</span>
             <form>
                    <div className="divForm">
                        <label htmlFor="id-monto">MONTO TOTAL</label>
                        <input id="id-monto" type="number" min={5000} max={50000} value={monto} onChange={handleChangeMonto}/>
                    </div>
                    <div className="c-slider">
                        <Slider min={5000} max={50000} onChange={handleSlideMonto} value={monto}/>
                        <Etiquetas min='$5.000' max='$50.000'/>
                    </div>
                    <div className="divForm">
                        <label htmlFor="id-cuotas">PLAZO</label>
                        <input id="id-cuotas" type="number" min={3} max={24} value={plazo} onChange={handleChangePlazo}/>
                    </div>
                    <div className="c-slider">
                        <Slider min={3} max={24} onChange={handleSlidePlazo} value={plazo}/>
                        <Etiquetas min='3' max='24'/>
                    </div>
             </form>
             <div className="c-detalle">
                <div className="c-fija-d">
                    <h3>CUOTA FIJA POR MES</h3>
                    { cuotaFija > 0 && <span className="c-fija-s">{`$ ${imprimirCuota(cuotaFija)}`}</span>}
                </div>
                <Acciones/>
             </div>
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
    if(Number(plazo)>24 || Number(plazo)<3 || Number(monto)<5000 || Number(monto)>50000){
        return false
    }else{
        return true
    }
}

function asignarValoresDefault(plazo,monto,setPlazo,setMonto){

    if (Number(plazo)<3){
        setPlazo(3)
    }

    if(Number(plazo>24)){
        setPlazo(24)
    }

    if(Number(monto)<5000){
        setMonto(5000)
    }

    if(Number(monto)>50000){
        setMonto(50000)
    }
}

function imprimirCuota(cuotaFija){
    return cuotaFija.replace(/\d(?=(\d{3})+\.)/g, '$&,')
}