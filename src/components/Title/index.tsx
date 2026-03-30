import './styles.css';

export function Title({ title }: { title: string }) {
    return (
        <header>
            <h1>{title}</h1>
        </header>
    );
};