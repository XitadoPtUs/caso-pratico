import { useRef, useState } from "react";
import { useProjetos } from "../../../context/Projetos";
import { ErrorModal } from "../../../modals/ErrorModal";

export const NovaTarefa = ({ projetoId }: { projetoId: number }) => {
  const [errorMessage, setErrorMessage] = useState("");
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

    setErrorMessage("");
    context.adicionarTarefa(projetoId, nome, desc, data, status);
    nomeRef.current.value = "";
    descRef.current.value = "";
    dataRef.current.value = "";
    statusRef.current.value = "Pendente";
  };

  return (
    <div className="nova-tarefa">
      <input
        placeholder="Nova Tarefa"
        ref={nomeRef}
        type="text"
        required
      ></input>
      <input placeholder="Desc" ref={descRef} type="text" required></input>
      <input placeholder="Data" ref={dataRef} type="date" required></input>
      <select ref={statusRef} required>
        <option value="Pendente">Pendente</option>
        <option value="Em Progresso">Em Progresso</option>
        <option value="Concluída">Concluida</option>
      </select>
      <button onClick={handleAdd}>Adicionar Tarefa</button>
      {errorMessage && (
        <ErrorModal message={errorMessage} />
      )}
    </div>
  );
};
