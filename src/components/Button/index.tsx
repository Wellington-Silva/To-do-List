import './styles.css';

export function Button({ name }: { name: string }) {
    return (
        <button className='button' type="submit">{name}</button>
    );
};