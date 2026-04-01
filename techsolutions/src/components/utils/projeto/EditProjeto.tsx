import { useRef, useState } from "react";
import { useProjetos } from "../../../context/Projetos";
import { ErrorModal } from "../../../modals/ErrorModal";

export const EditProjeto = ({ projetoId }: { projetoId: number }) => {
  const [showError, setShowErrorMessage] = useState(false);
  const context = useProjetos();
  const nomeRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => {
    if (nomeRef.current === null || descRef.current === null) return;
    if (nomeRef.current.value !== "" && descRef.current.value !== "") {
      setShowErrorMessage(false);
      const nome = nomeRef.current.value;
      const desc = descRef.current.value;

      if (nomeRef.current.value.trim().length < 3 || nomeRef.current.value.trim().length > 15 || descRef.current.value.trim().length < 10 || descRef.current.value.trim().length > 25) {
        setShowErrorMessage(true);
        return;
      };

      context.editarProjeto(projetoId, nome, desc);
      nomeRef.current.value = "";
      descRef.current.value = "";
    } else {
      setShowErrorMessage(true);
    }
  };

  return (
    <div className="edit-projeto">
      {context.projetos.map((projeto) => (
        <div key={projeto.id} className="projeto">
          <input
            placeholder={projeto.nome}
            ref={nomeRef}
            type="text"
            required
          ></input>
          <input
            placeholder={projeto.desc}
            ref={descRef}
            type="text"
            required
          ></input>
          <button onClick={handleEdit}>Editar</button>
          <div id="modal-root"></div>
          {showError && (
            <ErrorModal />
          )}
        </div>
      ))}
    </div>
  );
};
