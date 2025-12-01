import { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const sendRequest = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Preencha todos os campos');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:3000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, pass: password }),
            });

            const json = await response.json();

            if (response.ok) {
                Cookies.set('token', json.token, { expires: 1 });
                navigate('/home'); 
            } else {
                alert(json.message || 'Login failed');
            }
        } catch (error) {
            alert('Erro ao conectar com servidor');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div id="page">
            <div id="login-container">
                <div id="left-container">
                    <h2>Bem vindo ao nosso Supermercado!</h2>

                    <div id="icon-container">
                        <a href="https://www.facebook.com/?locale=pt_BR">
                            <i className="fab fa-facebook"></i>
                        </a>
                        <a href="https://github.com/?locale=pt-br">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="https://www.google.com.br/index.html">
                            <i className="fab fa-google"></i>
                        </a>
                    </div>

                    <form id="form-login" onSubmit={sendRequest}>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            placeholder="Email"
                            required
                        />

                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                            required
                        />

                        <button type="submit" disabled={loading}>
                            {loading ? 'Entrando...' : 'Login'}
                        </button>
                    </form>
                </div>

                <div id="right-container">
                    <p>Área de cadastro</p>
                    <button onClick={() => navigate('/sign-up')}>Cadastre-se</button>
                </div>
            </div>
        </div>
    );
}
