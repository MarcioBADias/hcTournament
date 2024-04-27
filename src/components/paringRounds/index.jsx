import React, { useState } from 'react'

const ParingRounds = ({ jogadores, onStartRound }) => {
  const [emparceiramentos, setEmparceiramentos] = useState([])

  const handleEmparelhamento = () => {
    const pares = []
    const jogadoresRestantes = [...jogadores]

    while (jogadoresRestantes.length >= 2) {
      const jogador1 = jogadoresRestantes.shift()
      const jogador2 = jogadoresRestantes.shift()
      pares.push([jogador1.nome, jogador2.nome])
    }

    setEmparceiramentos(pares)
    onStartRound(pares)
  }

  return (
    <div>
      <h2>Emparelhamento de Rodadas</h2>
      <button onClick={handleEmparelhamento}>Emparelhar</button>
      <ul>
        {emparceiramentos.map((par, index) => (
          <li key={index}>
            {par[0]} vs {par[1]}{' '}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { ParingRounds }
