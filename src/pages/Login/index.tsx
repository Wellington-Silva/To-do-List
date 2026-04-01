import './styles.css';
import { Title } from '../../components/Title';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';

type LoginTypes = {
    email: string;
    password: string;
};

function Login({ onLoginSubmit }: { onLoginSubmit: (data: LoginTypes) => boolean }) {
    const navigate = useNavigate();

    function handleLogin(formData: FormData) {
        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) {
            alert("Por favor, preencha todos os campos!");
            return;
        };

        const loginData: LoginTypes = {
            email: String(email),
            password: String(password)
        };

        const isOk = onLoginSubmit(loginData);
        
        if (isOk) {
            console.log("Login realizado com sucesso!");
            navigate('/profile');
        };
    };

    return (
        <div className="container">
            <Title title="Login" />

            <form className="login-form" action={handleLogin}>
                <Label htmlFor='email'>Email</Label>
                <Input type='email' name='email' id='email' placeholder='Digite seu email' />

                <Label htmlFor='password'>Senha</Label>
                <Input type='password' name='password' id='password' placeholder='Digite sua senha' />

                <Button name='Entrar' />
            </form>
        </div>
    );
};

export default Login;