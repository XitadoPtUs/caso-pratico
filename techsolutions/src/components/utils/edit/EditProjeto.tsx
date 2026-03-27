import { useRef } from "react";
import { useProjetos } from "../../../context/Projetos";

export const EditProjeto = () => {
    const context = useProjetos();
    const nomeRef = useRef(null);
    const descRef = useRef(null);

    const handleEdit = () => {
        if (nomeRef.current === null || descRef.current === null) return;
        const id = 0; // placeholder por enquanto... tenho de informar qual é o id para aqui 
        const nome = nomeRef.current.value;
        const desc = descRef.current.value;

        context.editarProjeto(id, nome, desc);
    };

    return (
        <div className="edit-projeto">
            {context.projetos.map((projeto) => (
                <div key={projeto.id} className="projeto">
                    <input placeholder={projeto.nome} ref={nomeRef} type="text" required></input>
                    <input placeholder={projeto.desc} ref={descRef} type="text" required></input>
                    <button onClick={handleEdit}>Editar</button>
                </div>
            ))}
        </div>
    );
};
