import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutDetails = ({workout, setToUpdate}) => {
    const {dispatch} = useWorkoutsContext();

    const {user} = useAuthContext();
    // const base_url = process.env.REACT_APP_IS_DOCKER? "http://node-app:4000" : 'http://localhost:4000';
    const base_url = process.env.REACT_APP_BASE_URL;
    const full_url = base_url + '/api/workouts/'+ workout._id;

    const handleDelete = async () => {

        if (!user) {
            console.log('You must be logged in');
            return;
        }
        const response = await fetch(full_url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const data = await response.json();
        if (response.ok) {
            dispatch({type: 'DELETE_WORKOUT', payload: data});  
        }
    }

    const handleUpdate = (workout) => {
        setToUpdate(workout);
    }
    return ( 
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load: </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p><strong>Created At: </strong>{workout.createdAt}</p>
            <span onClick={handleDelete}>Delete</span>
            <button onClick={() => handleUpdate(workout)}>Update</button>
            
        </div> 
    );
}
 
export default WorkoutDetails;