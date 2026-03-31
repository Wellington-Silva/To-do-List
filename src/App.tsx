import './App.css';
import Home from "./pages/Home";
import { useState } from 'react';
import AddTask from './pages/AddTask';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

export default function App() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "React", description: "Estudar React", completed: false },
        { id: 2, title: "Java", description: "Finalizar API Java", completed: true },
        { id: 3, title: "Python", description: "Estudar python", completed: true }
    ]);

    const handleAddTask = (newTask: any) => {
        const taskWithId = { ...newTask, id: tasks.length + 1 };
        setTasks([...tasks, taskWithId]);
    };

    const handleToggleTask = (id: number) => {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return { ...task, completed: !task.completed }
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home | </Link>
                <Link to="/add-task">Cadastrar</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home tasks={tasks} onToggleTask={handleToggleTask} />} />
                <Route path="/add-task" element={<AddTask onEventSubmit={handleAddTask} />} />
            </Routes>
        </BrowserRouter>
    );
}