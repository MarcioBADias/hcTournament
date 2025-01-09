import React, { useState } from 'react'
import * as C from './styles'

const Ranking = ({ players, onUpdatePlayer }) => {
  const [editIndex, setEditIndex] = useState(null)
  const [editData, setEditData] = useState({})

  const classifiedPlayers = [...players].sort((a, b) => {
    return b.victories - a.victories || b.pontosTotais - a.pontosTotais
  })

  const handleEditClick = (index, player) => {
    setEditIndex(index)
    setEditData({
      name: player.name,
      victories: player.victories,
      derrotas: player.derrotas,
      pontosTotais: player.pontosTotais,
    })
  }

  const handleSaveClick = () => {
    if (editData.name.trim()) {
      onUpdatePlayer(players[editIndex].name, editData)
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
        {classifiedPlayers.map((player, index) => (
          <li key={index}>
            {editIndex === index ? (
              <div>
                <label>Jogador</label>
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="nome"
                />
                <label>Vitórias</label>
                <input
                  type="number"
                  value={editData.victories}
                  onChange={(e) =>
                    handleChange('victories', parseInt(e.target.value, 10) || 0)
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
              <C.rankPlayer>
                {player.name} - Vitórias: {player.victories}, Derrotas:{' '}
                {player.derrotas}, Pontos Acumulados: {player.pontosTotais}
                <button onClick={() => handleEditClick(index, player)}>
                  Editar
                </button>
              </C.rankPlayer>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Ranking }
