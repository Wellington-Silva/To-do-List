import './styles.css';
import { Title } from '../../components/Title';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { Button } from '../../components/Button';

function Login() {
    return (
        <div className="container">
            <Title title="Login" />

            <form className="login-form">
                <Label htmlFor='email'>Email</Label>
                <Input type='email' id='email' placeholder='Digite seu email' />

                <Label htmlFor='password'>Senha</Label>
                <Input type='password' id='password' placeholder='Digite sua senha' />
                
                <Button name='Entrar' />
            </form>
        </div>
    );
};

export default Login;