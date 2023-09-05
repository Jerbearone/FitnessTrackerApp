import { useState, useEffect } from "react"
import { addUserActivity, getActivities } from "../../api/api";

export default function AddNewActivityForm({routineId, resetRoutines, allActivities, userActivities, setUserActivities}) {
    const [duration, setDuration] = useState(30);
    const [count, setCount] = useState(10);
    const [activityOption, setActivityOption] = useState();
    const [activities, setActivities] = useState([]);
    let [currentActivity, setCurrentActivity] = useState({})
    const allActivitiesArray = [...allActivities]
    console.log(`New activity: ${routineId}`)

    useEffect(()=> {
        const getUserActivities = async() => {
            const userData = await getActivities();
            console.log(userData);
            const newActivities = [...userData]
            setActivities(newActivities);
        }
        getUserActivities();
    },[])

    const addActivityToRoutine = async() => {
        try {
            if (currentActivity) { 
                console.log(`routineId: ${routineId} acitvityId: ${currentActivity.id} count: ${count} duration: ${duration}`)
                const response = await addUserActivity(routineId,currentActivity.id, count, duration );
                console.log("Users activity response: " + JSON.stringify(response));
                //console.log(resetRoutines);
                //await resetRoutines();
                const newActivities = [...userActivities]
                newActivities.push(currentActivity)
                //setActivities(newActivities)
                
                setUserActivities(newActivities);
                
            }
            
        }catch (error){
            console.log(error);
        }
    }

    return (<div className="add_new_activity_form">
        
        <form>
            <label>Activity: 
                <select onChange={(e)=> {
                  
                    const newObject = e.target.value;
                    const newerObject = JSON.parse(newObject);
        
                    setActivityOption(newerObject.name);
                    setCurrentActivity(newerObject);
                    console.log("Selected Option" + newObject)
                    }}>
            
                    {
                        
                    allActivitiesArray.map((activity) => {
                        //const activityName = activity.name;
                        //console.log(activity);
          
                        return <option  value={JSON.stringify(activity)} key={activity.id}>{activity.name}</option>
                    })}

                </select>
            </label>
            <br></br>
            <br></br>
            <label>duration:<input onChange={(e)=>{setDuration(e.target.value)}} type="number" value={duration}></input></label>
            <label>count:<input onChange={(e) => {setCount(e.target.value)}} type="number" value={count}></input></label>
            <br></br><br></br>

            <button onClick={(e)=> {
            //add activity to users routine
            e.preventDefault()
            addActivityToRoutine();

        }}>Submit</button>
        </form>


    </div>)
}