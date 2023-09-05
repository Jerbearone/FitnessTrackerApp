import { useState } from "react"
import { addUserActivity } from "../../api/api";

export default function ActivitiesCard({activityName, activityDescription, activityId}) {
    const [count, setCount] = useState(1);
    const [duration, setDuration] = useState(10);

    const addNewActivity = async() =>{
        const addedActivity = await addUserActivity(activityId, count, duration);
        console.log(addedActivity);
        

    }
    return (
        <div>
            <h3>{activityName}</h3>
            
            <h4>{activityDescription}</h4>
            <button onClick={() => {
                addNewActivity();

            }}>Add to my activities</button>
            <br></br>
            <br></br>

            
        </div>
    )
}