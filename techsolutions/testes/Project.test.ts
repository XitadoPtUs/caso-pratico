import { Project } from "../src/models/Project";
import { Task } from "../src/models/Tasks";

describe("Project Model", () => {
  it("deve criar um projeto corretamente", () => {
    const project = new Project("123", "Projeto Teste", "Descrição do teste");

    expect(project.id).toBe("123");
    expect(project.nome).toBe("Projeto Teste");
    expect(project.desc).toBe("Descrição do teste");
    expect(project.tarefas).toEqual([]);
  });

  it("deve ser possível inicializar um projeto com tarefas já existentes", () => {
    const tarefa = new Task(1, "Tarefa 1", "Desc", "2026-01-01", "Pendente");
    const project = new Project("123", "Projeto Teste", "Descrição", [tarefa]);

    expect(project.tarefas.length).toBe(1);
    expect(project.tarefas[0].nome).toBe("Tarefa 1");
  });
});
