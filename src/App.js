import React, { useState,useEffect } from "react";
import ControlPresupuesto from "./components/ControlPresupuesto";
import Formulario from "./components/Formulario";
import Listado from "./components/Listado";
import Pregunta from "./components/Pregunta";

function App() {

  let presupuestoIniciado = JSON.parse(localStorage.getItem('presupuesto'));
  let restanteAlmacenado = JSON.parse(localStorage.getItem('restante'));
  let gastosAlmacenado = JSON.parse(localStorage.getItem('gastos'));
  let pregunta = JSON.parse(localStorage.getItem('pregunta'));

  if(!presupuestoIniciado || !restanteAlmacenado || !gastosAlmacenado) {
    presupuestoIniciado = 0;
    restanteAlmacenado = 0;
    gastosAlmacenado = [];
    pregunta = true;
  }
  
  // Hooks
  const [presupuesto, setPresupuesto] = useState(presupuestoIniciado);
  const [restante, setRestante] = useState(restanteAlmacenado);
  const [gastos, setGastos] = useState(gastosAlmacenado);
  const [mostrarPregunta, actualizarPregunta] = useState(Boolean(pregunta));
  const [gasto, setGasto ]= useState({});
  const [crearGasto, setCrearGasto ] = useState(false);

  // useEffect localStorage.

  useEffect(()=>{
    if(presupuestoIniciado || restanteAlmacenado || gastosAlmacenado || pregunta) { 
      localStorage.setItem('presupuesto',presupuesto);
      localStorage.setItem('restante',restante);
      localStorage.setItem('gastos',JSON.stringify(gastos));
      localStorage.setItem('pregunta',false)
    } else {
      localStorage.setItem('presupuesto',0);
      localStorage.setItem('restante',0);
      localStorage.setItem('gastos',JSON.stringify([]));
      localStorage.setItem('pregunta',true)
    }
  },[
    presupuestoIniciado,
    restanteAlmacenado,
    gastosAlmacenado,
    gastos,
    presupuesto,
    restante,
    pregunta
  ])
  
  //useEffect que actualiza el restante:
  useEffect(()=>{

    // Agregar nuevo presupuesto
    if(crearGasto){
      setGastos([...gastos,gasto])

      // Resta del presupuesto actual
      let presupuestoRestante = restante - gasto.cantidad;
      setRestante(presupuestoRestante);
    
      setCrearGasto(false);
    };
    
  },[gasto,crearGasto,gastos,restante])

  const limpiarLista = () => {
    setGastos([]);
    setRestante(presupuesto);
  }

  // Boton Reiniciar
  const reiniciarPresupuesto = () => {
    setGastos([]);
    setRestante(0);
    setPresupuesto(0);
    actualizarPregunta(true);
  }

  return (
    <div className="container">
      <header>
        <h1>Gasto Semanal</h1>
        <div className="contenido-principal contenido">
          {mostrarPregunta ? (
            <Pregunta
              setPresupuesto={setPresupuesto}
              setRestante={setRestante}
              actualizarPregunta={actualizarPregunta}
            />
          ) : (
            <div className="row">
              <div className="one-half column">
                <Formulario
                  setGasto={setGasto} 
                  setCrearGasto={setCrearGasto}
                />
              </div>
              <div className="one-half column">
                <Listado 
                  gastos={gastos}
                />
                <ControlPresupuesto 
                  presupuesto={presupuesto}
                  restante={restante}
                />
                <hr/>
                <button
                  onClick={limpiarLista}
                  >❌ Limpiar Lista</button>
                <button
                  onClick={reiniciarPresupuesto}
                  >🔥 Reiniciar Presupuesto</button>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
