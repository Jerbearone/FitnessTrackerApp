import { useState, useEffect } from "react";
import { createRoutine, getActivities, getAllRoutines, getRoutines, getUser } from "../../api/api";
import RoutinesCard from "./RoutinesCard";
export default function RoutinesContainer() {

    const [userId, setUserId] = useState(null)
    const [userName, setUserName] = useState("");
    const [userRoutines, setUserRoutines] = useState([])

    const [allActivities, setAllActivities] = useState([])
    const [routines, setRoutines] = useState([])
    const [routineName, setRoutineName] = useState("");
    const [goal, setGoal] = useState("");

    useEffect(()=> {
        const getUserRoutines = async() => {
            try {
                const data = await getUser();
                console.log(data);
                setUserName(data.username);
                setUserId(data.id);
                
                const myRoutines = await getRoutines(data.username);
                setUserRoutines([...myRoutines]);
                console.log(myRoutines);
                
            } catch (error) {
                console.log(error);
            } 
        }
        getUserRoutines();

    },[]);

    useEffect(() => {
        const getAllRoutinesData = async() => {
            const data = await getAllRoutines();
            console.log(data);
            setRoutines(data)

            const activities = await  getActivities();
            setAllActivities(activities);
        }
        getAllRoutinesData();
    }, [])

    const resetRoutines = async() => {
        const getAllRoutinesData = async() => {
            const userData = await getUser();
            console.log(userData);
            setUserName(userData.username);
            setUserId(userData.id);
            
            const myRoutines = await getRoutines(userData.username);
            const data = await getAllRoutines();
            console.log("Resetting Routines... : " + data);
            const newData = [...data]
            setRoutines(newData)

            const activities = await  getActivities();
            setAllActivities(activities);

           
     
            const myNewRoutines = [...myRoutines]
            setUserRoutines(myNewRoutines);
            console.log(myRoutines);
        }
        getAllRoutinesData();
    }


    const handleRoutineNameChanged = (e) => {
        setRoutineName(e.target.value);

    }

    const handleGoalChanged = (e) => {
        setGoal(e.target.value);
    }

    const createActivity = async(event) => {
        event.preventDefault();
        if (goal && routineName) {
            //console.log(`${goal} : ${routineName}`)
            //console.log(userId);
            const data = await createRoutine(routineName, goal, {id: userId, username: userName} )
            //console.log(data);
            if (data) {
                const newData = await getRoutines(userName);
                //const newData = await getRoutines();
                console.log(newData)
                setUserRoutines(newData);
            }
        }
    }

    return (<div className="routines_container">
        <h3>Welcome {userName}!</h3>
        <br></br>

        <div className="activity_form">
            <button onClick={()=> {
                createActivity();
            }}>Add Routine</button>
            {
                //create form for new activities with onChange listeners
                <form>
                    <br></br>
                    <label>Routine name:<input type="text" onChange={handleRoutineNameChanged}></input></label><br></br><br></br>
                    <label>Goal:<input type="text" onChange={handleGoalChanged}></input></label><br></br><br></br>
                    <button onClick={createActivity}>Submit</button>
                </form>
            }
        </div>

        <h3>Users Routines</h3>
        {userRoutines.map((userRoutine) => {
            const id = userRoutine.id;
            //console.log("Routines Container: " + id)
            //console.log(`Routine Container activities : ${userRoutine.activities}`)

            return <RoutinesCard key={id + userRoutine.activities} newRoutineId={id} creatorName={userRoutine.creatorName} goal={userRoutine.goal} name={userRoutine.name}
             activities={userRoutine.activities} resetRoutines = {resetRoutines} allActivities={allActivities}></RoutinesCard>
        })}

        <h3>Public Routines</h3>
        {userRoutines && routines.map((singleRoutine) => {
            return <RoutinesCard key={singleRoutine.id} newRoutineId={singleRoutine.id} creatorName={singleRoutine.creatorName} goal={singleRoutine.goal}
             name={singleRoutine.name} resetRoutines={resetRoutines} allActivities={allActivities}></RoutinesCard>
        })}
    </div>)
}