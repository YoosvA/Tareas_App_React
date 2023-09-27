import { useReducer } from "react";
import { tareaReducer } from "../reducers/tareaReducer";
import Swal from "sweetalert2";

export const useCrud = (descripcion, setDescripcion) =>{
    const init = () => {
        return JSON.parse(localStorage.getItem("tareas")) || [];
    };

    const [tareas, dispatch] = useReducer(tareaReducer, [], init);

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

      return {
        tareas,
        handleSubmit,
        handelCambiar,
        handelEliminar,
      }
}