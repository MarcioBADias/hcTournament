import React, { useState } from 'react'

const ParingRounds = ({ players, onStartRound }) => {
  const [pairings, setPairings] = useState([])

  const handleEmparelhamento = () => {
    const pairs = []
    const remainingPlayers = [...players]

    while (remainingPlayers.length >= 2) {
      const player1 = remainingPlayers.shift()
      const player2 = remainingPlayers.shift()
      pairs.push([player1.nome, player2.nome])
    }

    setPairings(pairs)
    onStartRound(pairs)
  }

  return (
    <div>
      <h2>Emparelhamento de Rodadas</h2>
      <button onClick={handleEmparelhamento}>Emparelhar</button>
      <ul>
        {pairings.map((par, index) => (
          <li key={index}>
            {par[0]} vs {par[1]}{' '}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { ParingRounds }
