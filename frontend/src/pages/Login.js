import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import OAuth from '../components/OAuth';



const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login, error, isLoading} = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
        
    }
        


    return ( 
        <form className='login' onSubmit={handleSubmit}>
            <h3>Log In</h3>

            <label>Email:</label>
            <input type='email' 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />

            <label>Password:</label>
            <input type='password' 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
            />

            <button disabled={isLoading}>Log In</button>
            <OAuth />
            {error && <div className='error'>{error}</div>}
        </form>
     );
}
 
export default Login;