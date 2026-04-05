import './styles.css';
import { useForm } from 'react-hook-form';
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

function Register({ onEventSubmit }: { onEventSubmit: (user: userType) => void }) {
    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit, 
        formState: { errors } 
    } = useForm<userType>();

    const onSubmit = (data: userType) => {
        onEventSubmit(data);
        navigate('/profile');
    };

    return (
        <div className="container">
            <Title title="Registrar" />
            
            <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
                
                <Label htmlFor='name'>Nome</Label>
                <Input 
                    type='text'
                    placeholder='Digite seu nome'
                    className={errors.password ? 'input-error' : ''}
                    {...register("name", { required: "O nome é obrigatório" })} 
                />
                {errors.name && <span className="error-message">{errors.name.message}</span>}

                <Label htmlFor='cellphone'>Telefone</Label>
                <Input 
                    type='text' 
                    placeholder='Digite seu número de telefone'
                    className={errors.password ? 'input-error' : ''}
                    {...register("cellphone", { required: "O telefone é obrigatório" })} 
                />

                <Label htmlFor='birthDate'>Data de Nascimento</Label>
                <Input 
                    type='date' 
                    className={errors.password ? 'input-error' : ''}
                    {...register("birthDate", { required: "A data de nascimento é obrigatória" })} 
                />

                <Label htmlFor='email'>Email</Label>
                <Input 
                    type='email' 
                    placeholder='Digite seu email'
                    className={errors.password ? 'input-error' : ''}
                    {...register("email", { 
                        required: "O email é obrigatório",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Formato de email inválido"
                        }
                    })} 
                />
                {errors.email && <span className="error-message">{errors.email.message}</span>}

                <Label htmlFor='password'>Senha</Label>
                <Input 
                    type='password' 
                    placeholder='Digite sua senha'
                    className={errors.password ? 'input-error' : ''}
                    {...register("password", { 
                        required: "A senha é obrigatória",
                        minLength: {
                            value: 8,
                            message: "A senha deve ter pelo menos 8 caracteres"
                        }
                    })}
                />
                {errors.password && <span className="error-message">{errors.password.message}</span>}
                
                <Button name='Registrar' type="submit" />
            </form>
            <Footer name='Wellington-Solutions.'/>
        </div>
    );
};

export default Register;