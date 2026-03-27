import { useRef } from "react";
import { useTarefas } from "../../../context/Tarefas";

export const EditTarefa = () => {
    const context = useTarefas();
    const nomeRef = useRef(null);
    const descRef = useRef(null);
    const dataRef = useRef(null);
    const statusRef = useRef(null);

    const handleEdit = () => {
        if (nomeRef.current === null || descRef.current === null || dataRef.current === null || statusRef.current === null) return;
        const id = 0; // placeholder por enquanto... tenho de informar qual é o id para aqui 
        const nome = nomeRef.current.value;
        const desc = descRef.current.value;
        const data = dataRef.current.value;
        const status = statusRef.current.value;

        context.editarTarefa(id, nome, desc, data, status);
    };

    return (
        <div className="edit-tarefa">
            {context.tarefas.map((tarefa) => (
                <div key={tarefa.id} className="tarefa">
                    <input placeholder={tarefa.nome} ref={nomeRef} type="text" required></input>
                    <input placeholder={tarefa.desc} ref={descRef} type="text" required></input>
                    <input placeholder={tarefa.data} ref={descRef} type="date" required></input>
                    <input placeholder={tarefa.status} ref={descRef} type="text" required></input> // vai ser dropdown
                    <button onClick={handleEdit}>Editar</button>
                </div>
            ))}
        </div>
    );
};
