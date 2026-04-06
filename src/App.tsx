import './App.css';
import Home from "./pages/Home";
import Login from './pages/Login';
import AddTask from './pages/AddTask';
import Profile from './pages/Profile';
import Register from './pages/Register';
import { apiRequest } from './services';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { PrivateRoute } from './components/Private-Route';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

export default function App() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const session = localStorage.getItem('user_session');
        if (session) {
            const userData = JSON.parse(session);
            if (userData && (userData.id || userData.user?.id)) {
                setUser(userData);
            }
        }
    }, []);

    useEffect(() => {
        const loadTasks = async () => {
            const userId = user?.user?.id || user?.id;
            const token = user?.token;

            if (!userId || !token) return;

            try {
                const response = await apiRequest<any>(`/tasks?userId=${userId}`);
                const tasksList = Array.isArray(response) ? response : (response.tasks || []);
                setTasks(tasksList);
            } catch (err) {
                console.error("Erro ao buscar tarefas");
                setTasks([]);
            }
        };

        loadTasks();
    }, [user]);

    const handleAddTask = async (newTask: any) => {
        console.log("ESTADO DO USUARIO NO MOMENTO DA TAREFA:", user);
        const userId = user?.user?.id || user?.id;

        if (!userId) {
            alert("Erro: Usuário não identificado.");
            return;
        };

        const taskWithUser = {
            ...newTask,
            userId: userId,
            date: new Date().toISOString()
        };

        try {
            const response = await apiRequest<any>('/tasks', {
                method: 'POST',
                body: JSON.stringify(taskWithUser)
            });

            const createdTask = response.task || response;
            setTasks((prevTasks) => [...prevTasks, createdTask]);
            alert("Tarefa adicionada!");
        } catch (error) {
            alert("Erro ao salvar tarefa no servidor");
        }
    };

    const handleToggleTask = async (id: number) => {
        const taskToUpdate = tasks.find(t => t.id === id);
        if (!taskToUpdate) return;

        const statusAtual = taskToUpdate.isCompleted ?? taskToUpdate.completed ?? false;
        const newStatus = !statusAtual;

        console.log(`Alterando tarefa ${id} de ${statusAtual} para ${newStatus}`);

        try {
            await apiRequest<any>(`/tasks/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                    isCompleted: newStatus
                })
            });

            setTasks(prevTasks => prevTasks.map(task =>
                task.id === id ? { ...task, isCompleted: newStatus, completed: newStatus } : task
            ));

        } catch (error) {
            console.error("Erro ao inverter status da tarefa:", error);
            alert("Ops! O banco de dados não aceitou a mudança.");
        }
    };

    const handleDeleteTask = async (id: string) => {
        if (!window.confirm("Tem certeza que deseja excluir esta tarefa?")) return;

        try {
            await apiRequest(`/tasks/${id}`, {
                method: "DELETE"
            });

            // Atualiza o estado local removendo a tarefa da lista
            setTasks(prevTasks => prevTasks.filter(task => (task.id || task._id) !== id));

        } catch (error) {
            console.error("Erro ao deletar tarefa:", error);
            alert("Não foi possível excluir a tarefa no servidor.");
        }
    };

    const handleRegisterUser = async (userRegistered: any) => {
        try {
            const response = await apiRequest<any>('/users', {
                method: "POST",
                body: JSON.stringify(userRegistered)
            });

            if (response && !response.error) {
                setUser(response);
                localStorage.setItem('user_session', JSON.stringify(response));
                return response || response.error;
            }
        } catch (error) {
            console.error("Erro no cadastro:", error);
            alert("Não foi possível cadastrar usuário");
        }
    };

    const handleUpdateUser = async (userData: any) => {
        try {
            const response = await apiRequest<any>(`/users/${userData.id}`, {
                method: "PUT",
                body: JSON.stringify(userData)
            });
            setUser(response.user || response);

            const session = JSON.parse(localStorage.getItem('user_session') || '{}');
            const newSession = {
                ...session,
                user: response.user || response
            };

            localStorage.setItem('user_session', JSON.stringify(newSession));
            alert("Perfil atualizado!");
        } catch (error) {
            alert("Não foi possível editar dados do usuário logado");
        }
    };

    const handleLogout = async () => {
        try {
            localStorage.removeItem("user_session");
            setUser(null);
        } catch (error) {
            alert("Não foi possível fazer o logout");
        }
    };

    const handleLoginUser = async (loginData: { email: string; password: string }) => {
        try {
            const response = await apiRequest<any>('/auth/login', {
                method: 'POST',
                body: JSON.stringify(loginData)
            });

            if (response && !response.error) {
                localStorage.setItem('user_session', JSON.stringify(response));
                setUser(response);
                return true;
            }
        } catch (error) {
            alert("E-mail ou senha incorretos!");
        }
        return false;
    };

    return (
        <div className="app-layout">
            <BrowserRouter>
                <header className="navbar">
                    <div className="nav-container">
                        <div className="logo">To Do List</div>
                        <nav className="nav-links">
                            {!user ? (
                                <>
                                    <Link to="/" className="login-btn">Login</Link>
                                    <Link to="/register" className="register-btn">Registrar</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/home">Home</Link>
                                    <Link to="/add-task">Nova Tarefa</Link>
                                    <Link to="/profile">Perfil</Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Login onLoginSubmit={handleLoginUser} />} />
                        <Route
                            path="/home"
                            element={
                                <PrivateRoute user={user}>
                                    <Home tasks={tasks} onToggleTask={handleToggleTask} onDelete={handleDeleteTask} />
                                </PrivateRoute>
                            } />

                        <Route
                            path="/add-task"
                            element={
                                <PrivateRoute user={user}>
                                    <AddTask onEventSubmit={handleAddTask} />
                                </PrivateRoute>
                            } />

                        <Route
                            path="/profile"
                            element={
                                <PrivateRoute user={user}>
                                    <Profile user={user} onLogout={handleLogout} onUpdate={handleUpdateUser} />
                                </PrivateRoute>
                            } />

                        <Route path="/register" element={<Register onEventSubmit={handleRegisterUser} />} />
                        <Route path="*" element={<Navigate to={user ? "/home" : "/"} />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
};