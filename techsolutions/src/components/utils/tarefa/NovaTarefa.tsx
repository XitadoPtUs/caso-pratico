import { useRef, useState } from "react";
import { useProjetos } from "../../../context/Projetos";
import { ErrorModal } from "../../../modals/ErrorModal";

export const NovaTarefa = ({ projetoId }: { projetoId: number }) => {
  const [showError, setShowErrorMessage] = useState(false);
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
    if (nomeRef.current.value !== "" && descRef.current.value !== "" && dataRef.current.value !== "" && statusRef.current.value !== "") {
      setShowErrorMessage(false);
      const nome = nomeRef.current.value;
      const desc = descRef.current.value;
      const data = dataRef.current.value;
      const status = statusRef.current.value;

      if (nomeRef.current.value.trim().length < 3 || nomeRef.current.value.trim().length > 15 || descRef.current.value.trim().length < 10 || descRef.current.value.trim().length > 25) {
        setShowErrorMessage(true);
        return;
      };

      if ((new Date(data) < new Date()) || (new Date(data).getFullYear() > (new Date().getFullYear() + 200))) {
        setShowErrorMessage(true);
        return;
      };

      context.adicionarTarefa(projetoId, nome, desc, data, status);
      nomeRef.current.value = "";
      descRef.current.value = "";
      dataRef.current.value = "";
      statusRef.current.value = "Pendente";
    } else {
      setShowErrorMessage(true);
    }
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
      <div id="modal-root"></div>
      {showError && (
        <ErrorModal />
      )}
    </div>
  );
};
