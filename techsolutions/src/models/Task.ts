export class Task {
  id: number;
  nome: string;
  desc: string;
  data: string;
  status: string;

  constructor(
    id: number,
    nome: string,
    desc: string,
    data: string,
    status: string,
  ) {
    this.id = id;
    this.nome = nome;
    this.desc = desc;
    this.data = data;
    this.status = status;
  }
}
