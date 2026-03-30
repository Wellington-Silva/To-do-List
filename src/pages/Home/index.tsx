import './styles.css';
import { Card } from '../../components/Card';
import { Title } from '../../components/Title';

function Home({ tasks }: { tasks: any[] }) {
    return (
        <div className="container">
            <Title title="To Do List" />
            <div className="card-container">
                {tasks.map((task) => (
                    <Card key={task.id} title={task.title} description={task.description} completed={task.completed} />
                ))}
            </div>
        </div>
    );
}

export default Home;