import React, { useState } from 'react'

const RoundResults = ({ emparceiramentos, onRecordResults }) => {
  const [resultados, setResultados] = useState(
    emparceiramentos.map(() => ({ vencedor: '', pontos1: '', pontos2: '' }))
  );

  const handleResultChange = (index, field, value) => {
    const novosResultados = [...resultados];
    novosResultados[index][field] = value;
    setResultados(novosResultados);
  };

  const handleRecordResults = () => {
    onRecordResults(resultados);
    setResultados(emparceiramentos.map(() => ({ vencedor: '', pontos1: '', pontos2: '' })));
  };

  return (
    <div>
      <h2>Registrar Resultados</h2>
      <ul>
        {emparceiramentos.map((par, index) => (
          <li key={index}>
            {par[0]} vs {par[1]}
            <select
              onChange={(e) => handleResultChange(index, 'vencedor', e.target.value)}
              value={resultados[index].vencedor}
            >
              <option value="">Selecione o vencedor</option>
              <option value={par[0]}>{par[0]}</option>
              <option value={par[1]}>{par[1]}</option>
              <option value="empate">Empate</option>
            </select>
            <input
              type="number"
              placeholder={`Pontos de ${par[0]}`}
              value={resultados[index].pontos1}
              onChange={(e) => handleResultChange(index, 'pontos1', e.target.value)}
            />
            <input
              type="number"
              placeholder={`Pontos de ${par[1]}`}
              value={resultados[index].pontos2}
              onChange={(e) => handleResultChange(index, 'pontos2', e.target.value)}
            />
          </li>
        ))}
      </ul>
      <button onClick={handleRecordResults}>Registrar Resultados</button>
    </div>
  );
}

export { RoundResults }
