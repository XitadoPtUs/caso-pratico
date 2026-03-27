import { createContext, useContext, useState, ReactNode } from "react";

let idTarefa: number = 0;

type Tarefa = {
    id: number
    nome: string,
    desc: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    status: string
};

type TarefasContextType = {
    tarefas: Tarefa[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adicionarTarefa: (nome: string, desc: string, data: any, status: string) => void;
    removerTarefa: (id: number) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    editarTarefa: (id: number, nome: string, desc: string, data: any, status: string) => void;
};

const TarefasContext = createContext<TarefasContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useTarefas = () => {
    const context = useContext(TarefasContext);

    if (!context) {
        throw new Error("useTarefas deve ser usado dentro de um TarefasProvider");
    }

    return context;
};

export const TarefasProvider = ({ children }: { children: ReactNode }) => {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const adicionarTarefa = (nome: string, desc: string, data: any, status: string) => {
        const novaTarefa = {
            id: idTarefa++,
            nome: nome,
            desc: desc,
            data: data,
            status: status
        };

        setTarefas((prev) => [...prev, novaTarefa]);
    };

    const removerTarefa = (id: number) => {
        setTarefas((prev) => prev.filter((tarefas) => tarefas.id !== id));
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const editarTarefa = (id: number, nome: string, desc: string, data: any, status: string) => {
        setTarefas((prev) => prev.map((tarefa) => {
            if (tarefa.id === id) {
                return { ...tarefa, nome, desc, data, status };
            }
            return tarefa;
        }));
    };

    return (
        <TarefasContext.Provider
            value={{ tarefas, adicionarTarefa, removerTarefa, editarTarefa }}
        >
            {children}
        </TarefasContext.Provider>
    );
}