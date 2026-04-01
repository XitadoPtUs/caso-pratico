import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Project } from "../models/Project";
import { Task } from "../models/Task";

let idProjeto: number = 0;
let idTarefa: number = 0;

type ProjetosContextType = {
  projetos: Project[];
  adicionarProjeto: (nome: string, desc: string) => void;
  removerProjeto: (id: number) => void;
  editarProjeto: (id: number, nome: string, desc: string) => void;
  progressoConcluido: (projeto: Project) => number;
  adicionarTarefa: (
    projetoId: number,
    nome: string,
    desc: string,
    data: string,
    status: string,
  ) => void;
  removerTarefa: (projetoId: number, tarefaId: number) => void;
  editarTarefa: (
    projetoId: number,
    tarefaId: number,
    nome: string,
    desc: string,
    data: string,
    status: string,
  ) => void;
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
  const [projetos, setProjetos] = useState<Project[]>([]);

  useEffect(() => {
    localStorage.setItem('projetos', JSON.stringify(projetos));
  }, [projetos]);

  useEffect(() => {
    const projetosSalvos = localStorage.getItem('projetos');

    if (projetosSalvos) {
      setProjetos(JSON.parse(projetosSalvos));
    }
  }, []);

  const adicionarProjeto = (nome: string, desc: string) => {
    const novoProjeto = new Project(idProjeto++, nome, desc);
    setProjetos((prev) => [...prev, novoProjeto]);
  };

  const removerProjeto = (id: number) => {
    setProjetos((prev) => prev.filter((projeto) => projeto.id !== id));
  };

  const editarProjeto = (id: number, nome: string, desc: string) => {
    setProjetos((prev) =>
      prev.map((projeto) => {
        if (projeto.id === id) {
          return new Project(projeto.id, nome, desc, projeto.tarefas);
        }
        return projeto;
      }),
    );
  };

  const progressoConcluido = (projeto: Project) => {
    if (projeto.tarefas.length === 0) return 100;
    const tarefasConcluidas = projeto.tarefas.filter(
      (tarefa) => tarefa.status === "Concluída",
    ).length;
    return Math.round((tarefasConcluidas / projeto.tarefas.length) * 100);
  };

  const adicionarTarefa = (
    projetoId: number,
    nome: string,
    desc: string,
    data: string,
    status: string,
  ) => {
    setProjetos((prev) =>
      prev.map((projeto) => {
        if (projeto.id === projetoId) {
          const novaTarefa = new Task(idTarefa++, nome, desc, data, status);
          return new Project(projeto.id, projeto.nome, projeto.desc, [
            ...projeto.tarefas,
            novaTarefa,
          ]);
        }
        return projeto;
      }),
    );
  };

  const removerTarefa = (projetoId: number, tarefaId: number) => {
    setProjetos((prev) =>
      prev.map((projeto) => {
        if (projeto.id === projetoId) {
          const tarefasAtualizadas = projeto.tarefas.filter(
            (tarefa) => tarefa.id !== tarefaId,
          );
          return new Project(
            projeto.id,
            projeto.nome,
            projeto.desc,
            tarefasAtualizadas,
          );
        }
        return projeto;
      }),
    );
  };

  const editarTarefa = (
    projetoId: number,
    tarefaId: number,
    nome: string,
    desc: string,
    data: string,
    status: string,
  ) => {
    setProjetos((prev) =>
      prev.map((projeto) => {
        if (projeto.id === projetoId) {
          const tarefasAtualizadas = projeto.tarefas.map((tarefa) => {
            if (tarefa.id === tarefaId) {
              return new Task(tarefaId, nome, desc, data, status);
            }
            return tarefa;
          });
          return new Project(
            projeto.id,
            projeto.nome,
            projeto.desc,
            tarefasAtualizadas,
          );
        }
        return projeto;
      }),
    );
  };

  return (
    <ProjetosContext.Provider
      value={{
        projetos,
        adicionarProjeto,
        removerProjeto,
        editarProjeto,
        progressoConcluido,
        adicionarTarefa,
        removerTarefa,
        editarTarefa,
      }}
    >
      {children}
    </ProjetosContext.Provider>
  );
};
