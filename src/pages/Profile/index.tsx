import './styles.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components/Title';
import { Label } from '../../components/Label';
import { Input } from '../../components/Input';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/Button';

// 1. Tipagem dos dados do usuário
type userType = {
    id: string;
    name: string;
    cellphone: string;
    birthDate: string;
    email: string;
};

// 2. Tipagem da resposta da API (Envelope)
type LoginResponse = {
    token: string;
    user: userType;
    message?: string;
    error?: boolean;
};

// 3. Interface das Props do Componente
interface ProfileProps {
    user: userType | LoginResponse | any; // Aceita os dois formatos
    onLogout: () => void;
    onUpdate: (updatedUser: userType) => void;
}

function Profile({ user, onLogout, onUpdate }: ProfileProps) {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    if (!user) {
        return (
            <div className="container">
                <Title title="Perfil" />
                <p>Nenhum usuário logado. Por favor, faça o login.</p>
                <Button name="Ir para Login" onClick={() => navigate('/login')} />
            </div>
        );
    }

    const userData: userType = user?.user || user;

    const handleInternalLogout = () => {
        onLogout();
        navigate('/');
    };

    const handleSave = (formData: FormData) => {
        const updatedData: userType = {
            id: userData.id, // Usa o ID extraído corretamente
            name: String(formData.get('name')),
            cellphone: String(formData.get('cellphone')),
            birthDate: String(formData.get('birthDate')),
            email: String(formData.get('email'))
        };

        onUpdate(updatedData);
        setIsEditing(false);
    };

    return (
        <div className="container">
            <Title title="Perfil" />
            <div className="data">
                {isEditing ? (
                    <form action={handleSave} className="register-form">
                        <Label htmlFor="name">Nome</Label>
                        <Input name="name" defaultValue={userData.name} />

                        <Label htmlFor="cellphone">Telefone</Label>
                        <Input name="cellphone" defaultValue={userData.cellphone} />

                        <Label htmlFor="birthDate">Nascimento</Label>
                        <Input type="date" name="birthDate" defaultValue={userData.birthDate} />

                        <Label htmlFor="email">Email</Label>
                        <Input name="email" defaultValue={userData.email} />

                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <Button name="Salvar Alterações" />
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
}

export default Profile;