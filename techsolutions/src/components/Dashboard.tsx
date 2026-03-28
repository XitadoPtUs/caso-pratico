import { useProjetos } from "../context/Projetos";
import { NovoProjeto } from "./utils/projeto/NovoProjeto";
import { NovaTarefa } from "./utils/tarefa/NovaTarefa";
import { EditTarefa } from "./utils/tarefa/EditTarefa";

export const Dashboard = () => {
  const context = useProjetos();

  const handleEdit = () => {
    if (context.projetos.length === 0) return;
    const id = context.projetos[0].id;
    const nome = context.projetos[0].nome;
    const desc = context.projetos[0].desc;
    context.editarProjeto(id, nome, desc);
  };

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
            <button onClick={handleEdit}>Editar Projeto</button>

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
