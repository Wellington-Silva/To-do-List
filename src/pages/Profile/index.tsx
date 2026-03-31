import './styles.css';
import { Title } from '../../components/Title';
import { Button } from '../../components/Button'; 

function Profile() {
    return (
        <div className="container">
            <Title title="Perfil" />
            <div className="data">
                <p><strong>Nome:</strong> Wellington</p>
                <p><strong>Email:</strong> wellington@example.com</p>
                <p><strong>Telefone:</strong> (11) 12345-6789</p>
                <p><strong>Data de Nascimento:</strong> 01/01/1990</p>
                <Button name='Editar Perfil' />
            </div>
        </div>
    );
};

export default Profile;