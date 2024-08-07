import { useState } from 'react';
import { useSignUp } from '../hooks/useSignUp';
import OAuth from '../components/OAuth';




const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {signup, error, isLoading} = useSignUp();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(email, password);
        
    }

    return ( 
        <form className='signup' onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

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

            
            <div className='auth-btns'>
                <button disabled={isLoading}>Sign Up</button>
                <OAuth />
            </div>

            {error && <div className='error'>{error}</div>}
        </form>
     );
}
 
export default Signup;