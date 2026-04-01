import { useRef, useState } from "react";
import { useProjetos } from "../../../context/Projetos";
import { ErrorModal } from "../../../modals/ErrorModal";

export const EditProjeto = ({ projetoId }: { projetoId: number }) => {
  const [showError, setShowErrorMessage] = useState(false);
  const context = useProjetos();

  const refsMap = useRef<{
    [key: number]: {
      nomeRef: React.RefObject<HTMLInputElement | null>;
      descRef: React.RefObject<HTMLInputElement | null>;
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
    if (refs.nomeRef.current.value !== "" && refs.descRef.current.value !== "") {
      setShowErrorMessage(false);
      const nome = refs.nomeRef.current.value;
      const desc = refs.descRef.current.value;

      if (nome.trim().length < 3 || nome.trim().length > 15 || desc.trim().length < 10 || desc.trim().length > 25) {
        setShowErrorMessage(true);
        return;
      };

      context.editarProjeto(projetoId, nome, desc);
      refs.nomeRef.current.value = "";
      refs.descRef.current.value = "";
    } else {
      setShowErrorMessage(true);
    }
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
            <div id="modal-root"></div>
            {showError && <ErrorModal />}
          </div>
        );
      })}
    </div>
  );
};
