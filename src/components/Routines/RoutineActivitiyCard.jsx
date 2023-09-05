import { useState } from "react";
import { updateRoutineActivity } from "../../api/api";

export default function RoutineActivityCard({activity}){
    const [updatedCount, setUpdatedCount] = useState(0);
    const [updatedDuration, setUpdatedDuration] = useState(0);
    const [updateButtonToggle, setUpdateButtonToggle] = useState(false);
    const [name, setName] = useState(activity.name);
    const [description, setDescription] = useState(activity.description);
    const [duration, setDuration] = useState(activity.duration);
    const [reps, setReps] = useState(activity.count);

    const updateCurrentActivity = async(activity) => {
        const result = await updateRoutineActivity(activity.routineActivityId, updatedCount, updatedDuration);
        return result;
    }

    return (<div>
        <h2>{name}</h2>
        <h3>{description}</h3>
        <h4>Duration: {duration}</h4>
        <h4>Reps: {reps}</h4>

        <button onClick={()=> {setUpdateButtonToggle(!updateButtonToggle)}}>Update</button>
        {updateButtonToggle && <form>
            <label>New Duration:<br></br> <input  onChange={(e)=>{setUpdatedDuration(e.target.value)}} value={updatedDuration}></input></label>
            <label>New Count: <br></br> <input onChange={(e)=>{setUpdatedCount(e.target.value)}} value={updatedCount}></input></label>
            
            <button onClick={async(e)=>{
                e.preventDefault();
                const updateResult = await updateCurrentActivity(activity);
                const updateVariables = async() => {
                    if (updateResult) {
                        setReps(updatedCount);
                        setDuration(updatedDuration);
                    } else {
                        console.log(updateResult);
                    }
                }
                await updateVariables();
                
                
            }}>Submit</button>
            </form>}
        </div>)

}