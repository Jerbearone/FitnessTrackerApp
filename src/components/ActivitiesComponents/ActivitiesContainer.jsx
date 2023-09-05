import { useState, useEffect } from "react"
import { createNewActivity, getActivities } from "../../api/api";
import ActivitiesCard from "./ActivitiesCard";
import { getToken } from "../../api/localStorage";
export default function ActivitiesContainer() {
    const [activites, setActivities] = useState([]);
    const [newActivityName, setNewActivityName] = useState("");
    const [newActivityDescription, setNewActivityDescription] = useState("");
    const token = getToken();


    //implement fetching all activities 
    useEffect(()=> {
        const getAllActivities = async() => {
            const tempActivities = await getActivities();
            setActivities(tempActivities);
        }

        getAllActivities();

    },[])

    const createActivity = async(event) => {
        event.preventDefault();
        if (newActivityName && newActivityDescription && token) {
            console.log(`${newActivityName} : ${newActivityDescription}`)
            const data = await createNewActivity(newActivityName, newActivityDescription)
            console.log(data);
            if (data) {
                const newData = await getActivities();
                setActivities(newData);
            }
        }



    }

    const handleNameChange = (event) => {
        setNewActivityName(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setNewActivityDescription(event.target.value);
    }
    return (
    <div className="activity_outer">
        <div className="activity_form">
            <button onClick={()=> {
                createActivity();
            }}>Add activity</button>
            {
                //create form for new activities with onChange listeners
                <form>
                    <br></br>
                    <label>name:<input type="text" onChange={handleNameChange}></input></label><br></br><br></br>
                    <label>Description:<input type="text" onChange={handleDescriptionChange}></input></label><br></br><br></br>
                    <button onClick={createActivity}>Submit</button>
                </form>

            }
        </div>



        {activites.map((activity) => {
            return <ActivitiesCard key={activity.id} activityId={activity.id} activityName={activity.name} activityDescription={activity.description}></ActivitiesCard>
        })}
        
    </div>)
}