import { useRef, useState } from "react";
import { useProjetos } from "../../../context/Projetos";
import { ErrorModal } from "../../../modals/ErrorModal";

export const NovoProjeto = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const context = useProjetos();
  const nomeRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
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
      (p) => p.nome.toLowerCase() === nome.toLowerCase()
    );
    if (duplicado) {
      setErrorMessage("Já existe um projeto com esse nome.");
      return;
    }

    setErrorMessage("");
    context.adicionarProjeto(nome, desc);
    nomeRef.current.value = "";
    descRef.current.value = "";
  };

  return (
    <div className="new-project">
      <h3 className="new-project-title">
        <span className="new-project-title-icon">＋</span>
        Novo Projeto
      </h3>
      <div className="new-project-form">
        <input placeholder="Nome do projeto" ref={nomeRef} type="text" required />
        <input placeholder="Descrição do projeto" ref={descRef} type="text" required />
        <button className="new-project-btn" onClick={handleAdd}>
          Criar Projeto
        </button>
      </div>
      {errorMessage && <ErrorModal message={errorMessage} />}
    </div>
  );
};
