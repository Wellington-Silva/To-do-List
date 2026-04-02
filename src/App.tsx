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
            // Se userData existe e tem um ID (seja na raiz ou dentro de .user)
            if (userData && (userData.id || userData.user?.id)) {
                setUser(userData);
            }
        }
    }, []);

    useEffect(() => {
        const loadTasks = async () => {
            // Busca o ID e o Token não importa onde estejam no objeto
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
        const userId = user?.user.id || user?.id;

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
                body: JSON.stringify(taskWithUser) // Enviamos com o ID do Wellington
            });

            const createdTask = response.task || response;
            setTasks((prevTasks) => [...prevTasks, createdTask]);
        } catch (error) {
            alert("Erro ao salvar tarefa no servidor");
        }
    };

    const handleToggleTask = async (id: number) => {
        console.log("ID saindo do Front:", id);
        const taskToUpdate = tasks.find(t => t.id === id);
        if (!taskToUpdate) return;

        try {
            const newStatus = !taskToUpdate.completed;

            const response = await apiRequest<any>(`/tasks/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                    completed: newStatus
                })
            });

            // Se o seu backend retorna a task atualizada no response.task ou direto no response:
            const updatedTask = response.task || response;

            const newTasks = tasks.map(task =>
                task.id === id ? { ...task, ...updatedTask } : task
            );

            setTasks(newTasks);
        } catch (error) {
            console.error("Erro ao atualizar tarefa:", error);
            alert("Não foi possível salvar a alteração.");
        }
    };

    const handleRegisterUser = async (userRegistered: any) => {
        try {
            const response = await apiRequest<any>('/users', {
                method: "POST",
                body: JSON.stringify(userRegistered)
            });

            if (response && !response.error) {
                localStorage.setItem('user_session', JSON.stringify(response));
                setUser(response);
            }
        } catch (error) {
            console.error("Erro no cadastro:", error);
            alert("Não foi possível cadastrar usuário");
        }
    };

    const handleUpdateUser = async (userData: any) => {
        try {
            const response = await apiRequest<any>(`/user/${userData.id}`, {
                method: "PUT",
                body: JSON.stringify(userData)
            });
            setUser(response.user || response);

            const session = JSON.parse(localStorage.getItem('user_session') || '{}');
            const newSession = {
                ...session,
                user: response.user || response // Atualiza os dados, mas mantém o token
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
                <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} onUpdate={handleUpdateUser} />} />
                <Route path="/register" element={<Register onEventSubmit={handleRegisterUser} />} />
            </Routes>
        </BrowserRouter>
    );
};