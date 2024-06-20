import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {

    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleLogout = () => {
        logout();
    }
    

    return ( 
        <header>
            <div className="container">
                <Link to="/" >Workout Buddy CHECK CLOUD BUILD</Link>
                <nav>
                    {user && (
                        <div>
                            <span>Logged in as: {user.email}</span>
                            <button onClick={handleLogout}>Log Out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Log In</Link>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    )}
                </nav>
            </div>
            
        </header>

     );
}
 
export default Navbar;