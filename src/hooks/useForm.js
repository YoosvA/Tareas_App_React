import { useState } from "react"

export const useForm = (estadoInicial) => {
    const [descripcion, setDescripcion] = useState(estadoInicial);

    const handleInputChange = (evento) => {
        setDescripcion(evento.target.value);
    };

    return [descripcion, handleInputChange, setDescripcion]
}