import React, { useState } from 'react'
import { Ranking } from './components/ranking'
import { AddPlayers } from './components/addPlayers'
import { ParingRounds } from './components/paringRounds'
import { RoundTime } from './components/roundTime'
import { RoundResults } from './components/roundResults'

function App() {
  const [jogadores, setJogadores] = useState([])
  const [emparceiramentos, setEmparelhamentos] = useState([])
  const [rodadaIniciada, setRodadaIniciada] = useState(false)

  const adicionarJogador = (nome) => {
    setJogadores([
      ...jogadores,
      { nome, vitorias: 0, derrotas: 0, pontos: 0, pontosTotais: 0 },
    ])
  }

  const iniciarRodada = (pares) => {
    setEmparelhamentos(pares)
    setRodadaIniciada(true)
  }

  const encerrarRodada = () => {
    setRodadaIniciada(false)
  }

  const emparelharJogadores = () => {
    // Ordenar jogadores por vitórias e pontos acumulados
    const jogadoresOrdenados = [...jogadores].sort((a, b) => {
      if (b.vitorias !== a.vitorias) {
        return b.vitorias - a.vitorias
      }
      return b.pontosTotais - a.pontosTotais // Critério de desempate
    })

    const novosEmparceiramentos = []
    while (jogadoresOrdenados.length >= 2) {
      const jogador1 = jogadoresOrdenados.shift()

      // Encontrar um jogador que não esteja no histórico
      let jogador2 = jogadoresOrdenados.find(
        (j) => !jogador1.historico?.includes(j.nome),
      )

      if (!jogador2) {
        jogador2 = jogadoresOrdenados.shift() // Se não houver nenhum jogador disponível que não esteja no histórico
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

      // Adicionando pontos
      jogador1Obj.pontosTotais += pontos1
      jogador2Obj.pontosTotais += pontos2

      // Atualizando vitórias e derrotas
      if (resultado.vencedor === jogador1) {
        jogador1Obj.vitorias++
        jogador2Obj.derrotas++
      } else if (resultado.vencedor === jogador2) {
        jogador2Obj.vitorias++
        jogador1Obj.derrotas++
      }

      // Atualizando o histórico para evitar futuros confrontos repetidos
      jogador1Obj.historico = jogador1Obj.historico || []
      jogador2Obj.historico = jogador2Obj.historico || []
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

  return (
    <div>
      <h1>Torneio Heroclix</h1>
      <AddPlayers onAddPlayer={adicionarJogador} />
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
      <Ranking jogadores={jogadores} />
    </div>
  )
}

export { App }
