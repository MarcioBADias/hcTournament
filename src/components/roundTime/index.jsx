import React, { useState, useEffect } from 'react'

const RoundTime = ({ onEndRound }) => {
  const [tempoRestante, setTempoRestante] = useState(45 * 60) // 45 minutos em segundos

  useEffect(() => {
    const interval = setInterval(() => {
      setTempoRestante((prev) => Math.max(prev - 1, 0))
    }, 1000)

    if (tempoRestante === 0) {
      clearInterval(interval)
      onEndRound()
    }

    return () => {
      clearInterval(interval)
    }
  }, [tempoRestante, onEndRound])

  const formatarTempo = (segundos) => {
    const minutos = Math.floor(segundos / 60)
    const segRestantes = segundos % 60
    return `${minutos}:${segRestantes.toString().padStart(2, '0')}`
  }

  return (
    <div>
      <h2>Cronômetro da Rodada</h2>
      <p>Tempo Restante: {formatarTempo(tempoRestante)}</p>
    </div>
  )
}

export { RoundTime }
