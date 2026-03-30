import './styles.css';

export function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
    return (
        <label className='label' htmlFor={htmlFor}>
            {children}
        </label>
    )
};