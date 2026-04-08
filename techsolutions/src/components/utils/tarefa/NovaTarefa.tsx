import { useRef, useState } from "react";
import { useProjetos } from "../../../context/Projetos";
import { ErrorModal } from "../../../modals/ErrorModal";

export const NovaTarefa = ({ projetoId }: { projetoId: string | number }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const context = useProjetos();
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
    ) return;

    const nome = nomeRef.current.value.trim();
    const desc = descRef.current.value.trim();
    const data = dataRef.current.value;
    const status = statusRef.current.value;

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

    const projeto = context.projetos.find((p) => p.id === projetoId);
    const duplicado = projeto?.tarefas.some(
      (t) => t.nome.toLowerCase() === nome.toLowerCase()
    );
    if (duplicado) {
      setErrorMessage("Já existe uma tarefa com esse nome neste projeto.");
      return;
    }

    setErrorMessage("");
    context.adicionarTarefa(projetoId, nome, desc, data, status);
    nomeRef.current.value = "";
    descRef.current.value = "";
    dataRef.current.value = "";
    statusRef.current.value = "Pendente";
    setIsOpen(false);
  };

  return (
    <div className="new-task">
      {!isOpen ? (
        <button
          className="new-task-toggle"
          onClick={() => setIsOpen(true)}
        >
          ＋ Adicionar Tarefa
        </button>
      ) : (
        <>
          <div className="new-task-form">
            <input
              placeholder="Nome da tarefa"
              ref={nomeRef}
              type="text"
              required
            />
            <input
              placeholder="Descrição"
              ref={descRef}
              type="text"
              required
            />
            <input ref={dataRef} type="date" required />
            <select ref={statusRef} required>
              <option value="Pendente">Pendente</option>
              <option value="Em Progresso">Em Progresso</option>
              <option value="Concluída">Concluída</option>
            </select>
            <button className="new-task-submit" onClick={handleAdd}>
              Criar Tarefa
            </button>
          </div>
          {errorMessage && <ErrorModal message={errorMessage} />}
        </>
      )}
    </div>
  );
};
