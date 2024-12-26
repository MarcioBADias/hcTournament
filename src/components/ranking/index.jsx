import React, { useState } from 'react'

const Ranking = ({ players, onUpdatePlayer }) => {
  const [editIndex, setEditIndex] = useState(null)
  const [editData, setEditData] = useState({})

  const classifiedPlayers = [...players].sort((a, b) => {
    return b.vitorias - a.vitorias || b.pontosTotais - a.pontosTotais
  })

  const handleEditClick = (index, jogador) => {
    setEditIndex(index)
    setEditData({
      nome: jogador.nome,
      vitorias: jogador.vitorias,
      derrotas: jogador.derrotas,
      pontosTotais: jogador.pontosTotais,
    })
  }

  const handleSaveClick = () => {
    if (editData.nome.trim()) {
      onUpdatePlayer(players[editIndex].nome, editData)
    }
    setEditIndex(null)
    setEditData({})
  }

  const handleCancelClick = () => {
    setEditIndex(null)
    setEditData({})
  }

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div>
      <h2>Ranking</h2>
      <ul>
        {classifiedPlayers.map((jogador, index) => (
          <li key={index}>
            {editIndex === index ? (
              <div>
                <label>Jogador</label>
                <input
                  type="text"
                  value={editData.nome}
                  onChange={(e) => handleChange('nome', e.target.value)}
                  placeholder="Nome"
                />
                <label>VItorias</label>
                <input
                  type="number"
                  value={editData.vitorias}
                  onChange={(e) =>
                    handleChange('vitorias', parseInt(e.target.value, 10) || 0)
                  }
                  placeholder="Vitórias"
                />
                <label>Derrotas</label>
                <input
                  type="number"
                  value={editData.derrotas}
                  onChange={(e) =>
                    handleChange('derrotas', parseInt(e.target.value, 10) || 0)
                  }
                  placeholder="Derrotas"
                />
                <label>Pontos</label>
                <input
                  type="number"
                  value={editData.pontosTotais}
                  onChange={(e) =>
                    handleChange(
                      'pontosTotais',
                      parseInt(e.target.value, 10) || 0,
                    )
                  }
                  placeholder="Pontos Totais"
                />
                <button onClick={handleSaveClick}>Salvar</button>
                <button onClick={handleCancelClick}>Cancelar</button>
              </div>
            ) : (
              <div>
                {jogador.nome} - Vitórias: {jogador.vitorias}, Derrotas:{' '}
                {jogador.derrotas}, Pontos Acumulados: {jogador.pontosTotais}
                <button onClick={() => handleEditClick(index, jogador)}>
                  Editar
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Ranking }
