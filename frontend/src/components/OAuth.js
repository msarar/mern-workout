import { GoogleAuthProvider, signInWithPopup,  getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";


const OAuth = () => {

    const auth = getAuth(app);
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();

    const handleGoogleClick = async () => {
        const provider  = new GoogleAuthProvider();
        provider.setCustomParameters({prompt: 'select_account'});
        try {
            const googleResult = await signInWithPopup(auth, provider);
            console.log(googleResult);

            const res = await fetch(process.env.REACT_APP_BASE_URL + '/api/user/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // token: googleResult._tokenResponse.idToken,
                    email: googleResult.user.email,
                    name: googleResult.user.displayName,
                    photoURL: googleResult.user.photoURL,
                })
            });
            const data = await res.json();
            if (res.ok) {
                console.log('User logged in successfully');
                console.log(data);
                navigate('/');
                dispatch({ type: 'LOGIN', payload: data });
            }


        }catch(err){
            console.log('Error signing in with Google');
            console.log(err);
        }


    }

    return ( 
        <div>
            <button type="button" className="google_btn" onClick={handleGoogleClick}>Login with Google</button>
        </div>
     );
}
 
export default OAuth;