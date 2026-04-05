import './styles.css';
import { Card } from '../../components/Card';
import { Title } from '../../components/Title';
import { Footer } from '../../components/Footer';

function Home({ tasks, onToggleTask, onDelete }: { tasks: any[]; onToggleTask: (id: number) => void; onDelete: (id: string) => void }) {
    return (
        <div className="home-wrapper">
            <Title title="Minhas Tarefas" />

            <main className="card-container">
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <Card
                            key={task.id || index}
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            completed={task.isCompleted ?? task.completed ?? false}
                            onToggle={() => onToggleTask(task.id)}
                            onDelete={() => onDelete(task.id)}
                        />
                    ))
                ) : (
                    <p className="empty-message">Nenhuma tarefa encontrada. Que tal criar uma?</p>
                )}
            </main>

            <Footer name='Wellington-Solutions.' />
        </div>
    );
}

export default Home;