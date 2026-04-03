import './styles.css';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Title } from '../../components/Title';
import { Input } from '../../components/Input';
import { Label } from '../../components/Label';
import { Footer } from '../../components/Footer';
import { Button } from '../../components/Button';

type LoginTypes = {
    email: string;
    password: string;
};

interface LoginProps {
    onLoginSubmit: (data: LoginTypes) => Promise<boolean>;
}

function Login({ onLoginSubmit }: LoginProps) {
    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isSubmitting } 
    } = useForm<LoginTypes>();

    const onSubmit = async (data: LoginTypes) => {
        const isOk = await onLoginSubmit(data);
        if (isOk) {
            console.log("Login realizado com sucesso!");
            navigate('/profile');
        } else {
            alert("E-mail ou senha incorretos.");
        }
    };

    return (
        <div className="container">
            <Title title="Login" />

            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
                <Label htmlFor='email'>Email</Label>
                <Input 
                    type='email' 
                    placeholder='Digite seu email'
                    {...register("email", { 
                        required: "O e-mail é obrigatório",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Digite um e-mail válido"
                        }
                    })} 
                />
                {errors.email && <span className="error-message">{errors.email.message}</span>}

                <Label htmlFor='password'>Senha</Label>
                <Input 
                    type='password' 
                    placeholder='Digite sua senha'
                    {...register("password", { 
                        required: "A senha é obrigatória",
                        minLength: {
                            value: 8,
                            message: "A senha deve ter no mínimo 8 caracteres"
                        }
                    })} 
                />
                {errors.password && <span className="error-message">{errors.password.message}</span>}

                <Button 
                    name={isSubmitting ? 'Entrando...' : 'Entrar'} 
                    type="submit" 
                />
            </form>
            
            <Footer name='Wellington-Solutions.'/>
        </div>
    );
}

export default Login;