import './styles.css';

export function Footer({name}: {name?: string}) {
    return (
        <footer className="bg-gray-800 text-white py-4 text-center">
            <p>&copy; {new Date().getFullYear()} {name} All rights reserved.</p>
        </footer>
    );
};