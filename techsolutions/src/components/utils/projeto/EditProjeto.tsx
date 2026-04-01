import { RefObject, useRef, useState } from "react";
import { useProjetos } from "../../../context/Projetos";
import { ErrorModal } from "../../../modals/ErrorModal";

export const EditProjeto = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const context = useProjetos();

  const refsMap = useRef<{
    [key: number]: {
      nomeRef: RefObject<HTMLInputElement | null>;
      descRef: RefObject<HTMLInputElement | null>;
    };
  }>({});

  const getRefsForProjeto = (projetoId: number) => {
    if (!refsMap.current[projetoId]) {
      refsMap.current[projetoId] = {
        nomeRef: { current: null },
        descRef: { current: null },
      };
    }
    return refsMap.current[projetoId];
  };

  const handleEdit = (projetoId: number) => {
    const refs = getRefsForProjeto(projetoId);
    if (refs.nomeRef.current === null || refs.descRef.current === null) return;

    const nome = refs.nomeRef.current.value.trim();
    const desc = refs.descRef.current.value.trim();

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

    setErrorMessage("");
    context.editarProjeto(projetoId, nome, desc);
    refs.nomeRef.current.value = "";
    refs.descRef.current.value = "";
  };

  return (
    <div className="edit-projeto">
      {context.projetos.map((projeto) => {
        const refs = getRefsForProjeto(projeto.id);
        return (
          <div key={projeto.id} className="projeto">
            <input
              placeholder={projeto.nome}
              ref={refs.nomeRef}
              type="text"
              required
            ></input>
            <input
              placeholder={projeto.desc}
              ref={refs.descRef}
              type="text"
              required
            ></input>
            <button onClick={() => handleEdit(projeto.id)}>Editar</button>
            {errorMessage && <ErrorModal message={errorMessage} />}
          </div>
        );
      })}
    </div>
  );
};
