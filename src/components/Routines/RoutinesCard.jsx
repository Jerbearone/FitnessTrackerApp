import { useState } from "react"
import AddNewActivityForm from "./AddNewActivityForm";
import { updateRoutineActivity } from "../../api/api";
export default function RoutinesCard({newRoutineId, creatorName, goal, name, activities, resetRoutines, allActivities, }) {
    const [formToggle, setFormToggle] = useState(false);
    const [userActivities, setUserActivities] = useState(activities);
    const [updateButtonToggle, setUpdateButtonToggle] = useState(false);
    const [updatedCount, setUpdatedCount] = useState(0);
    const [updatedDuration, setUpdatedDuration] = useState(0);
    //console.log(`Routines Card: routineId: ${newRoutineId} creator: ${creatorName}`)
    //console.log(`user activities : ${activities}`)

    const updateCurrentActivity = async(activity) => {
        updateRoutineActivity(activity.routineActivityId, updatedCount, updatedDuration)


    }
    const activitiesMapper = ()=> {
        if (userActivities) {
            const data = userActivities.map((activity) => {
                return <div key={activity.name + activity.description + activity.id}>
                    <h2>{activity.name}</h2>
                    <h3>{activity.description}</h3>
                    <h4>Duration: {activity.duration}</h4>
                    <h4>Reps: {activity.count}</h4>

                    <button onClick={()=> {setUpdateButtonToggle(!updateButtonToggle)}}>Update</button>
                    {updateButtonToggle && <form>
                        <label>New Count: <br></br> <input onChange={(e)=>{setUpdatedCount(e.target.value)}} value={updatedCount}></input></label>
                        <label>New Duration:<br></br> <input  onChange={(e)=>{setUpdatedDuration(e.target.value)}} value={updatedDuration}></input></label>
                        <button onClick={async(e)=>{
                            e.preventDefault();
                            await updateCurrentActivity(activity);
                            
                        }}>Submit</button>
                        </form>}
                    </div>
            })
            return data 
        }
    }

    
    return (
        <div className="routines_card">
            <h3>Creator: {creatorName}</h3>
            <h3>Goal: {goal}</h3>
            <h3>Name: {name}</h3>
            <br></br>
            <h3>Activities</h3>
   
            {
                activitiesMapper()
                //map over activities here
            }
            <button onClick={() => {
                setFormToggle(!formToggle);
            }}>Add new Activity</button>
            <br></br>
            {formToggle && <AddNewActivityForm routineId={newRoutineId} resetRoutines={resetRoutines} activities={activities} allActivities={allActivities}
            setUserActivities={setUserActivities} userActivities={userActivities}></AddNewActivityForm>}


        </div>
    )
}