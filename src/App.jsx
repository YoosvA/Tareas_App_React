import { useEffect } from "react";
import { RegistroTareas, Footer, FormularioTareas, Header } from "./components";
import { useCrud, useForm, useProgress } from "./hooks";

export const App = () => {


  const [ descripcion, handleInputChange, setDescripcion ] = useForm("");
  const { tareas, handleSubmit, handelCambiar, handelEliminar } = useCrud(descripcion, setDescripcion);

  const porcentaje = useProgress(tareas)

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

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
              {tareas.map((tarea, index) => {
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
