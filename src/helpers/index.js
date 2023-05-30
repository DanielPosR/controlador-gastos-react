export const generarId = () => {
    const random = Math.random().toString(35).substr(2);
    const fecha = Date.now().toString(35);

    return fecha + random;
}


export const formatearFecha = (fecha) => {

    const fechaNueva = new Date(fecha);
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }

    return fechaNueva.toLocaleDateString('es-ES', opciones)
} 