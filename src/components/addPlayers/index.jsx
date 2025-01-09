import React, { useState } from 'react'

const AddPlayers = ({ onAddPlayer }) => {
  const [name, setName] = useState('')

  const handleAddPlayer = () => {
    if (name.trim()) {
      onAddPlayer(name.trim())
      setName('')
    }
  }

  return (
    <div className="addPlayers">
      <h2>Cadastro de Jogadores</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do jogador"
      />
      <button onClick={handleAddPlayer}>Adicionar Jogador</button>
    </div>
  )
}

export { AddPlayers }
