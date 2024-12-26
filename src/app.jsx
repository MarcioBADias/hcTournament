import React, { useState, useEffect } from 'react'
import { Ranking } from './components/ranking'
import { AddPlayers } from './components/addPlayers'
import { ParingRounds } from './components/paringRounds'
import { RoundTime } from './components/roundTime'
import { RoundResults } from './components/roundResults'

const App = () => {
  const [jogadores, setJogadores] = useState(() => {
    const savedPlayers = localStorage.getItem('jogadores')
    return savedPlayers ? JSON.parse(savedPlayers) : []
  })
  const [emparceiramentos, setEmparelhamentos] = useState(() => {
    const savedPairs = localStorage.getItem('emparceiramentos')
    return savedPairs ? JSON.parse(savedPairs) : []
  })
  const [rodadaIniciada, setRodadaIniciada] = useState(false)

  useEffect(() => {
    localStorage.setItem('jogadores', JSON.stringify(jogadores))
  }, [jogadores])

  useEffect(() => {
    localStorage.setItem('emparceiramentos', JSON.stringify(emparceiramentos))
  }, [emparceiramentos])

  const adicionarJogador = (nome) => {
    setJogadores([
      ...jogadores,
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
    const jogadoresAtualizados = jogadores.map((jogador) => {
      if (jogador.nome === nomeAntigo) {
        return { ...jogador, ...dadosAtualizados }
      }
      return jogador
    })

    // Atualizar emparceiramentos para refletir a mudança de nome, se necessário
    const emparceiramentosAtualizados = emparceiramentos.map((par) =>
      par.map((nome) => (nome === nomeAntigo ? dadosAtualizados.nome : nome)),
    )

    setJogadores(jogadoresAtualizados)
    setEmparelhamentos(emparceiramentosAtualizados)
  }

  const iniciarRodada = (pares) => {
    setEmparelhamentos(pares)
    setRodadaIniciada(true)
  }

  const encerrarRodada = () => {
    setRodadaIniciada(false)
  }

  const emparelharJogadores = () => {
    const jogadoresOrdenados = [...jogadores].sort((a, b) => {
      if (b.vitorias !== a.vitorias) {
        return b.vitorias - a.vitorias
      }
      return b.pontosTotais - a.pontosTotais
    })

    const novosEmparceiramentos = []
    while (jogadoresOrdenados.length >= 2) {
      const jogador1 = jogadoresOrdenados.shift()

      let jogador2 = jogadoresOrdenados.find(
        (j) => !jogador1.historico.includes(j.nome),
      )

      if (!jogador2) {
        jogador2 = jogadoresOrdenados.shift()
      } else {
        const index = jogadoresOrdenados.findIndex(
          (j) => j.nome === jogador2.nome,
        )
        jogadoresOrdenados.splice(index, 1)
      }

      novosEmparceiramentos.push([jogador1.nome, jogador2.nome])
    }

    return novosEmparceiramentos
  }

  const registrarResultados = (resultados) => {
    const jogadoresAtualizados = [...jogadores]

    resultados.forEach((resultado, index) => {
      const [jogador1, jogador2] = emparceiramentos[index]
      const pontos1 = parseInt(resultado.pontos1, 10)
      const pontos2 = parseInt(resultado.pontos2, 10)

      const jogador1Obj = jogadoresAtualizados.find((j) => j.nome === jogador1)
      const jogador2Obj = jogadoresAtualizados.find((j) => j.nome === jogador2)

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

    setJogadores(jogadoresAtualizados)
  }

  const terminarRodadaEIniciarNova = () => {
    encerrarRodada()
    const novosEmparceiramentos = emparelharJogadores()
    iniciarRodada(novosEmparceiramentos)
  }

  const restart = () => {
    setJogadores([])
    setEmparelhamentos([])
    localStorage.removeItem('jogadores')
    localStorage.removeItem('emparceiramentos')
    setRodadaIniciada(false)
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
      <Ranking jogadores={jogadores} onUpdatePlayer={editarJogador} />

      {!rodadaIniciada && (
        <ParingRounds jogadores={jogadores} onStartRound={iniciarRodada} />
      )}
      {rodadaIniciada && (
        <div>
          <RoundTime onEndRound={encerrarRodada} />
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
