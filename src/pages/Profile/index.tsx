import './styles.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components/Title';
import { Label } from '../../components/Label';
import { Input } from '../../components/Input';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/Button';

type userType = {
    id: string;
    name: string;
    cellphone: string;
    birthDate: string;
    email: string;
};

type LoginResponse = {
    token: string;
    user: userType;
    message?: string;
    error?: boolean;
};

interface ProfileProps {
    user: userType | LoginResponse | any;
    onLogout: () => void;
    onUpdate: (updatedUser: userType) => void;
}

import { useForm } from 'react-hook-form';

function Profile({ user, onLogout, onUpdate }: ProfileProps) {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    
    const userData: userType = user?.user || user;

    const { register, handleSubmit, formState: { errors } } = useForm<userType>({
        defaultValues: userData
    });

    const handleInternalLogout = () => {
        onLogout();
        navigate('/');
    };

    // A função de salvar recebe os dados já mastigados como objeto
    const onSubmit = (data: userType) => {
        onUpdate({ ...data, id: userData.id });
        setIsEditing(false);
    };

    return (
        <div className="container">
            <Title title="Perfil" />
            <div className="data">
                {isEditing ? (
                    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                        
                        <Label htmlFor="name">Nome</Label>
                        <Input 
                            {...register("name", { required: "Nome é obrigatório" })} 
                            defaultValue={userData.name}
                        />
                        {errors.name && <span className="error">{errors.name.message}</span>}

                        <Label htmlFor="cellphone">Telefone</Label>
                        <Input 
                            {...register("cellphone", { required: "Telefone é obrigatório" })} 
                            defaultValue={userData.cellphone}
                        />

                        <Label htmlFor="birthDate">Nascimento</Label>
                        <Input 
                            type="date" 
                            {...register("birthDate")} 
                            defaultValue={userData.birthDate}
                        />

                        <Label htmlFor="email">Email</Label>
                        <Input 
                            {...register("email", { 
                                required: "Email é obrigatório",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Email inválido"
                                }
                            })} 
                            defaultValue={userData.email}
                        />
                        {errors.email && <span className="error">{errors.email.message}</span>}

                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <Button name="Salvar Alterações" type="submit" />
                            <button type="button" onClick={() => setIsEditing(false)} className="button-cancel">
                                Cancelar
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <p><strong>Nome:</strong> {userData?.name || "Não informado"}</p>
                        <p><strong>E-mail:</strong> {userData?.email || "Não informado"}</p>
                        <p><strong>Celular:</strong> {userData?.cellphone || "Não informado"}</p>
                        <p><strong>Nascimento:</strong> {userData?.birthDate || "Não informado"}</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
                            <button onClick={() => setIsEditing(true)} className="button-edit">
                                Editar Perfil
                            </button>
                            <button
                                onClick={handleInternalLogout}
                                className="button-logout"
                            >
                                Sair da Conta
                            </button>
                        </div>
                    </>
                )}
            </div>
            <Footer name='Wellington-Solutions.' />
        </div>
    );
};

export default Profile;