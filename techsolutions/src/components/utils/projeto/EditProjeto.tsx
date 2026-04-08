import { useRef, useState } from "react";
import { useProjetos } from "../../../context/Projetos";
import { ErrorModal } from "../../../modals/ErrorModal";

export const EditProjeto = ({ projetoId }: { projetoId: string | number }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const context = useProjetos();
  const nomeRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  const projeto = context.projetos.find((p) => p.id === projetoId);
  if (!projeto) return null;

  const handleEdit = () => {
    if (nomeRef.current === null || descRef.current === null) return;

    const nome = nomeRef.current.value.trim();
    const desc = descRef.current.value.trim();

    if (!nome || !desc) {
      setErrorMessage("Por favor, preencha todos os campos do projeto.");
      return;
    }

    if (nome.length < 3 || nome.length > 15) {
      setErrorMessage("O nome do projeto deve ter entre 3 e 15 caracteres.");
      return;
    }

    if (desc.length < 10 || desc.length > 25) {
      setErrorMessage("A descrição do projeto deve ter entre 10 e 25 caracteres.");
      return;
    }

    const duplicado = context.projetos.some(
      (p) => p.id !== projetoId && p.nome.toLowerCase() === nome.toLowerCase()
    );
    if (duplicado) {
      setErrorMessage("Já existe um projeto com esse nome.");
      return;
    }

    setErrorMessage("");
    context.editarProjeto(projetoId, nome, desc);
    nomeRef.current.value = "";
    descRef.current.value = "";
  };

  return (
    <div className="edit-project">
      <div className="edit-project-form">
        <input
          placeholder={projeto.nome}
          ref={nomeRef}
          type="text"
          required
        />
        <input
          placeholder={projeto.desc}
          ref={descRef}
          type="text"
          required
        />
        <button className="edit-project-btn" onClick={handleEdit}>
          ✏️ Editar
        </button>
      </div>
      {errorMessage && <ErrorModal message={errorMessage} />}
    </div>
  );
};
