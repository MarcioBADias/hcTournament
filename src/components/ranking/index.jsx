import React from 'react'

const Ranking = ({ jogadores }) => {
  const jogadoresClassificados = [...jogadores].sort((a, b) => {
    return b.vitorias - a.vitorias || b.pontos - a.pontos
  })

  return (
    <div>
      <h2>Ranking</h2>
      <ul>
        {jogadoresClassificados.map((jogador, index) => (
          <li key={index}>
            {jogador.nome} - Vitórias: {jogador.vitorias}, Derrotas:{' '}
            {jogador.derrotas}, Pontos: {jogador.pontos}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Ranking }
