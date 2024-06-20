import React, { useEffect, useState } from 'react';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import { useAuthContext } from '../hooks/useAuthContext';

//components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';


const Home = () => {
    const {workouts, dispatch} = useWorkoutsContext()
    const [toUpdate, setToUpdate] = useState(null);

    const {user} = useAuthContext();

    // let base_url = process.env.REACT_APP_IS_DOCKER? "http://node-app:4000" : 'http://localhost:4000';
    // const base_url = "http://localhost:4000"
    const base_url = process.env.REACT_APP_BASE_URL;
    const full_url = base_url + '/api/workouts/';


    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(full_url, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }
        if (user){
            fetchWorkouts();
        }
        
    }, [dispatch, user]);
    
    return (
        <div className="home">           
            <div className='workouts'>
                {/* <h1>Workouts!{JSON.stringify(process.env.REACT_APP_IS_DOCKER)}</h1> */}

                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout} setToUpdate={setToUpdate} />     
                ))}
            </div>
            { workouts && <WorkoutForm toUpdate={toUpdate} />}

        </div>
    );
}
 
export default Home;