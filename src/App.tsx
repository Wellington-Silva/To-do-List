import './App.css';
import Home from "./pages/Home";
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import AddTask from './pages/AddTask';
import Profile from './pages/Profile';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

export default function App() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "React", description: "Estudar React", completed: false },
        { id: 2, title: "Java", description: "Finalizar API Java", completed: true },
        { id: 3, title: "Python", description: "Estudar python", completed: true }
    ]);

    const [user, setUser] = useState<any>(null);

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

    const handleRegisterUser = (userRegistered: any) => {
        localStorage.setItem('user_session', JSON.stringify(userRegistered));
        setUser(userRegistered);
    };

    const handleLogout = () => {
        setUser(null);
        console.log("Usuário deslogado");
    };

    const handleLoginUser = (loginData: { email: string; password: string }) => {
        const savedUser = localStorage.getItem('user_session');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            if (user.email.trim() === loginData.email.trim() && user.password === loginData.password) {
                console.log("Login bem-sucedido!");
                setUser(user);
                return true;
            };
        };
        alert("Email ou senha incorretos!");
        return false;
    };

    useEffect(() => {
        const savedUser = localStorage.getItem('user_session');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home | </Link>
                <Link to="/add-task">Tarefa | </Link>
                {!user ? (
                    <>
                        <Link to="/login"> Login</Link> |
                        <Link to="/register"> Registrar</Link>
                    </>
                ) : (
                    <Link to="/profile"> Perfil</Link>
                )}
            </nav>
            <Routes>
                <Route path="/" element={<Home tasks={tasks} onToggleTask={handleToggleTask} />} />
                <Route path="/add-task" element={<AddTask onEventSubmit={handleAddTask} />} />
                <Route path="/login" element={<Login onLoginSubmit={handleLoginUser} />} />
                <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
                <Route path="/register" element={<Register onEventSubmit={handleRegisterUser} />} />
            </Routes>
        </BrowserRouter>
    );
};