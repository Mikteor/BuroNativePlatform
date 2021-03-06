import { Alert } from "react-native";
import { innerBackend, instance } from "../../components/utils/axios";
import { ADD_SPRINT, SORT_PROJECTS, ADD_TASKS,CLEAR_URN, ALL_PROJECTS, ALL_SPRINT, EDIT_TASK, CREATE_FAIL, DELETE_PROJECT,EDIT_PROJECT, FINISH_SPRINT, FINISH_TASK, GET_PROJECT,CREATE_PROJECT, GET_SPRINT, JOIN_TEAM, PROJECT_ID, SPRINT_ERROR, FINISH_PROJECT,ADD_INFO_SPRINT,CLEAR_MSG, CLEAR_ERROR, DELETE_SPRINT, PROJECTS_SORT, SELECTED_PROJECT, ADD_USER_TO_TASK, CLEAR_OPENED_PROJECT, CLEAR_OPENED_SPRINT, GET_TASKS, DELETE_TASK  } from "../types";





export const newProject = (formData) => async dispatch  => {
    // console.log (formData)
    try {
   
        const res = await innerBackend.post('/projects/add', formData)
        dispatch({
            type: CREATE_PROJECT,
            payload: res.data
        })

        }
      catch (err) {
        // const errors = err.response.data.err
        // errors.map(error => {
        //    return dispatch({
        //     type: CREATE_FAIL,
        //     payload: error.msg
        // })
        // })            
      
    }

}

export const sortProjects = ({ query, orderSort }) => async (dispatch) => {
  try {
    const res = await innerBackend.get(
      `/projects?field=${query}&order=${orderSort}`
    );
    dispatch({
      type: SORT_PROJECTS,
      payload: res.data,
    });
  } catch (err) {
    // alert("hahaha classic");
  }
};


export const clearUrn = () => async dispatch => {
    try {
        dispatch({
            type: CLEAR_URN
        })
    } catch (error) {
    }
}
export const clearOpenedProject = () => dispatch => {
 
      dispatch({
          type: CLEAR_OPENED_PROJECT,
          payload: ''
      })
}
export const clearOpenedSprint = () => dispatch => {
 
  dispatch({
      type: CLEAR_OPENED_SPRINT,
      payload: ''
  })
}
export const allProjects = () => async dispatch  => {
    
    try {
        const res = await innerBackend.get('/projects?field=title&order=true')
        dispatch({
            type: ALL_PROJECTS,
            payload: res.data
        })
        }
      catch (err) {
        // const errors = err.response.data.err;
        // errors.map(error => {
        //    return dispatch({
        //     type: CREATE_FAIL,
        //     payload: error.msg
        // })
        // })            
      
    }

}

export const getProject = (id) => async dispatch  => {
    
    try {

        const res = await innerBackend.get(`/mob/mobproject/${id}`)
        dispatch({
            type: GET_PROJECT,
            payload: res.data
        })

        }
      catch (err) {
        // const errors = err.response.data.err;
        // errors.map(error => {
        //    return dispatch({
        //     type: CREATE_FAIL,
        //     payload: error.msg
        // })
        // })            
      
    }

}


export const addSprint = (id, title,description, tags) => async dispatch  => {
  try {
    // let taskObjectArray = tasks.map(el => {return {
    //   taskTitle: el,
    //   workVolume: 0,
    //   taskState: false,
    // }})
    // console.log('as 1')
      let body = {
          title: title,
          description: description,
          date: '2011-11-11',
          tasks: [],
          tags: tags
      }
      
      // console.log('body', body)
      const res = await innerBackend.post(`/mob/sprints/new/${id}`,body)
    // console.log('as 2')

      dispatch({
          type: ADD_SPRINT,
          payload: res.data
      })
    // console.log('as 3')

      // dispatch({
      //     type: GREEN_MSG,
      //     payload: res.data
      // })
    // console.log('as 4')

      }
    catch (err) {
      // console.log('sprint create error', err)
      // const errors = err.response.data.err;
      // errors.map(error => {
      //    return dispatch({
      //     type: ERROR_MSG,
      //     payload: error.msg
      // })
      // })            
    
  }
 
}

