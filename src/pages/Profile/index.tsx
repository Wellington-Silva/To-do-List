import './styles.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components/Title';
import { Label } from '../../components/Label';
import { Input } from '../../components/Input';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/Button';

type userType = {
    id: number;
    name: string;
    cellphone: string;
    birthDate: string;
    email: string;
    password: string;
};

function Profile({ user, onLogout, onUpdate }: { user: userType | null; onLogout: () => void; onUpdate: (updatedUser: userType) => void }) {
    const [isEditing, setIsEditing] = useState(false);

    if (!user) return <p>Carregando...</p>;

    if (!user) {
        return (
            <div className="container">
                <Title title="Perfil" />
                <p>Nenhum usuário logado. Por favor, faça o cadastro.</p>
            </div>
        );
    };

    const navigate = useNavigate();

    const handleInternalLogout = () => {
        onLogout();
        navigate('/');
    };

    const handleSave = (formData: FormData) => {
        const updatedData = {
            ...user,
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
                    // Formulário com valores iniciais (defaultValue)
                    <form action={handleSave} className="register-form">
                        <Label htmlFor="name">Nome</Label>
                        <Input name="name" defaultValue={user.name} />

                        <Label htmlFor="cellphone">Telefone</Label>
                        <Input name="cellphone" defaultValue={user.cellphone} />

                        <Label htmlFor="birthDate">Nascimento</Label>
                        <Input type="date" name="birthDate" defaultValue={user.birthDate} />

                        <Label htmlFor="email">Email</Label>
                        <Input name="email" defaultValue={user.email} />

                        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                            <Button name="Salvar Alterações" />
                            <button type="button" onClick={() => setIsEditing(false)} className="button-cancel">
                                Cancelar
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <p><strong>Nome:</strong> {user.name}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Telefone:</strong> {user.cellphone}</p>
                        <p><strong>Data de Nascimento:</strong> {user.birthDate}</p>

                        <button onClick={() => setIsEditing(true)} className="button-edit">
                            Editar Perfil
                        </button>
                        <button
                            onClick={handleInternalLogout}
                            className="button-logout"
                        >
                            Sair da Conta
                        </button>
                    </>
                )}
            </div>
            <Footer name='Wellington-Solutions.'/>
        </div>
    );
};

export default Profile;