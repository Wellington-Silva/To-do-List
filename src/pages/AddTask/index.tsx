import './styles.css';
import { useForm } from 'react-hook-form'; // 1. Importar o hook
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";
import { Title } from "../../components/Title";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Button";

type taskType = {
    title: string;
    description: string;
    isCompleted: boolean;
};

function AddTask({ onEventSubmit }: { onEventSubmit: (task: taskType) => void }) {
    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { errors } 
    } = useForm<taskType>({
        defaultValues: {
            isCompleted: false // Valor padrão inicial
        }
    });

    const onSubmit = (data: taskType) => {
        onEventSubmit({ ...data, isCompleted: false });
        reset(); 
    };

    return (
        <div className="container">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <Title title="Adicionar Tarefa" />
                <section className="body">
                    <Label htmlFor='title'>Adicionar título</Label>
                    <Input 
                        type='text' 
                        placeholder="Digite uma nova tarefa..." 
                        {...register("title", { 
                            required: "O título é obrigatório",
                            minLength: { value: 3, message: "Título muito curto" }
                        })} 
                    />
                    {errors.title && <span className="error-message">{errors.title.message}</span>}
                    
                    <Label htmlFor='description'>Adicionar descrição</Label>
                    <Input 
                        type='text' 
                        placeholder="Digite a descrição da tarefa..." 
                        {...register("description", { required: "A descrição é obrigatória" })}
                    />
                    {errors.description && <span className="error-message">{errors.description.message}</span>}
                </section>
                
                <Button name="Adicionar" type="submit" />
            </form>
            <Footer name='Wellington-Solutions.'/>
        </div>
    );
};

export default AddTask;