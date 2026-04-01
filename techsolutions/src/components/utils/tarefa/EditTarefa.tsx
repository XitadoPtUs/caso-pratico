import { useRef, useState } from "react";
import { useProjetos } from "../../../context/Projetos";
import { ErrorModal } from "../../../modals/ErrorModal";

export const EditTarefa = ({ projetoId }: { projetoId: number }) => {
  const [showError, setShowErrorMessage] = useState(false);
  const context = useProjetos();

  const refsMap = useRef<{
    [key: number]: {
      nomeRef: React.RefObject<HTMLInputElement | null>;
      descRef: React.RefObject<HTMLInputElement | null>;
      dataRef: React.RefObject<HTMLInputElement | null>;
      statusRef: React.RefObject<HTMLSelectElement | null>;
    };
  }>({});

  const getRefsForTarefa = (tarefaId: number) => {
    if (!refsMap.current[tarefaId]) {
      refsMap.current[tarefaId] = {
        nomeRef: {current: null},
        descRef: {current: null},
        dataRef: {current: null},
        statusRef: {current: null},
      };
    }
    return refsMap.current[tarefaId];
  };

  const handleEdit = (tarefaId: number) => {
    const refs = getRefsForTarefa(tarefaId);
    if (
      refs.nomeRef.current === null ||
      refs.descRef.current === null ||
      refs.dataRef.current === null ||
      refs.statusRef.current === null
    ) return;
    if (refs.nomeRef.current.value !== "" && refs.descRef.current.value !== "" && refs.dataRef.current.value !== "" && refs.statusRef.current.value !== "") {
      setShowErrorMessage(false);
      const nome = refs.nomeRef.current.value;
      const desc = refs.descRef.current.value;
      const data = refs.dataRef.current.value;
      const status = refs.statusRef.current.value;

      if (nome.trim().length < 3 || nome.trim().length > 15 || desc.trim().length < 10 || desc.trim().length > 25) {
        setShowErrorMessage(true);
        return;
      };

      if ((new Date(data) < new Date()) || (new Date(data).getFullYear() > 2200)) {
        setShowErrorMessage(true);
        return;
      };

      context.editarTarefa(projetoId, tarefaId, nome, desc, data, status);
      refs.nomeRef.current.value = "";
      refs.descRef.current.value = "";
      refs.dataRef.current.value = "";
      refs.statusRef.current.value = "Pendente";
    } else {
      setShowErrorMessage(true);
    }
  };

  const projeto = context.projetos.find((p) => p.id === projetoId);
  const tarefas = projeto?.tarefas || [];

  return (
    <div className="edit-tarefa">
      {tarefas.map((tarefa) => {
        const refs = getRefsForTarefa(tarefa.id);
        return (
          <div key={tarefa.id} className="tarefa">
            <span>
              {tarefa.nome} - {tarefa.status}
            </span>
            <input
              placeholder="Novo Nome"
              ref={refs.nomeRef}
              type="text"
              required
            ></input>
            <input
              placeholder="Nova Descrição"
              ref={refs.descRef}
              type="text"
              required
            ></input>
            <input ref={refs.dataRef} type="date" required></input>
            <select ref={refs.statusRef} required>
              <option value="Pendente">Pendente</option>
              <option value="Em Progresso">Em Progresso</option>
              <option value="Concluída">Concluida</option>
            </select>
            <button onClick={() => handleEdit(tarefa.id)}>Editar</button>
            <button onClick={() => context.removerTarefa(projetoId, tarefa.id)}>
              Remover
            </button>
            <div id="modal-root"></div>
            {showError && <ErrorModal />}
          </div>
        );
      })}
    </div>
  );
};
