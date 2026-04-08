import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { Project } from "../models/Project";
import { Task } from "../models/Tasks";

const API_URL = "http://localhost:3001/projetos";

type ProjetosContextType = {
  projetos: Project[];
  adicionarProjeto: (nome: string, desc: string) => void;
  removerProjeto: (id: string | number) => void;
  editarProjeto: (id: string | number, nome: string, desc: string) => void;
  progressoConcluido: (projeto: Project) => number;
  adicionarTarefa: (
    projetoId: string | number,
    nome: string,
    desc: string,
    data: string,
    status: string,
  ) => void;
  removerTarefa: (projetoId: string | number, tarefaId: string | number) => void;
  editarTarefa: (
    projetoId: string | number,
    tarefaId: string | number,
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
    axios.get(API_URL)
      .then(response => {
        setProjetos(response.data);
      })
      .catch(error => console.error("Erro ao carregar projetos:", error));
  }, []);

  const adicionarProjeto = (nome: string, desc: string) => {
    const id = Date.now().toString();
    const novoProjeto = new Project(id, nome, desc);

    axios.post(API_URL, novoProjeto)
      .then(response => {
        setProjetos((prev) => [...prev, response.data]);
      })
      .catch(console.error);
  };

  const removerProjeto = (id: string | number) => {
    setProjetos((prev) => prev.filter((projeto) => projeto.id !== id));

    axios.delete(`${API_URL}/${id}`).catch(console.error);
  };

  const editarProjeto = (id: string | number, nome: string, desc: string) => {
    setProjetos((prev) => {
      const projetosAtualizados = prev.map((projeto) => {
        if (projeto.id === id) {
          const atualizado = new Project(projeto.id, nome, desc, projeto.tarefas);
          axios.put(`${API_URL}/${id}`, atualizado).catch(console.error);
          return atualizado;
        }
        return projeto;
      });
      return projetosAtualizados;
    });
  };

  const progressoConcluido = (projeto: Project) => {
    if (projeto.tarefas.length === 0) return 100;
    const tarefasConcluidas = projeto.tarefas.filter(
      (tarefa) => tarefa.status === "Concluída",
    ).length;
    return Math.round((tarefasConcluidas / projeto.tarefas.length) * 100);
  };

  const adicionarTarefa = (
    projetoId: string | number,
    nome: string,
    desc: string,
    data: string,
    status: string,
  ) => {
    setProjetos((prev) => {
      const projetosAtualizados = prev.map((projeto) => {
        if (projeto.id === projetoId) {
          const novaTarefa = new Task(Date.now(), nome, desc, data, status);
          const projetoAtualizado = new Project(projeto.id, projeto.nome, projeto.desc, [
            ...projeto.tarefas,
            novaTarefa,
          ]);
          axios.put(`${API_URL}/${projetoId}`, projetoAtualizado).catch(console.error);
          return projetoAtualizado;
        }
        return projeto;
      });
      return projetosAtualizados;
    });
  };

  const removerTarefa = (projetoId: string | number, tarefaId: string | number) => {
    setProjetos((prev) => {
      const projetosAtualizados = prev.map((projeto) => {
        if (projeto.id === projetoId) {
          const tarefasAtualizadas = projeto.tarefas.filter(
            (tarefa) => tarefa.id !== tarefaId,
          );
          const projetoAtualizado = new Project(
            projeto.id,
            projeto.nome,
            projeto.desc,
            tarefasAtualizadas,
          );
          axios.put(`${API_URL}/${projetoId}`, projetoAtualizado).catch(console.error);
          return projetoAtualizado;
        }
        return projeto;
      });
      return projetosAtualizados;
    });
  };

  const editarTarefa = (
    projetoId: string | number,
    tarefaId: string | number,
    nome: string,
    desc: string,
    data: string,
    status: string,
  ) => {
    setProjetos((prev) => {
      const projetosAtualizados = prev.map((projeto) => {
        if (projeto.id === projetoId) {
          const tarefasAtualizadas = projeto.tarefas.map((tarefa) => {
            if (tarefa.id === tarefaId) {
              return new Task(tarefaId, nome, desc, data, status);
            }
            return tarefa;
          });
          const projetoAtualizado = new Project(
            projeto.id,
            projeto.nome,
            projeto.desc,
            tarefasAtualizadas,
          );
          axios.put(`${API_URL}/${projetoId}`, projetoAtualizado).catch(console.error);
          return projetoAtualizado;
        }
        return projeto;
      });
      return projetosAtualizados;
    });
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
