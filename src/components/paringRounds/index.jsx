import React, { useState } from 'react'

const ParingRounds = ({ players, onStartRound }) => {
  const [pairings, setPairings] = useState([])

  const handleEmparelhamento = () => {
    const pairs = []
    const remainingPlayers = [...players]

    while (remainingPlayers.length >= 2) {
      const player1 = remainingPlayers.shift()
      const player2 = remainingPlayers.shift()
      pairs.push([player1.name, player2.name])
    }

    setPairings(pairs)
    onStartRound(pairs)
  }

  return (
    <div>
      <h2>Emparelhamento de Rodadas</h2>
      <button onClick={handleEmparelhamento}>Emparelhar</button>
      <ul>
        {pairings.map((pair, index) => (
          <li key={index}>
            {pair[0]} vs {pair[1]}{' '}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { ParingRounds }
