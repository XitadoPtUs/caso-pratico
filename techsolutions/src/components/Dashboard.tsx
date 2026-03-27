import { useProjetos } from "../context/Projetos"
import { NovoProjeto } from "./utils/add/NovoProjeto";

export const Dashboard = () => {
    const context = useProjetos();

    const handleEdit = () => {
        // por fazer
    }

    return (
        <>
            <h1>Dashboard</h1>
            <h2>Lista Projetos</h2>
            <div className="projetos">
                {context.projetos.map((projeto) => (
                    <div key={projeto.id} className="projeto">
                        <h2>{projeto.nome}</h2>
                        <button onClick={() => context.removerProjeto(projeto.id)}>Remover</button>
                        <button onClick={handleEdit}>Editar</button>
                    </div>
                ))}
            </div>
            <NovoProjeto />
        </>

    );
}