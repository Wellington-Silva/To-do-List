import './App.css';
import Home from "./pages/Home";
import Login from './pages/Login';
import AddTask from './pages/AddTask';
import Profile from './pages/Profile';
import Register from './pages/Register';
import { apiRequest } from './services';
import { useState, useEffect } from 'react';
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
        } catch (error) {
            alert("Erro ao salvar tarefa no servidor");
        }
    };

    const handleToggleTask = async (id: number) => {
        const taskToUpdate = tasks.find(t => t.id === id);
        if (!taskToUpdate) return;

        const statusAtual = taskToUpdate.isCompleted ?? taskToUpdate.completed ?? false;
        const novoStatus = !statusAtual;

        console.log(`Alterando tarefa ${id} de ${statusAtual} para ${novoStatus}`);

        try {
            await apiRequest<any>(`/tasks/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                    isCompleted: novoStatus
                })
            });

            setTasks(prevTasks => prevTasks.map(task =>
                task.id === id ? { ...task, isCompleted: novoStatus, completed: novoStatus } : task
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

            console.log("Usuário atualizado com sucesso!");
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
                            <Link to="/">Home</Link>
                            <Link to="/add-task">Nova Tarefa</Link>
                            {!user ? (
                                <>
                                    <Link to="/login" className="login-btn">Login</Link>
                                    <Link to="/register" className="register-btn">Registrar</Link>
                                </>
                            ) : (
                                <Link to="/profile">Perfil</Link>
                            )}
                        </nav>
                    </div>
                </header>

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home tasks={tasks} onToggleTask={handleToggleTask} onDelete={handleDeleteTask} />} />
                        <Route path="/add-task" element={<AddTask onEventSubmit={handleAddTask} />} />
                        <Route path="/login" element={<Login onLoginSubmit={handleLoginUser} />} />
                        <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} onUpdate={handleUpdateUser} />} />
                        <Route path="/register" element={<Register onEventSubmit={handleRegisterUser} />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
};