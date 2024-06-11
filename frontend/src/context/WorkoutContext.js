import { createContext, useReducer } from "react";

export const WorkoutContext = createContext();

export const WorkoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            state = {workouts: action.payload}
            return state;
        case "CREATE_WORKOUT":
            state = {workouts: [action.payload, ...state.workouts]}
            return state;
        case "DELETE_WORKOUT":
            state = {workouts: state.workouts.filter((w) => w._id !== action.payload._id)}
            return state;
        case "UPDATE_WORKOUT":
            console.log('action.payload: ', action.payload);
            state = {workouts: state.workouts.map((w) => w._id === action.payload._id ? action.payload : w)}
            return state;
        default:
            return state;
    }
}

export const WorkoutContextProvider = (props) => {
    const [state, dispatch] = useReducer(WorkoutsReducer, {workouts: null});
    // so technically state is object with workouts key and value of null

    return ( 
        <WorkoutContext.Provider value={{...state, dispatch}}>
            {props.children}
        </WorkoutContext.Provider>
     );
}
 
