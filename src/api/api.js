import { getToken, saveToken } from "./localStorage";

const BASEURL = "http://localhost:3000/api";

const getActivities = async() => {
    const endpoint = "/activities"
    const token = await getToken();
    try {
        //TODO will need to add user token string here
        const response = await fetch(BASEURL + endpoint, {
            headers:{'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        
        }
        });
        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.log(error);
    }
}

const createNewActivity = async(activityName, activityDescription) => {
    const token = await getToken();
    console.log(activityDescription)
    console.log(token);
    try {
        const response = await fetch(`${BASEURL}/activities`, {
            headers: {'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
            method: "POST",
            body: JSON.stringify({name: activityName, description: activityDescription})
        })

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const getAllRoutines = async() => {
    const response = await fetch('http://fitnesstrac-kr.herokuapp.com/api/routines', {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data;


}

const getRoutines = async(username) => {
    const token = await getToken();
    let conditionalHeaders = {};
    if (token) {
        conditionalHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
    } else {
        conditionalHeaders = {
            'Content-Type': 'application/json'
        }
        
    }

    try {
        const response = await fetch(`${BASEURL}/users/${username}/routines`, {
            headers: {
            conditionalHeaders,
            },
        });
        const data = await response.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.log(error);
    }

}

const createRoutine = async(name, goal, userObject) => {
    const token = await getToken();
    try {

        const response = await fetch(`${BASEURL}/routines`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify({
                name: name,
                goal: goal,
                isPublic: true
            }),
            user: JSON.stringify(userObject)

        
        })
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}

//update activity of the current logged in user's count and duration
const updateRoutineActivity = async(routineId, count, duration)=> {
    const token = await getToken();
    try {
        const response = await fetch(`${BASEURL}/routine_activities/${routineId}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            count: count,
            duration: duration})
        });
        const data = await response.json();
        console.log(data);
        return data;

}

     catch (error) {
        console.log(error)
    }
}
//add an activity to the routines of the current logged in user

const addUserActivity = async(routineId, activityId, count, duration) => {
    console.log(`api: addUserActivity: ${routineId} : ${activityId} : ${count} : ${duration}` )
    try {
        const response = await fetch(`${BASEURL}/routines/${routineId}/activities`, {
            headers:{
                'Content-Type':'application/json'
            },
            method: "POST",
            body: JSON.stringify({
              activityId: activityId,
              count: count, 
              duration: duration
            })
          });
        const data = await response.json();
        console.log("AddUserActivity: " + data);
        return data;

        
    } catch (error) {
        console.log(error);
    }
}


const registerUser = async(username, password) => {
    try{
        const response = await fetch(`${BASEURL}/users/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });
        const data = await response.json();
        console.log(data);
        /*const token = data.token;
        if (token !== null) {
            saveToken(token);
        } else {
            console.log(`token is null : ${token}`)
        }*/
        return data;

   } catch(error){
    console.log(error);
   }
}

const loginUser = async(username, password) => {
    try {
        const response = await fetch(`${BASEURL}/users/login`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',  
            },
            body: JSON.stringify({username: username, password: password})
        });

        const data = await response.json();
        console.log(data);
        if (data.token) {
            saveToken(data.token);
        } else {
            console.log(`${data.token} is null`)
        }
        return data;
        
    } catch (error) {
        console.log(error);
    }

}


const getUser = async() => {
    const token = await getToken();
    const response = await fetch(`${BASEURL}/users/me`, {
    
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
    })
    console.log("Token" + token);
    const data = await response.json();
    console.log(data);
    return data;
}

const deleteRoutine = async(routine_activity_id) => {
    const token = await getToken();
    try {
        const response = await fetch(`${BASEURL}/routine_activities/${routine_activity_id}`, {
            method: "DELETE",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export {registerUser, loginUser, getActivities, getUser, getRoutines, createNewActivity, createRoutine, getAllRoutines, addUserActivity, updateRoutineActivity, deleteRoutine}