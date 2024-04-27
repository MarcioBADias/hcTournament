import React, { useState } from 'react'

const RoundResults = ({ emparceiramentos, onRecordResults }) => {
  const [resultados, setResultados] = useState([])

  const handleResultChange = (index, value) => {
    const novosResultados = [...resultados]
    novosResultados[index] = value
    setResultados(novosResultados)
  }

  const handleRecordResults = () => {
    onRecordResults(resultados)
    setResultados([])
  }

  return (
    <div>
      <h2>Registrar Resultados</h2>
      <ul>
        {emparceiramentos.map((par, index) => (
          <li key={index}>
            {par[0]} vs {par[1]}
            <select onChange={(e) => handleResultChange(index, e.target.value)}>
              <option value="">Selecione o vencedor</option>
              <option value={par[0]}>{par[0]}</option>
              <option value={par[1]}>{par[1]}</option>
              <option value="empate">Empate</option>
            </select>
          </li>
        ))}
      </ul>
      <button onClick={handleRecordResults}>Registrar Resultados</button>
    </div>
  )
}

export { RoundResults }
