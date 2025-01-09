import React, { useState } from 'react';

<<<<<<< HEAD
const AddPlayers = ({ onAddPlayer }) => {
  const [name, setName] = useState('')

  const handleAddPlayer = () => {
    if (name.trim()) {
      onAddPlayer(name.trim())
      setName('')
=======
const ParingRounds = ({ players, onStartRound }) => {
  const [pairings, setPairings] = useState([]);

  // Função para embaralhar os jogadores
  const shufflePlayers = (players) => {
    for (let i = players.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [players[i], players[j]] = [players[j], players[i]]; // Troca os jogadores
>>>>>>> 82c93e7a306dc34b3956cb69cd781df7b0c223ad
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
<<<<<<< HEAD
    <div className="addPlayers">
      <h2>Cadastro de Jogadores</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do jogador"
      />
      <button onClick={handleAddPlayer}>Adicionar Jogador</button>
=======
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
>>>>>>> 82c93e7a306dc34b3956cb69cd781df7b0c223ad
    </div>
  );
};

export { ParingRounds };
