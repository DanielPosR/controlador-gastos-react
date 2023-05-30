import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = (
    {
        presupuesto,
        setPresupuesto,
        setIsValidPresupuesto }
) => {

    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = (e) => {
        e.preventDefault();

        if (!presupuesto || presupuesto < 0) {
            setMensaje(`"${presupuesto}" ¡No es un presupuesto válido!`)

            setTimeout(() => {
                setMensaje('')
            }, 3500)

            return;
        }

        setIsValidPresupuesto(true);
    }
    return (
        <div className="contenedor-presupuesto contenedor sombra">

            <form
                className="formulario"
                onSubmit={handlePresupuesto}
            >
                <div className="campo">
                    <label htmlFor="presupuesto">Definir Presupuesto</label>

                    <input
                        id="presupuesto"
                        type="number"
                        className="nuevo-presupuesto"
                        placeholder="Añade tu presupuesto"
                        value={presupuesto}
                        onClick={() => setPresupuesto('')}
                        onChange={(e) => setPresupuesto(Number(e.target.value))}
                    />
                </div>

                <input type="submit" value="Añadir" />

                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje>}
            </form>
        </div>
    )
}

export default NuevoPresupuesto