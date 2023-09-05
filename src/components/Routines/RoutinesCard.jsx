import { useEffect, useRef, useState } from "react"
import AddNewActivityForm from "./AddNewActivityForm";
import RoutineActivityCard from "./RoutineActivitiyCard";
export default function RoutinesCard({newRoutineId, creatorName, goal, name, activities, resetRoutines, allActivities }) {
    const [formToggle, setFormToggle] = useState(false);
    const [userActivities, setUserActivities] = useState(activities);
    const [mappedUsers, setMappedUsers] = useState([]);
    const mapTrigger = useRef(0);


    useEffect(() => {
        //remap user 
        const activitiesMapper = ()=> {
            console.log("user effect was called")
            if (userActivities) {
                console.log("about to map")
                const data = userActivities.map((activity) => {
                    return <RoutineActivityCard key={activity.id + activity.name + activity.goal} activity={activity} remapUsers={remapUsers} resetRoutines={resetRoutines} ></RoutineActivityCard>
                })
                setMappedUsers([...data]);
                return data 
            }
        }
        activitiesMapper();


    },[mapTrigger.current])
    

    const remapUsers = () => {
        mapTrigger.current = mapTrigger.current+1;
    }
    
    return (
        <div className="routines_card">
            <h3>Creator: {creatorName}</h3>
            <h3>Goal: {goal}</h3>
            <h3>Name: {name}</h3>
            <br></br>
            <h3>Activities</h3>
            {
                mappedUsers
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