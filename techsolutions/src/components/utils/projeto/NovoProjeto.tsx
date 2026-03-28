import { useRef } from "react";
import { useProjetos } from "../../../context/Projetos";

export const NovoProjeto = () => {
  const context = useProjetos();
  const nomeRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (nomeRef.current === null || descRef.current === null) return;
    const nome = nomeRef.current.value;
    const desc = descRef.current.value;

    context.adicionarProjeto(nome, desc);
  };

  return (
    <div className="novo-projeto">
      <input placeholder="Nome" ref={nomeRef} type="text" required></input>
      <input placeholder="Nome" ref={descRef} type="text" required></input>
      <button onClick={handleAdd}>Adicionar</button>
    </div>
  );
};
