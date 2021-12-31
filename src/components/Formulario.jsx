import React,{useState} from 'react'
import PropTypes from 'prop-types'
import shortid from 'shortid';
import Error from './Error';

const Formulario = ({setGasto,setCrearGasto}) => {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [error, setError] = useState(false);

    // Cuando el usuario agrega el gasto.
    const agregarGasto = e => {
        e.preventDefault();

        // Validar. 
        if(cantidad <1||isNaN(cantidad)||nombre.trim()===''){
            setError(true);
            return
        }
        setError(false);
        
        // Construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate() 
        }
        
        // Pasar el gasto al componente principal
        setGasto(gasto)
        setCrearGasto(true)

        // Reset el form.
        setNombre('');
        setCantidad(0);

    }

    return (
        <form onSubmit={agregarGasto}>
            <h2>Agrega tus gastos aqui</h2>
            {error ? <Error mensaje="Ambos campos son obligatorios o presupuesto incorrecto"/> : null }
            <div className="campo">
                <label>Nombre Gasto</label>
                <input 
                    type="text" 
                    className="u-full-width" 
                    placeholder='Ej. Transporte'
                    value={nombre}
                    onChange={e=>setNombre(e.target.value)}
                />
            </div>
            <div className="campo">
                <label>Cantidad</label>
                <input 
                    type="number" 
                    className="u-full-width" 
                    placeholder='Ej. 100'
                    value={cantidad}
                    onChange={e=>setCantidad(parseInt(e.target.value))}
                />
            </div>
            <input type="submit" value="Agregar Gasto" className="button-primary u-full-width" />
        </form>
    )
}

Formulario.propTypes = {
    setGasto: PropTypes.func.isRequired,
    setCrearGasto: PropTypes.func.isRequired
}

export default Formulario
