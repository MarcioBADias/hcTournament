import React from 'react'

const Ranking = ({ jogadores }) => {
  const jogadoresClassificados = [...jogadores].sort((a, b) => {
    return b.vitorias - a.vitorias || b.pontosTotais - a.pontosTotais
  })

  return (
    <div>
      <h2>Ranking</h2>
      <ul>
        {jogadoresClassificados.map((jogador, index) => (
          <li key={index}>
            {jogador.nome} - Vitórias: {jogador.vitorias}, Derrotas:{' '}
            {jogador.derrotas}, Pontos Acumulados: {jogador.pontosTotais}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Ranking }
