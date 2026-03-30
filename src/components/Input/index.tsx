import type React from 'react';
import './styles.css';

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input className='task' { ...props } />
    );
};