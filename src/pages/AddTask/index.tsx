import './styles.css';
import { Label } from "../../components/Label";
import { Input } from "../../components/Input";
import { Title } from "../../components/Title";
import { Footer } from "../../components/Footer";
import { Button } from "../../components/Button";

type taskType = {
    title: string;
    description: string;
    completed: boolean;
};

function AddTask({ onEventSubmit }: { onEventSubmit: (task: taskType) => void }) {

    function handleSumit(formData: FormData) {
        const task: taskType = {
            title: String(formData.get('title')),
            description: String(formData.get('description')),
            completed: false
        };

        onEventSubmit(task);
        
        console.log("Tarefa submetida:", task);
    };

    return (
        <div className="container">
            <form className="form" action={handleSumit}>
                <Title title="Adicionar Tarefa" />
                <section className="body">
                    <Label htmlFor='title'>Adicionar título</Label>
                    <Input type='text' name='title' id='title' placeholder="Digite uma nova tarefa..." />
                    
                    <Label htmlFor='description'>Adicionar descrição</Label>
                    <Input type='text' name='description' id='description' placeholder="Digite a descrição da tarefa..." />
                </section>
                <Button name="Adicionar" />
            </form>
            <Footer name='Wellington-Solutions.'/>
        </div>
    );
};

export default AddTask;