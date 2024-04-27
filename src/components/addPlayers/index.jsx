import React, { useState } from 'react'

function AddPlayers({ onAddPlayer }) {
  const [nome, setNome] = useState('')

  const handleAddPlayer = () => {
    if (nome.trim()) {
      onAddPlayer(nome.trim())
      setNome('')
    }
  }

  return (
    <div>
      <h2>Cadastro de Jogadores</h2>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome do jogador"
      />
      <button onClick={handleAddPlayer}>Adicionar Jogador</button>
    </div>
  )
}

export default AddPlayers
