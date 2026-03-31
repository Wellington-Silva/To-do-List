import './styles.css';
import { Label } from '../Label';

export function Card({ id, title, description, completed, onToggle }: { id: number; title: string; description: string, completed: boolean, onToggle: () => void }) {
    return (
        <div className="card">
            <h4>{title}</h4>
            <p>{description}</p>

            <div className="status-badge" style={{
                color: completed ? '#4ade80' : '#fbbf24'
            }}>
                Status: {completed ? 'Concluída' : 'Pendente'}
            </div>
            <Label htmlFor='checkbox'>Marcar como concluída</Label>
            <input 
                type="checkbox" 
                id={`check-${id}`} 
                checked={completed} 
                onChange={onToggle}
            />
        </div>
    );
};