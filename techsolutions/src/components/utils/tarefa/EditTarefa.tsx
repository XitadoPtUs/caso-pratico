import { useRef, useState } from "react";
import { useProjetos } from "../../../context/Projetos";
import { ErrorModal } from "../../../modals/ErrorModal";

export const EditTarefa = ({ projetoId }: { projetoId: number }) => {
  const [showError, setShowErrorMessage] = useState(false);
  const context = useProjetos();
  const nomeRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const dataRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLSelectElement>(null);

  const handleEdit = (tarefaId: number) => {
    if (
      nomeRef.current === null ||
      descRef.current === null ||
      dataRef.current === null ||
      statusRef.current === null
    ) return;
    if (nomeRef.current.value !== "" && descRef.current.value !== "" && dataRef.current.value !== "" && statusRef.current.value !== "") {
      setShowErrorMessage(false);
      const nome = nomeRef.current.value;
      const desc = descRef.current.value;
      const data = dataRef.current.value;
      const status = statusRef.current.value;

      if (new Date(data) < new Date()) {
        setShowErrorMessage(true);
        return;
      };

      context.editarTarefa(projetoId, tarefaId, nome, desc, data, status);
      nomeRef.current.value = "";
      descRef.current.value = "";
      dataRef.current.value = "";
      statusRef.current.value = "Pendente";
    } else {
      setShowErrorMessage(true);
    }
  };

  const projeto = context.projetos.find((p) => p.id === projetoId);
  const tarefas = projeto?.tarefas || [];

  return (
    <div className="edit-tarefa">
      {tarefas.map((tarefa) => (
        <div key={tarefa.id} className="tarefa">
          <span>
            {tarefa.nome} - {tarefa.status}
          </span>
          <input
            placeholder="Novo Nome"
            ref={nomeRef}
            type="text"
            required
          ></input>
          <input
            placeholder="Nova Descrição"
            ref={descRef}
            type="text"
            required
          ></input>
          <input ref={dataRef} type="date" required></input>
          <select ref={statusRef} required>
            <option value="Pendente">Pendente</option>
            <option value="Em Progresso">Em Progresso</option>
            <option value="Concluída">Concluida</option>
          </select>
          <button onClick={() => handleEdit(tarefa.id)}>Editar</button>
          <button onClick={() => context.removerTarefa(projetoId, tarefa.id)}>
            Remover
          </button>
          <div id="modal-root"></div>
          {showError && (
            <ErrorModal />
          )}
        </div>
      ))}
    </div>
  );
};
