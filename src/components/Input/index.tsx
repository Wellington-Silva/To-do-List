import type React from 'react';
import './styles.css';

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input 
            className={`task ${className || ''}`} 
            { ...props } 
        />
    );
};