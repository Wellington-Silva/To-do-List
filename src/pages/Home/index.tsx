import './styles.css';
import { Card } from '../../components/Card';
import { Title } from '../../components/Title';
import { Footer } from '../../components/Footer';

function Home({ tasks, onToggleTask }: { tasks: any[]; onToggleTask: (id: number) => void }) {
    return (
        <div className="container">
            <Title title="To Do List" />
            <div className="card-container">
                {tasks.map((task) => (
                    <Card
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        description={task.description}
                        completed={task.completed}
                        onToggle={() => onToggleTask(task.id)} 
                    />
                ))}
            </div>
            <Footer name='Wellington-Solutions.'/>
        </div>
    );
}

export default Home;