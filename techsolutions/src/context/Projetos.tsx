import { createContext, useContext, useState, ReactNode } from "react";

let idProjeto: number = 0;

type Projeto = {
  id: number;
  nome: string;
  desc: string;
};

type ProjetosContextType = {
  projetos: Projeto[];
  adicionarProjeto: (nome: string, desc: string) => void;
  removerProjeto: (id: number) => void;
  editarProjeto: (id: number, nome: string, desc: string) => void;
};

const ProjetosContext = createContext<ProjetosContextType | undefined>(
  undefined,
);

// eslint-disable-next-line react-refresh/only-export-components
export const useProjetos = () => {
  const context = useContext(ProjetosContext);

  if (!context) {
    throw new Error("useProjetos deve ser usado dentro de um ProjetosProvider");
  }

  return context;
};

export const ProjetosProvider = ({ children }: { children: ReactNode }) => {
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  const adicionarProjeto = (nome: string, desc: string) => {
    const novoProjeto = {
      id: idProjeto++,
      nome: nome,
      desc: desc,
    };

    setProjetos((prev) => [...prev, novoProjeto]);
  };

  const removerProjeto = (id: number) => {
    setProjetos((prev) => prev.filter((projetos) => projetos.id !== id));
  };

  const editarProjeto = (id: number, nome: string, desc: string) => {
    setProjetos((prev) =>
      prev.map((projeto) => {
        if (projeto.id === id) {
          return { ...projeto, nome, desc };
        }
        return projeto;
      }),
    );
  };

  return (
    <ProjetosContext.Provider
      value={{ projetos, adicionarProjeto, removerProjeto, editarProjeto }}
    >
      {children}
    </ProjetosContext.Provider>
  );
};
