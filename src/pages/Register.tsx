import { useState } from 'react';
import axios from 'axios';
import { Buttons } from '../components/ui/buttons/Buttons';
import { Header, Footer } from '../components/Layout';

export default function Register () {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const passwordRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;

        const usernameRegex = /[^a-zA-Z0-9]/; //filters out special characters

        if (usernameRegex.test(username)) {
            setError('Username must only contain alphanumeric characters.');
            return;
        }
        if (!passwordRegex.test(password)) {
            setError('Password must contain at least 6 characters, including an uppercase letter, a lowercase letter, and a digit.');
            return;
        }

        try {
            const response = await axios.get("http://localhost:5055/users");
            const userExists = response.data.some( //check if username is taken
                (user: {username: string}) => user.username === username
            );

            if (userExists) {
                setError('Username is already taken');
            }

            await axios.post("http://localhost:5055/users", {username, password});
            setUsername('');
            setPassword('');
            setError('');

        } catch (error) {
            console.error('Error registering user:', error);
            setError('An error occurred while registering.');
        }
    }
        /*****************************/

        return (
            <>
                <Header title="register"/>
                <main id='form-main'>
                    <h1>Register</h1>
                    <form onSubmit={handleRegister}>
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
                        <Buttons variant="submitForm">Register</Buttons>
                    </form>
                    <a href="/login">Already have an account ? Log In</a>
                </main>
                <Footer/>
            </>
        )
    
    
}