import { Task } from "./Tasks";

export class Project {
  id: string | number;
  nome: string;
  desc: string;
  tarefas: Task[];

  constructor(id: string | number, nome: string, desc: string, tarefas: Task[] = []) {
    this.id = id;
    this.nome = nome;
    this.desc = desc;
    this.tarefas = tarefas;
  }
}
