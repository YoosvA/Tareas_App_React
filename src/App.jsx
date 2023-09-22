import { useEffect, useReducer, useState } from "react";
import { Footer } from "./components/Footer/Footer";
import { FormularioTareas } from "./components/FormularioTareas/FormularioTareas";
import { Header } from "./components/Header/Header";
import { RegistroTareas } from "./components/RegistroTareas/RegistroTareas";
import { tareaReducer } from "./reducers/tareaReducer";
import Swal from 'sweetalert2';

export const App = () => {
  const init = () => {
    return JSON.parse(localStorage.getItem("tareas")) || [];
  };

  const [state, dispatch] = useReducer(tareaReducer, [], init);

  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(state));
  }, [state]);

  const handleInputChange = (evento) => {
    setDescripcion(evento.target.value);
    console.log(descripcion);
  };

  const handleSubmit = (evento) => {
    evento.preventDefault();

    // Verificar si la descripción está vacía antes de agregar la tarea
    if (descripcion.trim() === "") {
      // Mostrar un SweetAlert de error
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No puedes agregar vacios",
      });
      return;
    }

    const tareaNueva = {
      id: new Date().getTime(),
      descripcion: descripcion,
      realizado: false,
    };

    const action = {
      type: "agregar",
      payload: tareaNueva,
    };
    dispatch(action);
    //limpiar formulario
    setDescripcion("");
  };

  const handelCambiar = (id) => {
    dispatch({
      type: "cambiar",
      payload: id,
    });
  };
  // const handelEliminar = (id) => {
  //   dispatch({
  //     type: "borrar",
  //     payload: id,
  //   });
  // };

  const handelEliminar = (id) => {
    // Mostrar SweetAlert de confirmación antes de eliminar
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir la tarea.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: 'borrar',
          payload: id
        });
        Swal.fire(
          '¡Eliminado!',
          'La tarea ha sido eliminada satisfactoriamente.',
          'success'
        );
      }
    });
  };
  

  let terminadas = 0;

  for (let i = 0; i < state.length; i++) {
    if (state[i].realizado === true) {
      terminadas++;
    }
  }

  let porcentaje = terminadas / state.length;

  //lamando componente header
  return (
    <>
      <Header />
      {/* <div className="container text-center">
                <div className="row">
                    <div className="col">
                    <p>hola pollo</p>
                    </div> 
                </div>
            </div> */}

      <div className="container">
        <div className="row">
          <div className="col-md-3 col-xs-12">
            <FormularioTareas
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              descripcion={descripcion}
            />
          </div>
          <div className="col-md-9 col-xs-12 mt-4">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {state.map((tarea, index) => {
                return (
                  <RegistroTareas
                    key={tarea.id}
                    handelCambiar={handelCambiar}
                    handelEliminar={handelEliminar}
                    index={index}
                    tarea={tarea}
                  />
                  // <RegistroTareas key={index} handelCambiar={handelCambiar} handelEliminar={handelEliminar} index={tarea.id} tarea={tarea} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container">
        <div className="row">
          <div className="col-4">
            <FormularioTareas />
          </div>
          <div className="col-8">
            <div className="d-flex flex-wrap">
              {
                Tareas.map((tarea, index) => {
                    return (
                        <div key={index} className="p-2">
                            <RegistroTareas tarea={tarea} index={index} />
                        </div>
                    );
                })
              }
            </div>
          </div>
        </div>
      </div> */}

      <div className="mt-4">
        <Footer porcentaje={porcentaje} />
      </div>
    </>
  );
};
// opcion condensada
// const App = () =>  <h1>Hola Pollo</h1>

// export default App;

// rafc -> sinped para poner toda la funcion flecha
//cards-grid
