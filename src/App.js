import React, { useState, useEffect } from 'react'
import Formulario from './components/Formulario';
import ListadoImg from './components/ListadoImg';


function App() {

  // state de la app
  const [busqueda, guardarbusqueda] = useState('')
  const [imagenes, guardarImagenes] = useState([])
  const [pagactual, guardarPagActual] = useState(1)
  const [totalpag, guardarTotalPag] = useState(1)

  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === '') return

      const imgPag = 30
      const key = '22195303-9d1808052f0a4dbc059e2dd84'
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imgPag}&page=${pagactual}`

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      guardarImagenes(resultado.hits)

      // Calcular el total de paginas
      const calcularTotalPag = Math.ceil(resultado.totalHits / imgPag)
      guardarTotalPag(calcularTotalPag)
    
      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron')
      jumbotron.scrollIntoView({ behavior: 'smooth'})
    }
    consultarAPI()
  }, [busqueda, pagactual])

  const goPreviousPag = () => {
    const pagPrevious = pagactual - 1
    if (pagPrevious === 0) return
    guardarPagActual(pagPrevious)
  }

  const goNextPag = () => {
    const pagNext = pagactual + 1
    if (pagNext > totalpag) return
    guardarPagActual(pagNext)
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Image Browser</p>

        <Formulario
          guardarbusqueda={guardarbusqueda}
          guardarPagActual={guardarPagActual}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImg
          imagenes={imagenes}
        />

        {(pagactual === 1) ? null : (
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={goPreviousPag}
          >&laquo; Previous</button>
        )}

        {(pagactual === totalpag) ? null : (
          <button
            type="button"
            className="bbtn btn-info"
            onClick={goNextPag}
          >Next &raquo;</button>
        )}
      </div>
    </div>
  );
}

export default App;
