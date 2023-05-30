import { useEffect, useState } from "react"
import Header from "./components/Header"
import ListadoGastos from "./components/ListadoGastos";
import Modal from "./components/Modal";
import { formatearFecha, generarId } from "./helpers";
import IconoNuevoGasto from './img/nuevo-gasto.svg';
import Filtros from "./components/Filtros";


function App() {

  //* State para presupuesto
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState();


  //* state para mostrar y ocultar modal
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);


  //* state para registrar nuevos gastos
  const [gastos, setGastos] = useState(localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  );


  //* state para editar algun gasto
  const [gastoEditar, setGastoEditar] = useState({});


  //* State para los filtros
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])



  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true)
      }, 300);
    }
  }, [gastoEditar])


  //*  UseEffect para filtros
  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])


  //* UseEffect - Storage para presupuesto
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, [])



  //* UseEffect - Storage para gastos
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])




  //* Abre el formulario para añadir nuevo gasto
  const handleNuevoGasto = () => {

    setModal(true);

    setTimeout(() => {
      setAnimarModal(true)
    }, 300);
  }



  //* Toma los datos de el formulario y lo almacena en el listado de gastos
  const guardarGasto = (gasto) => {

    if (gasto.id) {
      //* Actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);

      setGastos(gastosActualizados);
      setGastoEditar({})
    } else {
      //* Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = formatearFecha(Date.now());

      setGastos([...gastos, gasto]);
    }



    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 300);
  }



  //* Eliminar gasto
  const eliminarGasto = (id) => {

    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados);
  }



  //**Comienza el return del componente */
  return (
    <div className={modal ? "fijar" : ''}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {isValidPresupuesto && (
        <>
          <main>

            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />

            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
            />
          </main>

          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="agregar gasto"
              onClick={() => {
                handleNuevoGasto();
              }}
            />
          </div>
        </>

      )}

      {modal && <Modal
        animarModal={animarModal}
        setModal={setModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar}
      />}


    </div>
  )
}

export default App;
