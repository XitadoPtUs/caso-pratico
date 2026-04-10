import { useProjetos } from "../context/Projetos";
import { NovoProjeto } from "./utils/projeto/NovoProjeto";
import { NovaTarefa } from "./utils/tarefa/NovaTarefa";
import { EditTarefa } from "./utils/tarefa/EditTarefa";
import { EditProjeto } from "./utils/projeto/EditProjeto";
import { AnimatedNumber } from "./utils/AnimatedNumber";

export const Dashboard = () => {
  const context = useProjetos();

  const totalTarefas = context.projetos.reduce(
    (acc, p) => acc + p.tarefas.length,
    0
  );
  const tarefasConcluidas = context.projetos.reduce(
    (acc, p) =>
      acc + p.tarefas.filter((t) => t.status === "Concluída").length,
    0
  );

  const getProgressClass = (value: number) => {
    if (value === 100) return "project-card-progress-fill-complete";
    if (value >= 60) return "project-card-progress-fill-high";
    if (value >= 30) return "project-card-progress-fill-mid";
    return "project-card-progress-fill-low";
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1 className="dashboard-title">TechSolutions</h1>
        <p className="dashboard-subtitle">
          Gestão inteligente de projetos e tarefas
        </p>
      </header>

      <section className="dashboard-stats">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon dashboard-stat-icon-projects">
            📁
          </div>
          <div className="dashboard-stat-info">
            <span className="dashboard-stat-value">
              <AnimatedNumber value={context.projetos.length} />
            </span>
            <span className="dashboard-stat-label">Projetos</span>
          </div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon dashboard-stat-icon-tasks">
            📋
          </div>
          <div className="dashboard-stat-info">
            <span className="dashboard-stat-value"><AnimatedNumber value={totalTarefas} /></span>
            <span className="dashboard-stat-label">Tarefas</span>
          </div>
        </div>
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-icon dashboard-stat-icon-completed">
            ✅
          </div>
          <div className="dashboard-stat-info">
            <span className="dashboard-stat-value"><AnimatedNumber value={tarefasConcluidas} /></span>
            <span className="dashboard-stat-label">Concluídas</span>
          </div>
        </div>
      </section>

      <section>
        <div className="dashboard-section-header">
          <h2 className="dashboard-section-title">Projetos</h2>
        </div>

        <div className="dashboard-projects">
          {context.projetos.length === 0 ? (
            <div className="dashboard-empty">
              <div className="dashboard-empty-icon">📂</div>
              <div className="dashboard-empty-title">
                Nenhum projeto ainda
              </div>
              <div className="dashboard-empty-text">
                Crie o seu primeiro projeto abaixo para começar
              </div>
            </div>
          ) : (
            context.projetos.map((projeto) => {
              const progresso = context.progressoConcluido(projeto);
              return (
                <article key={projeto.id} className="project-card">
                  <div className="project-card-header">
                    <div className="project-card-info">
                      <h3 className="project-card-name">
                        <span className="project-card-name-icon">📁</span>
                        {projeto.nome}
                      </h3>
                      <p className="project-card-desc">{projeto.desc}</p>
                    </div>
                    <div className="project-card-actions">
                      <button
                        className="project-card-btn project-card-btn-danger"
                        onClick={() => context.removerProjeto(projeto.id)}
                        title="Remover projeto"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  <div className="project-card-progress">
                    <div className="project-card-progress-header">
                      <span className="project-card-progress-label">
                        Progresso
                      </span>
                      <span className="project-card-progress-value">
                        <AnimatedNumber value={progresso} />%
                      </span>
                    </div>
                    <div className="project-card-progress-bar">
                      <div
                        className={`project-card-progress-fill ${getProgressClass(progresso)}`}
                        style={{ width: `${progresso}%` }}
                      />
                    </div>
                  </div>

                  <EditProjeto projetoId={projeto.id} />

                  <div className="project-card-divider" />

                  <div className="project-card-tasks">
                    <div className="project-card-tasks-header">
                      <span className="project-card-tasks-title">
                        📋 Tarefas
                      </span>
                      <span className="project-card-tasks-count">
                        <AnimatedNumber value={projeto.tarefas.length} />
                      </span>
                    </div>
                    <EditTarefa projetoId={projeto.id} />
                    <NovaTarefa projetoId={projeto.id} />
                  </div>
                </article>
              );
            })
          )}
        </div>
      </section>

      <NovoProjeto />
    </div>
  );
};
