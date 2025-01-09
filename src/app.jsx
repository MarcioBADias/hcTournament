import React, { useState, useEffect } from 'react'
import { Ranking } from './components/ranking'
import { AddPlayers } from './components/addPlayers'
import { ParingRounds } from './components/paringRounds'
import { RoundResults } from './components/roundResults'

const App = () => {
  const [players, setPlayers] = useState(() => {
    const savedPlayers = localStorage.getItem('players')
    return savedPlayers ? JSON.parse(savedPlayers) : []
  })
  const [pairings, setPairings] = useState(() => {
    const savedPairs = localStorage.getItem('pairings')
    return savedPairs ? JSON.parse(savedPairs) : []
  })
  const [roundStarted, setRoundStarted] = useState(false)
  const [displayRank, setDisplayRank] = useState(true)

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players))
  }, [players])

  useEffect(() => {
    localStorage.setItem('pairings', JSON.stringify(pairings))
  }, [pairings])

  const addPlayer = (name) => {
    setPlayers([
      ...players,
      {
        name,
        victories: 0,
        derrotas: 0,
        pontos: 0,
        pontosTotais: 0,
        historico: [],
      },
    ])
  }

  const editarJogador = (previousName, dadosAtualizados) => {
    const playersAtualizados = players.map((jogador) => {
      if (jogador.name === previousName) {
        return { ...jogador, ...dadosAtualizados }
      }
      return jogador
    })

    // Atualizar pairings para refletir a mudança de name, se necessário
    const pairingsAtualizados = pairings.map((par) =>
      par.map((name) => (name === previousName ? dadosAtualizados.name : name)),
    )

    setPlayers(playersAtualizados)
    setPairings(pairingsAtualizados)
  }

  const iniciarRodada = (pares) => {
    setPairings(pares)
    setRoundStarted(true)
    setDisplayRank(false)
  }

  const encerrarRodada = () => {
    setRoundStarted(false)
  }

  const emparelharplayers = () => {
    const playersOrdenados = [...players].sort((a, b) => {
      if (b.victories !== a.victories) {
        return b.victories - a.victories
      }
      return b.pontosTotais - a.pontosTotais
    })

    const novospairings = []
    while (playersOrdenados.length >= 2) {
      const jogador1 = playersOrdenados.shift()

      let jogador2 = playersOrdenados.find(
        (j) => !jogador1.historico.includes(j.name),
      )

      if (!jogador2) {
        jogador2 = playersOrdenados.shift()
      } else {
        const index = playersOrdenados.findIndex(
          (j) => j.name === jogador2.name,
        )
        playersOrdenados.splice(index, 1)
      }

      novospairings.push([jogador1.name, jogador2.name])
    }

    return novospairings
  }

  const registrarResultados = (resultados) => {
    const playersAtualizados = [...players]

    resultados.forEach((resultado, index) => {
      const [jogador1, jogador2] = pairings[index]
      const pontos1 = parseInt(resultado.pontos1, 10)
      const pontos2 = parseInt(resultado.pontos2, 10)

      const jogador1Obj = playersAtualizados.find((j) => j.name === jogador1)
      const jogador2Obj = playersAtualizados.find((j) => j.name === jogador2)

      jogador1Obj.pontosTotais += pontos1
      jogador2Obj.pontosTotais += pontos2

      if (resultado.vencedor === jogador1) {
        jogador1Obj.victories++
        jogador2Obj.derrotas++
      } else if (resultado.vencedor === jogador2) {
        jogador2Obj.victories++
        jogador1Obj.derrotas++
      }

      jogador1Obj.historico.push(jogador2)
      jogador2Obj.historico.push(jogador1)
    })

    setDisplayRank(true)
    setPlayers(playersAtualizados)
  }

  const terminarRodadaEIniciarNova = () => {
    encerrarRodada()
    const novospairings = emparelharplayers()
    iniciarRodada(novospairings)
  }

  const restart = () => {
    setPlayers([])
    setPairings([])
    localStorage.removeItem('players')
    localStorage.removeItem('pairings')
    setRoundStarted(false)
    setDisplayRank(true)
  }

  return (
    <div>
      <img
        className="logoRotate"
        src="/hcMkpBlack.png"
        style={{ width: 100 }}
      />
      <h1>Torneio Heroclix</h1>
      <AddPlayers onAddPlayer={addPlayer} />
      {displayRank && (
        <Ranking players={players} onUpdatePlayer={editarJogador} />
      )}

      {!roundStarted && (
        <ParingRounds players={players} onStartRound={iniciarRodada} />
      )}
      {roundStarted && (
        <div>
          <RoundResults
            pairings={pairings}
            onRecordResults={registrarResultados}
          />
          <button onClick={terminarRodadaEIniciarNova}>
            Terminar Rodada e Iniciar Nova
          </button>
        </div>
      )}
      {pairings && <button onClick={restart}>Reiniciar Torneio</button>}
    </div>
  )
}

export { App }
