import { useProjetos } from "../context/Projetos";
import { NovoProjeto } from "./utils/projeto/NovoProjeto";
import { NovaTarefa } from "./utils/tarefa/NovaTarefa";
import { EditTarefa } from "./utils/tarefa/EditTarefa";
import { EditProjeto } from "./utils/projeto/EditProjeto";

export const Dashboard = () => {
  const context = useProjetos();

  return (
    <>
      <h1>Dashboard</h1>
      <h2>Lista Projetos</h2>
      <div className="projetos">
        {context.projetos.map((projeto) => (
          <div
            key={projeto.id}
            className="projeto"
          >
            <h2>{projeto.nome}</h2>
            <p>{projeto.desc}</p>
            <button onClick={() => context.removerProjeto(projeto.id)}>
              Remover Projeto
            </button>
            <EditProjeto />

            <div className="tarefas-container">
              <h3>Tarefas do Projeto</h3>
              <EditTarefa projetoId={projeto.id} />
              <NovaTarefa projetoId={projeto.id} />
            </div>
          </div>
        ))}
      </div>
      <NovoProjeto />
    </>
  );
};
