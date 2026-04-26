import { useState } from 'react'
import './App.css'

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [textoTarefa, setTextoTarefa] = useState('');

  const adicionarTarefa = (e) => {
    e.preventDefault();
    if (textoTarefa.trim() === '') return;

    const novaTarefa = {
      id: Date.now(),
      text: textoTarefa
    };

    setTarefas([...tarefas, novaTarefa]);
    setTextoTarefa('');
  };

  const removerTarefa = (id) => {
    const listaFiltrada = tarefas.filter(t => t.id !== id);
    setTarefas(listaFiltrada);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>

      <form onSubmit={adicionarTarefa}>
        <input 
          type="text" 
          placeholder="Nova tarefa..."
          value={textoTarefa}
          onChange={(e) => setTextoTarefa(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>

      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            {tarefa.text}
            <button onClick={() => removerTarefa(tarefa.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App