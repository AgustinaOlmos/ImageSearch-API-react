import React, { useState } from 'react'
import Error from './Error'

const Formulario = ({ guardarbusqueda, guardarPagActual}) => {

    const [topic, guardartopic] = useState('')
    const [error, guardarError] = useState(false)

    const buscarImagenes = e => {
        e.preventDefault()

        // Validar
        if (topic.trim() === '') {
            guardarError(true)
            return
        }
        guardarError(false)

        // Enviar el topic de busqueda hacia el componente principal
        guardarbusqueda(topic)
        guardarPagActual(1)
    }

    return (
        <form
            onSubmit={buscarImagenes}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search for an image, e.g.: animals or coffee"
                        onChange={e => guardartopic(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Search"
                    />
                </div>
            </div>

            {error ? <Error mensaje="Add a search topic" /> : null}
        </form>
    )
}

export default Formulario
