import React, { useState } from 'react';

const ParingRounds = ({ players, onStartRound }) => {
  const [pairings, setPairings] = useState([]);

  // Função para embaralhar os jogadores
  const shufflePlayers = (players) => {
    for (let i = players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [players[i], players[j]] = [players[j], players[i]]; // Troca os jogadores
    }
  };

  const handleEmparelhamento = () => {
    const pairs = [];
    const remainingPlayers = [...players];

    // Embaralha os jogadores antes de formar o primeiro par
    shufflePlayers(remainingPlayers);

    // Emparelhamento aleatório inicial
    while (remainingPlayers.length >= 2) {
      const player1 = remainingPlayers.shift();
      const player2 = remainingPlayers.shift();
      pairs.push([player1.nome, player2.nome]);
    }

    setPairings(pairs);
    onStartRound(pairs);
  };

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
  );
};

export { ParingRounds };
