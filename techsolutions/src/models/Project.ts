import { Task } from "./Task";

export class Project {
  id: number;
  nome: string;
  desc: string;
  tarefas: Task[];

  constructor(id: number, nome: string, desc: string, tarefas: Task[] = []) {
    this.id = id;
    this.nome = nome;
    this.desc = desc;
    this.tarefas = tarefas;
  }
}
