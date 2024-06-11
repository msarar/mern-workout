const Workout = require('../models/WorkoutModel');
const mongoose = require('mongoose');

//get all workouts
const getWorkouts = async (req, res) => {
    try{
        const user_id = req.user._id;
        const workouts = await Workout.find({user_id: user_id}).sort({createdAt: -1});
        return res.status(200).json(workouts);
    }
    catch(err){
        return res.status(400).json({error: err.message})
    }
}
//get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: `Invalid id ${id}`});
    }
    try{
        const user_id = req.user._id;
        const workout = await Workout.find({user_id: user_id, _id: id});
        // const workout = await Workout.findOne({_id: id});
        if(!workout){
            return res.status(404).json({message: `Workout with id ${id} not found`});
        }
        return res.status(200).json(workout);
    }
    catch(err){
        return res.status(400).json({error: err.message})
    }
}


//create a workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;
    try{
        const user_id = req.user._id;
        const workout = await Workout.create({title, reps, load, user_id});
        return res.status(200).json(workout);
    }
    catch(err){
        return res.status(400).json({error: err.message})
    }
};
//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: `Invalid id ${id}`});
    }
    try{
        // const workout = await Workout.findByIdAndDelete(id);
        const workout = await Workout.findOneAndDelete({_id: id})
        if(!workout){
            return res.status(404).json({message: `Workout with id ${id} not found`});
        }
        return res.status(200).json(workout);
    }
    catch(err){
        return res.status(400).json({error: err.message})
    }
}
//update a workout
const  updateWorkout = async (req, res) =>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: `Invalid id ${id}`});
    }
    

    const workout = await Workout.findOneAndUpdate({_id: id},{...req.body},{new: true});

    if (!workout) {
        return res.status(404).json({message: `Workout with id ${id} not found`});
    }

    return res.status(200).json(workout);
}



module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
};
