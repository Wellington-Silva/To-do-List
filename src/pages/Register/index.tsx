import './styles.css';
import { Label } from '../../components/Label';
import { Input } from '../../components/Input';
import { Title } from '../../components/Title';
import { Button } from '../../components/Button';

function Register () {
    return (
        <div className="container">
            <Title title="Registrar" />
            
            <form className="register-form">
                <Label htmlFor='name'>Nome</Label>
                <Input type='text' id='name' placeholder='Digite seu nome' />

                <Label htmlFor='cellphone'>Telefone</Label>
                <Input type='text' name='cellphone' id='cellphone' placeholder='Digite seu número de telefone' />

                <Label htmlFor='birthDate'>Nome</Label>
                <Input type='date' name='birthDate' id='birthDate' placeholder='Selecione sua data de nascimento' />

                <Label htmlFor='email'>Email</Label>
                <Input type='email' id='email' placeholder='Digite seu email' />

                <Label htmlFor='password'>Senha</Label>
                <Input type='password' id='password' placeholder='Digite sua senha' />
                
                <Button name='Registrar' />
            </form>
        </div>
    );
};

export default Register;