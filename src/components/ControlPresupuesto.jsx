import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = (
    {
        presupuesto,
        setPresupuesto,
        gastos,
        setGastos,
        setIsValidPresupuesto
    }) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    const [porcentaje, setPorcentaje] = useState(0)


    useEffect(() => {

        //* Calcular total gastado y disponible
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0);
        const totalDisponible = presupuesto - totalGastado;


        //* Calcular porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);


        setGastado(totalGastado)
        setDisponible(totalDisponible)

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);
    }, [gastos])




    const Formatearcantidad = (cantidad) => {

        return cantidad.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
        })
    }


    const handleResetApp = () => {

        const resultado = confirm('¿Deseas reiniciar presupuesto y gastos');

        if(resultado) {

            setGastos([]);
            setPresupuesto(0);
            setIsValidPresupuesto(false);
        }
    }


    return (
        <div className="contenedor-presupuesto contenedor sombra dos-columnas">

            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                        trailColor: '#f5f5f5',
                        textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% gastado`}
                />
            </div>

            <div className="contenido-presupuesto">

                <button 
                className="reset-app" 
                type="button"
                onClick={handleResetApp}
                >Resetear App</button>

                <p>
                    <span>Presupuesto: </span> {Formatearcantidad(presupuesto)}
                </p>

                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span> {Formatearcantidad(disponible)}
                </p>

                <p>
                    <span>Gastado: </span> {Formatearcantidad(gastado)}
                </p>
            </div>

        </div>
    )
}

export default ControlPresupuesto