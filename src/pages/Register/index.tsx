import './styles.css';
import { useNavigate } from 'react-router-dom';
import { Label } from '../../components/Label';
import { Input } from '../../components/Input';
import { Title } from '../../components/Title';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/Button';

type userType = {
    name: string;
    cellphone: string;
    birthDate: string;
    email: string;
    password: string;
};

function Register ({ onEventSubmit }: { onEventSubmit: (user: userType) => void }) {
    const navigate = useNavigate();

    function handleSubmit(formData: FormData) {
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');

        if (!name || !email || !password) {
            alert("Por favor, preencha os campos obrigatórios");
            return; 
        };

        const user: userType = {
            name: String(name),
            cellphone: String(formData.get('cellphone') || ""),
            birthDate: String(formData.get('birthDate') || ""),
            email: String(email),
            password: String(password)
        };

        onEventSubmit(user);
        navigate('/profile');
    };

    return (
        <div className="container">
            <Title title="Registrar" />
            
            <form className="register-form" action={handleSubmit}>
                <Label htmlFor='name'>Nome</Label>
                <Input type='text' name='name' id='name' placeholder='Digite seu nome' />

                <Label htmlFor='cellphone'>Telefone</Label>
                <Input type='text' name='cellphone' id='cellphone' placeholder='Digite seu número de telefone' />

                <Label htmlFor='birthDate'>Data de Nascimento</Label>
                <Input type='date' name='birthDate' id='birthDate' placeholder='Selecione sua data de nascimento' />

                <Label htmlFor='email'>Email</Label>
                <Input type='email' name='email' id='email' placeholder='Digite seu email' />

                <Label htmlFor='password'>Senha</Label>
                <Input type='password' name='password' id='password' placeholder='Digite sua senha' />
                
                <Button name='Registrar' />
            </form>
            <Footer name='Wellington-Solutions.'/>
        </div>
    );
};

export default Register;