import { useRef } from "react";
import { useTarefas } from "../../../context/Tarefas";

export const NovaTarefa = () => {
  const context = useTarefas();
  const nomeRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const dataRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  const handleAdd = () => {
    if (
      nomeRef.current === null ||
      descRef.current === null ||
      dataRef.current === null ||
      statusRef.current === null
    )
      return;
    const nome = nomeRef.current.value;
    const desc = descRef.current.value;
    const data = dataRef.current.value;
    const status = statusRef.current.value;

    context.adicionarTarefa(nome, desc, data, status);
  };

  return (
    <div className="nova-tarefa">
      <input placeholder="Nome" ref={nomeRef} type="text" required></input>
      <input placeholder="Desc" ref={descRef} type="text" required></input>
      <input placeholder="Data" ref={descRef} type="date" required></input>
      <select ref={statusRef} required>
        <option value="Pendente">Pendente</option>
        <option value="Em Progresso">Em Progresso</option>
        <option value="Concluída">Concluida</option>
      </select>
      <button onClick={handleAdd}>Adicionar</button>
    </div>
  );
};
