import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";


const WorkoutForm = ({toUpdate}) => {
    const {dispatch} = useWorkoutsContext();
    const [title, setTitle] = useState('');
    const [reps, setReps] = useState('');
    const [load, setLoad] = useState('');
    const [error, setError] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);


    const {user} = useAuthContext();

    // const base_url = process.env.REACT_APP_IS_DOCKER? "http://node-app:4000" : 'http://localhost:4000';
    const base_url = 'http://localhost:4000';
    const create_url = base_url + '/api/workouts/';
    //might need to make this a state moving forward; for now, it's working
    let update_url = '';
    if (toUpdate) {
        update_url = base_url + '/api/workouts/'+ toUpdate._id+ '/';
    }
    useEffect( () => {
        if (toUpdate) {
            setTitle(toUpdate.title);
            setReps(toUpdate.reps);
            setLoad(toUpdate.load);
            setIsUpdate(true);
        }
    }, [toUpdate]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = {title, reps, load};
        let response = null;

        if (!user) {
            setError('You must be logged in');
            return;
        }
        
        if (isUpdate) {
            response = await fetch(update_url, {
                method: 'PATCH', 
                body: JSON.stringify(workout), 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
        }
        else{
            response = await fetch(create_url, {
                method: 'POST', 
                body: JSON.stringify(workout), 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                }
            });
        }
        const data = await response.json();
        if (!response.ok) {
            setError(data.error);
        }
        if (response.ok) {
            setTitle('');
            setReps('');
            setLoad('');
            setError(null);
            if (isUpdate) {
                console.log('Workout updated successfully!');
                dispatch({type: 'UPDATE_WORKOUT', payload: data});
                setIsUpdate(false);
            }
            else{
                console.log('Workout added successfully!');
                dispatch({type: 'CREATE_WORKOUT', payload: data});
            }
        }
    }
    
    return ( 
        <form onSubmit={(e)=>handleSubmit(e)} className="create">
            
            <h3> {isUpdate? "Edit Workout": "Add a New Workout"}</h3>
            <label> Exercise Tile: </label>
            <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <label> Load: </label>
            <input
                type="number"
                required
                value={load}
                onChange={(e) => setLoad(e.target.value)}
            />

            <label> Reps: </label>
            <input
                type="number"
                required
                value={reps}
                onChange={(e) => setReps(e.target.value)}
            />

            <button> {isUpdate?"Update Workout":"Add Workout"} </button>
            {error && <div className="error">{error}</div>}
            
        </form>

     );
}
 
export default WorkoutForm;