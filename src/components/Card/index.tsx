import './styles.css';

export function Card({ title, description, completed }: { title: string; description: string, completed: boolean }) {
    return (
        <div className="card">
            <h4>{title}</h4>
            <p>{description}</p>
            
            <div className="status-badge" style={{ 
                color: completed ? '#4ade80' : '#fbbf24'
            }}>
                Status: {completed ? 'Concluída' : 'Pendente'}
            </div>
        </div>
    );
};