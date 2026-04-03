import './styles.css';
import { Label } from '../Label';
import { Trash2 } from 'lucide-react';

interface CardProps {
    id: string | number;
    title: string;
    description: string;
    completed: boolean;
    onToggle: () => void;
    onDelete: () => void; // 1. Adicione esta linha aqui
}

export function Card({ id, title, description, completed, onToggle, onDelete }: CardProps ) {
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
            <button
                className="button-icon-delete"
                onClick={onDelete}
            >
                <Trash2 size={20} className="icon-trash" />
            </button>
        </div>
    );
};