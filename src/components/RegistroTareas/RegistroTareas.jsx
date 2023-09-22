
//props->desventajea solo pueden seguir un cierto flujo de trabajo de padre a hijo mas no de hijo a
export const RegistroTareas = ({tarea,index,handelCambiar,handelEliminar}) => {
  
  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <div className={tarea.realizado ? "card bg-success" : "card bg-secondary"}>
              <div className="card-body">
                <h5 className="card-title">Tarea: {index + 1}</h5>
                <p className="card-text">{tarea.descripcion}</p>
                <hr />
                <div className="mb-3">
                  <div className="d-grid gap-2">
                  <button className="btn btn-dark" onClick={() => handelEliminar(tarea.id)}>Borrar</button>
                    <button className="btn btn-info" onClick={() => handelCambiar(tarea.id)}>
                    {/* <button className="btn btn-dark" onClick={() => handelEliminar(index)}>Borrar</button>
                    <button className="btn btn-info" onClick={() => handelCambiar(index)}> */}
                      {tarea.realizado ? "marcar como inconclusa" : "marcar como terminada"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