export const EditTask = (editTask, taskID, sprintID, date) => async (dispatch) => {
    try {
      const data = {
        taskid:taskID,
        taskTitle:editTask,
        deadline: date? date: '2011-11-11',
    }
        const res = await innerBackend.put(`/mob/sprints/taskedit/${taskID}`, data);
        dispatch({
            type: EDIT_TASK,
            payload: res.data
        })
    } catch (err) {
        // console.log('task edit error::', err)
        // console.log('task edit error::', err.response.data.errors)
    }
} 


export const editProject = (formData, id) => async dispatch  => {
    try {
        // console.log('hello edit', formData)
        const res = await innerBackend.put(`/projects/${id}`, formData)
        dispatch({
            type: EDIT_PROJECT,
            payload: res.data
        })
    
  
      }
      catch (err) {
        // const errors = err.response.data.err;
        // errors.map(error => {
        //    return dispatch({
        //     type: CREATE_FAIL,
        //     payload: error.msg
        // })
        // })
            
      } 
  
  }

export const allSprints = (id) => async dispatch  => {
    try {

        const res = await innerBackend.get(`/projects/sprints/${id}`)
        dispatch({
            type: ALL_SPRINT,
            payload: res.data.sprints
        })
        // console.log(res.data, 'my data')

        }
      catch (err) {
        // const errors = err.response.data.err;
        // errors.map(error => {
        //    return dispatch({
        //     type: SPRINT_ERROR,
        //     payload: error.msg
        // })
        // })            
      
    }

}

export const getTasks = (id) => async dispatch => {
  try {

    const res = await innerBackend.get(`/mob/mobtasks/${id}`)
    dispatch({
        type: GET_TASKS,
        payload: res.data
    })
    // console.log(res.data, 'my data')

    }
  catch (err) {
    // const errors = err.response.data.err;
    // errors.map(error => {
    //    return dispatch({
    //     type: SPRINT_ERROR,
    //     payload: error.msg
    // })
    // })            
  
}
}


export const getSprint = (id) => async dispatch  => {
    // console.log(id, '????????????????')
    try {
        const res = await innerBackend.get(`/mob/mobsprint/${id}`)
        dispatch({
            type: GET_SPRINT,
            payload: res.data
        })

        }
      catch (err) {
        // const errors = err.response.data.err;
        // errors.map(error => {
        //    return dispatch({
        //     type: SPRINT_ERROR,
        //     payload: error.msg
        // })
        // })            
      
    }

}


export const deleteSprint = (id) => async dispatch => {
    try {
        // console.log(id, 'sprint id')
        const res = await innerBackend.delete(`/mob/sprints/${id}`);
        dispatch({
            type: DELETE_SPRINT,
            payload: res.data
        })
    } catch (err) {
      // console.log('delete sprint errpr:', err)
      Alert.alert('????????????', err.response.data.err)

    }
}



export const addTask = ( id, task ) => async (dispatch) => {

        // console.log('id:', id, 'task: ', task)
    try {
      let tasks = {
        taskTitle: task,
        workVolume: 0,
        taskState: false,
      };
  
  
      // console.log('tasks',tasks, id)
      const res = await innerBackend.post(
        `/projects/sprints/task/${id}`,
        tasks
      );
  
      // console.log('part2')
      dispatch({
        type: ADD_TASKS,
        payload: res.data,
      });
  
      // console.log(res.data)
  
    } catch (err) {
        // console.log('add task error::',err)
      // const errors = err.response.data.err;
     
      //   return dispatch({
      //     type: SPRINT_ERROR,
      //     payload: errors.msg,
      //   });
      
    }
  };

  export const addUserToTask = ( id, userid, taskId ) => async (dispatch) => {
    try {
      let body = {
        userid: userid,
        taskid: taskId,
      };
  
      const res = await innerBackend.put(`/mob/sprints/task/adduser/${id}`, body);
      dispatch({
        type: ADD_USER_TO_TASK,
        payload: res.data,
      });
    } catch (err) {
      // console.log(err.response.data);
    }
  }; 
  

