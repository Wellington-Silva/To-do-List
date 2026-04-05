import './styles.css';

export function Title({ title }: { title: string }) {
    return (
        <header>
            <h2>{title}</h2>
        </header>
    );
};