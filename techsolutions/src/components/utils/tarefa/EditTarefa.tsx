import { RefObject, useRef, useState } from "react";
import { useProjetos } from "../../../context/Projetos";
import { ErrorModal } from "../../../modals/ErrorModal";

export const EditTarefa = ({ projetoId }: { projetoId: number }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const context = useProjetos();

  const refsMap = useRef<{
    [key: number]: {
      nomeRef: RefObject<HTMLInputElement | null>;
      descRef: RefObject<HTMLInputElement | null>;
      dataRef: RefObject<HTMLInputElement | null>;
      statusRef: RefObject<HTMLSelectElement | null>;
    };
  }>({});

  const getRefsForTarefa = (tarefaId: number) => {
    if (!refsMap.current[tarefaId]) {
      refsMap.current[tarefaId] = {
        nomeRef: { current: null },
        descRef: { current: null },
        dataRef: { current: null },
        statusRef: { current: null },
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

    const nome = refs.nomeRef.current.value.trim();
    const desc = refs.descRef.current.value.trim();
    const data = refs.dataRef.current.value;
    const status = refs.statusRef.current.value;

    if (!nome || !desc || !data || !status) {
      setErrorMessage("Por favor, preencha todos os campos da tarefa.");
      return;
    }

    if (nome.length < 3 || nome.length > 15) {
      setErrorMessage("O nome da tarefa deve ter entre 3 e 15 caracteres.");
      return;
    }

    if (desc.length < 10 || desc.length > 25) {
      setErrorMessage("A descrição da tarefa deve ter entre 10 e 25 caracteres.");
      return;
    }

    const dataEscolhida = new Date(data);
    const hoje = new Date();
    if (dataEscolhida < hoje || dataEscolhida.getFullYear() > hoje.getFullYear() + 200) {
      setErrorMessage("Data da tarefa inválida. Escolha uma data futura válida.");
      return;
    }

    setErrorMessage("");
    context.editarTarefa(projetoId, tarefaId, nome, desc, data, status);
    refs.nomeRef.current.value = "";
    refs.descRef.current.value = "";
    refs.dataRef.current.value = "";
    refs.statusRef.current.value = "Pendente";
  };

  const trocarStatus = (tarefaId: number) => {
    const projeto = context.projetos.find((p) => p.id === projetoId);
    const tarefa = projeto?.tarefas.find((t) => t.id === tarefaId);
    if (!projeto || !tarefa) return;
    const novoStatus = tarefa.status === "Pendente" ? "Em Progresso" : tarefa.status === "Em Progresso" ? "Concluída" : "Pendente";
    context.editarTarefa(projetoId, tarefaId, tarefa.nome, tarefa.desc, tarefa.data, novoStatus);
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
            <button onClick={() => trocarStatus(tarefa.id)}>Alterar Status</button>
            {errorMessage && <ErrorModal message={errorMessage} />}
          </div>
        );
      })}
    </div>
  );
};
