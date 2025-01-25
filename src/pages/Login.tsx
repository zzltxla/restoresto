
import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Buttons } from '../components/ui/buttons/Buttons';
import { Header, Footer } from '../components/Layout';

export default function Login () {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');


    const [loading, setLoading] = useState<boolean>(false); 
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setLoading(true); 
        try {
            const response = await axios.get('http://localhost:5055/users', 
                { params: {username, password}, }
            );

            const user = response.data.find(
                (user: { username: string; password: string }) => user.username === username && user.password === password
            );

            if (user) {
                console.log('Login successful');
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate(from, { replace: true });
            }
            else {
                setError('Invalid username or password');
            }

        } catch (error) {
            console.error('Error logging in:', error);
            setError('An error occured while logging in.');
        } finally {
            setLoading(false);
        }
    };

    /***************************/

    return (
        <>
            <Header title="login"/>
            <main id='form-main'>
                <h1>Log In</h1>
                <form onSubmit={handleLogin}>
                    <p>
                        <label htmlFor="">Username</label>
                        <input type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        />
                    </p>
                    <p>
                        <label htmlFor="">Password</label>
                        <input type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </p>
                    {error && <p className='error'>{error}</p>}
                    <Buttons 
                    variant="submitForm"
                    disabled={loading}
                    >
                        Log In
                    </Buttons>
                </form>
                {loading && <p>loading...</p>}
                <a href="/register">No account yet ? No worries create one !</a>
            </main>
            <Footer/>
        </>
    )

}