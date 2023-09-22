
export const FormularioTareas = ({handleInputChange, handleSubmit, descripcion}) => {

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card bg-dark text-light">
              <div className="card-body">
                <h3>Agregar tarea</h3>
                <hr />
                <form onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-3">
                  <label
                    htmlFor="tareaInput"
                    className="form-label"
                    aria-describedby="descripcionText"
                  >
                    Descripcion
                  </label>
                  <input
                    onChange={(e)=> handleInputChange(e)}
                    value={descripcion}
                    type="text"
                    className="form-control"
                    id="tareaInput"
                    aria-describedby="descripcionText"
                  />
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-success mt-3">Agregar</button>
                  </div>
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
