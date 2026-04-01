import './styles.css';
import { useNavigate } from 'react-router-dom'; 
import { Title } from '../../components/Title';
import { Button } from '../../components/Button';

type userType = {
    name: string;
    cellphone: string;
    birthDate: string;
    email: string;
    password: string;
};

function Profile({ user, onLogout }: { user: userType | null; onLogout: () => void }) {

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

    return (
        <div className="container">
            <Title title="Perfil" />
            <div className="data">
                <p><strong>Nome:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Telefone:</strong>{user.cellphone}</p>
                <p><strong>Data de Nascimento:</strong>{user.birthDate}</p>
                <Button name='Editar Perfil' />
                <button 
                    onClick={handleInternalLogout} 
                    className="button-logout" 
                    style={{ 
                        backgroundColor: '#ef4444', 
                        color: 'white', 
                        padding: '10px', 
                        borderRadius: '8px', 
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: '20px' 
                    }}
                >
                    Sair da Conta
                </button>
            </div>
        </div>
    );
};

export default Profile;