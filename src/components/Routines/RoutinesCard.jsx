import { useState } from "react"
import AddNewActivityForm from "./AddNewActivityForm";
import { updateRoutineActivity } from "../../api/api";
import RoutineActivityCard from "./RoutineActivitiyCard";
export default function RoutinesCard({newRoutineId, creatorName, goal, name, activities, resetRoutines, allActivities, }) {
    const [formToggle, setFormToggle] = useState(false);
    const [userActivities, setUserActivities] = useState(activities);

    const activitiesMapper = ()=> {
        if (userActivities) {
            const data = userActivities.map((activity) => {
                return <RoutineActivityCard key={activity.id} activity={activity}></RoutineActivityCard>
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