export const finishTask = (sprintId, taskId) => async dispatch  => {
  
    try {

        const res = await innerBackend.put(`/mob/sprints/DAtask/${taskId}`)

        dispatch({
            type: FINISH_TASK,
            payload: res.data
        })

        }
      catch (err) {
          // console.log('finish task error::: ', err)
          // console.log('finish task error::: ', err.response.data.errors)
        // const errors = err.response.data.err;
        // errors.map(error => {
        //    return dispatch({
        //     type: SPRINT_ERROR,
        //     payload: error.msg
        // })
        // })            
      
    }

}

export const DeleteTask = ( id, taskId ) => async (dispatch) => {
    try {
      let body = {
        taskid: taskId,
      };
  
      const res = await innerBackend.put(`/projects/sprints/deltask/${id}`, body);

      dispatch({
        type: DELETE_TASK,
        payload: taskId,
      });

    } catch (err) {
      // console.log('delete task error::: ',err.response.data.err);
      Alert.alert('????????????', err.response.data.err)
    }
  }; 


export const finishSprint = (id) => async dispatch  => {
    try {
        const res = await innerBackend.put(`/mob/sprints/${id}`)
        dispatch({
            type: FINISH_SPRINT,
            payload: res.data
        })
        }
      catch (err) {
        Alert.alert('????????????', err.response.data.err)
        // console.log('finish sprint error',  err)
    }

}
export const addInfoSprint = (id, form) => async dispatch  => {
    // console.log (form.description, form.date, id)
    let body = {
        description: form.description,
        date: form.date,
    }
    try {
        const res = await innerBackend.put(`projects/sprints/dd/${id}`, body)
        dispatch({
            type: ADD_INFO_SPRINT,
            payload: res.data
        })
        }
      catch (err) {
        // const errors = err.response.data.err;
        // errors.map(error => {
        //    return dispatch({
        //     type: SPRINT_ERROR,
        //     payload: error.msg
        // })
        // })            
      
    }

}

// export const addToChosen = (id) => async dispatch  => {
//     console.log ('hi sprint', id)
//     try {
//         const res = await innerBackend.put(`projects/favsprint/${id}`)
//         dispatch({
//             type: ADD_SPRINT_TO_CHOSEN,
//             payload: res.data
//         })
//         }
//       catch (err) {
//         const errors = err.response.data.errors;
//         errors.map(error => {
//            return dispatch({
//             type: SPRINT_ERROR,
//             payload: error.msg
//         })
//         })            
      
//     }

// }

export const finishProject = (id) => async dispatch  => {
   
    try {
        const res = await innerBackend.put(`projects/finish/${id}`)
        dispatch({
            type: FINISH_PROJECT,
            payload: res.data
        })
        }
      catch (err) {
        // const errors = err.response.data.err;
        // errors.map(error => {
        //    return dispatch({
        //     type: CREATE_FAIL,
        //     payload: error.msg
        // })
        // })            
      
    }

}

export const deleteProject = (crypt) => async dispatch  => {

    try {
        // console.log(tasks, 'tasks', id, 'id')
        const res = await innerBackend.delete(`projects/${crypt}`)
        dispatch({
            type: DELETE_PROJECT,
            payload: res.data
        })

        }
      catch (err) {
        // const errors = err.response.data.err;
        // errors.map(error => {
        //    return dispatch({
        //     type: SPRINT_ERROR,
        //     payload: error.msg
        // })
        // })            
      
    }

}




export const joinTeam = (id, pos, task) => async dispatch  => {

    try {
      // console.log('1', id)
        const body = {position: pos, task: task}
        const res = await innerBackend.put(`/mob/join2/${id}`,body)
        // console.log('2')

        dispatch({
            type: JOIN_TEAM,
            payload: res.data
        })

        }
      catch (err) {
        console.log('join team error::: ',err)
        // const errors = err.response.data.err;
        // errors.map(error => {
        //    return dispatch({
        //     type: SPRINT_ERROR,
        //     payload: error.msg
        // })
        // })            
      
    }

}


export const selectedProject = (crypt) => async dispatch  => {

    return dispatch({
        type: SELECTED_PROJECT,
        payload: crypt,
    })


}