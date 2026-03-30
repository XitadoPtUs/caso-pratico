import { useRef, useState } from "react";
import { useProjetos } from "../../../context/Projetos";
import { ErrorModal } from "../../../modals/ErrorModal";

export const NovoProjeto = () => {
  const [showError, setShowErrorMessage] = useState(false);
  const context = useProjetos();
  const nomeRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (nomeRef.current === null || descRef.current === null) return;
    if (nomeRef.current.value !== "" && descRef.current.value !== "") {
      setShowErrorMessage(false);
      const nome = nomeRef.current.value;
      const desc = descRef.current.value;

      context.adicionarProjeto(nome, desc);
      nomeRef.current.value = "";
      descRef.current.value = "";
    } else {
      setShowErrorMessage(true);
    }
  };

  return (
    <div className="novo-projeto">
      <input placeholder="Nome" ref={nomeRef} type="text" required></input>
      <input placeholder="Nome" ref={descRef} type="text" required></input>
      <button onClick={handleAdd}>Adicionar</button>
      <div id="modal-root"></div>
      {showError && (
        <ErrorModal />
      )}
    </div>
  );
};

function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div id="modal-root"></div>
      {showModal && (
        <ErrorModal />

      )}
      <button onClick={() => setShowModal(true)}>show Modal</button>
    </div>
  );
}
export default App

