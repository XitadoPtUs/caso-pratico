import { useRef } from "react";
import { useTarefas } from "../../../context/Tarefas";

export const EditTarefa = () => {
  const context = useTarefas();
  const nomeRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const dataRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  const handleEdit = () => {
    if (
      nomeRef.current === null ||
      descRef.current === null ||
      dataRef.current === null ||
      statusRef.current === null
    )
      return;
    const id = 0; // placeholder por enquanto... tenho de informar qual é o id para aqui
    const nome = nomeRef.current.value;
    const desc = descRef.current?.value;
    const data = dataRef.current?.value;
    const status = statusRef.current?.value;

    context.editarTarefa(id, nome, desc, data, status);
  };

  return (
    <div className="edit-tarefa">
      {context.tarefas.map((tarefa) => (
        <div key={tarefa.id} className="tarefa">
          <input
            placeholder={tarefa.nome}
            ref={nomeRef}
            type="text"
            required
          ></input>
          <input
            placeholder={tarefa.desc}
            ref={descRef}
            type="text"
            required
          ></input>
          <input
            placeholder={tarefa.data}
            ref={dataRef}
            type="date"
            required
          ></input>
          <select ref={statusRef} required>
            <option value="Pendente">Pendente</option>
            <option value="Em Progresso">Em Progresso</option>
            <option value="Concluída">Concluida</option>
          </select>
          <button onClick={handleEdit}>Editar</button>
        </div>
      ))}
    </div>
  );
};
