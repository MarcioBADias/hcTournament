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
  const [emparceiramentos, setEmparelhamentos] = useState(() => {
    const savedPairs = localStorage.getItem('emparceiramentos')
    return savedPairs ? JSON.parse(savedPairs) : []
  })
  const [rodadaIniciada, setRodadaIniciada] = useState(false)
  const [displayRank, setDisplayRank] = useState(true)

  useEffect(() => {
    localStorage.setItem('players', JSON.stringify(players))
  }, [players])

  useEffect(() => {
    localStorage.setItem('emparceiramentos', JSON.stringify(emparceiramentos))
  }, [emparceiramentos])

  const adicionarJogador = (nome) => {
    setPlayers([
      ...players,
      {
        nome,
        vitorias: 0,
        derrotas: 0,
        pontos: 0,
        pontosTotais: 0,
        historico: [],
      },
    ])
  }

  const editarJogador = (nomeAntigo, dadosAtualizados) => {
    const playersAtualizados = players.map((jogador) => {
      if (jogador.nome === nomeAntigo) {
        return { ...jogador, ...dadosAtualizados }
      }
      return jogador
    })

    // Atualizar emparceiramentos para refletir a mudança de nome, se necessário
    const emparceiramentosAtualizados = emparceiramentos.map((par) =>
      par.map((nome) => (nome === nomeAntigo ? dadosAtualizados.nome : nome)),
    )

    setPlayers(playersAtualizados)
    setEmparelhamentos(emparceiramentosAtualizados)
  }

  const iniciarRodada = (pares) => {
    setEmparelhamentos(pares)
    setRodadaIniciada(true)
    setDisplayRank(false)
  }

  const encerrarRodada = () => {
    setRodadaIniciada(false)
  }

  const emparelharplayers = () => {
    const playersOrdenados = [...players].sort((a, b) => {
      if (b.vitorias !== a.vitorias) {
        return b.vitorias - a.vitorias
      }
      return b.pontosTotais - a.pontosTotais
    })

    const novosEmparceiramentos = []
    while (playersOrdenados.length >= 2) {
      const jogador1 = playersOrdenados.shift()

      let jogador2 = playersOrdenados.find(
        (j) => !jogador1.historico.includes(j.nome),
      )

      if (!jogador2) {
        jogador2 = playersOrdenados.shift()
      } else {
        const index = playersOrdenados.findIndex(
          (j) => j.nome === jogador2.nome,
        )
        playersOrdenados.splice(index, 1)
      }

      novosEmparceiramentos.push([jogador1.nome, jogador2.nome])
    }

    return novosEmparceiramentos
  }

  const registrarResultados = (resultados) => {
    const playersAtualizados = [...players]

    resultados.forEach((resultado, index) => {
      const [jogador1, jogador2] = emparceiramentos[index]
      const pontos1 = parseInt(resultado.pontos1, 10)
      const pontos2 = parseInt(resultado.pontos2, 10)

      const jogador1Obj = playersAtualizados.find((j) => j.nome === jogador1)
      const jogador2Obj = playersAtualizados.find((j) => j.nome === jogador2)

      jogador1Obj.pontosTotais += pontos1
      jogador2Obj.pontosTotais += pontos2

      if (resultado.vencedor === jogador1) {
        jogador1Obj.vitorias++
        jogador2Obj.derrotas++
      } else if (resultado.vencedor === jogador2) {
        jogador2Obj.vitorias++
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
    const novosEmparceiramentos = emparelharplayers()
    iniciarRodada(novosEmparceiramentos)
  }

  const restart = () => {
    setPlayers([])
    setEmparelhamentos([])
    localStorage.removeItem('players')
    localStorage.removeItem('emparceiramentos')
    setRodadaIniciada(false)
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
      <AddPlayers onAddPlayer={adicionarJogador} />
      {displayRank && (
        <Ranking players={players} onUpdatePlayer={editarJogador} />
      )}

      {!rodadaIniciada && (
        <ParingRounds players={players} onStartRound={iniciarRodada} />
      )}
      {rodadaIniciada && (
        <div>
          <RoundResults
            emparceiramentos={emparceiramentos}
            onRecordResults={registrarResultados}
          />
          <button onClick={terminarRodadaEIniciarNova}>
            Terminar Rodada e Iniciar Nova
          </button>
        </div>
      )}
      {emparceiramentos && <button onClick={restart}>Reiniciar Torneio</button>}
    </div>
  )
}

export { App }
