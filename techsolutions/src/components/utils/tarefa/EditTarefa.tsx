import { RefObject, useRef, useState } from "react";
import { useProjetos } from "../../../context/Projetos";
import { ErrorModal } from "../../../modals/ErrorModal";

export const EditTarefa = ({ projetoId }: { projetoId: string | number }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const context = useProjetos();

  const refsMap = useRef<{
    [key: string]: {
      nomeRef: RefObject<HTMLInputElement | null>;
      descRef: RefObject<HTMLInputElement | null>;
      dataRef: RefObject<HTMLInputElement | null>;
      statusRef: RefObject<HTMLSelectElement | null>;
    };
  }>({});

  const getRefsForTarefa = (tarefaId: string | number) => {
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

  const handleEdit = (tarefaId: string | number) => {
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

    const projetoAtual = context.projetos.find((p) => p.id === projetoId);
    const duplicado = projetoAtual?.tarefas.some(
      (t) => t.id !== tarefaId && t.nome.toLowerCase() === nome.toLowerCase()
    );
    if (duplicado) {
      setErrorMessage("Já existe uma tarefa com esse nome neste projeto.");
      return;
    }

    setErrorMessage("");
    context.editarTarefa(projetoId, tarefaId, nome, desc, data, status);
    refs.nomeRef.current.value = "";
    refs.descRef.current.value = "";
    refs.dataRef.current.value = "";
    refs.statusRef.current.value = "Pendente";
    setEditingId(null);
  };

  const trocarStatus = (tarefaId: string | number) => {
    const projeto = context.projetos.find((p) => p.id === projetoId);
    const tarefa = projeto?.tarefas.find((t) => t.id === tarefaId);
    if (!projeto || !tarefa) return;
    const novoStatus =
      tarefa.status === "Pendente"
        ? "Em Progresso"
        : tarefa.status === "Em Progresso"
          ? "Concluída"
          : "Pendente";
    context.editarTarefa(
      projetoId,
      tarefaId,
      tarefa.nome,
      tarefa.desc,
      tarefa.data,
      novoStatus
    );
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Pendente":
        return "pendente";
      case "Em Progresso":
        return "em-progresso";
      case "Concluída":
        return "concluida";
      default:
        return "pendente";
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("pt-PT", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const projeto = context.projetos.find((p) => p.id === projetoId);
  const tarefas = projeto?.tarefas || [];

  if (tarefas.length === 0) {
    return (
      <div className="task-list-empty">
        <div className="task-list-empty-icon">📝</div>
        <div>Nenhuma tarefa criada</div>
      </div>
    );
  }

  return (
    <div>
      {tarefas.map((tarefa) => {
        const refs = getRefsForTarefa(tarefa.id);
        const statusKey = getStatusClass(tarefa.status);
        const isEditing = editingId === tarefa.id;

        return (
          <div
            key={tarefa.id}
            className={`task-item task-item-${statusKey}`}
          >
            <div className="task-item-header">
              <span className="task-item-name">{tarefa.nome}</span>
              <span
                className={`task-item-status task-item-status-${statusKey}`}
                onClick={() => trocarStatus(tarefa.id)}
                title="Clique para alterar status"
              >
                {tarefa.status}
              </span>
            </div>

            {tarefa.desc && (
              <p className="task-item-desc">{tarefa.desc}</p>
            )}

            <div className="task-item-meta">
              <span className="task-item-date">
                {formatDate(tarefa.data)}
              </span>
            </div>

            <div className="task-item-actions">
              <button
                className="task-item-btn task-item-btn-edit"
                onClick={() =>
                  setEditingId(isEditing ? null : tarefa.id)
                }
              >
                {isEditing ? '✕ Fechar' : '✏️ Editar'}
              </button>
              <button
                className="task-item-btn task-item-btn-remove"
                onClick={() =>
                  context.removerTarefa(projetoId, tarefa.id)
                }
              >
                🗑 Remover
              </button>
            </div>

            {isEditing && (
              <div className="task-item-edit-form">
                <input
                  placeholder="Novo Nome"
                  ref={refs.nomeRef}
                  type="text"
                  required
                />
                <input
                  placeholder="Nova Descrição"
                  ref={refs.descRef}
                  type="text"
                  required
                />
                <input ref={refs.dataRef} type="date" required />
                <select ref={refs.statusRef} required>
                  <option value="Pendente">Pendente</option>
                  <option value="Em Progresso">Em Progresso</option>
                  <option value="Concluída">Concluída</option>
                </select>
                <div className="task-item-edit-actions">
                  <button
                    className="new-task-submit"
                    onClick={() => handleEdit(tarefa.id)}
                  >
                    Guardar
                  </button>
                </div>
                {errorMessage && <ErrorModal message={errorMessage} />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
