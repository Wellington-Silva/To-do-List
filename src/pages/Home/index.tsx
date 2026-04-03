import './styles.css';
import { Card } from '../../components/Card';
import { Title } from '../../components/Title';
import { Footer } from '../../components/Footer';

function Home({ tasks, onToggleTask, onDelete }: { tasks: any[]; onToggleTask: (id: number) => void; onDelete: (id: string) => void }) {
    return (
        <div className="container">
            <Title title="To Do List" />
            <div className="card-container">
                {tasks.map((task, index) => (
                    <Card
                        key={task.id || index}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        completed={task.isCompleted ?? task.completed ?? false}
                        onToggle={() => onToggleTask(task.id)}
                        onDelete={() => onDelete(task.id)}
                    />
                ))}
            </div>
            <Footer name='Wellington-Solutions.'/>
        </div>
    );
}

export default Home;