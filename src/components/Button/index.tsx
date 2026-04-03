import './styles.css';

interface ButtonProps {
    name: string;
    onClick?: () => void | Promise<void>;
    type?: "button" | "submit" | "reset"; 
}

export function Button({ name, onClick, type = "submit" }: ButtonProps) {
    return (
        <button className='button' onClick={onClick} type={type}>{name}</button>
    );
};