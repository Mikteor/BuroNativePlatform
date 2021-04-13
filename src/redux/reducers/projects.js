
import { useEffect } from 'react';
import { ADD_SPRINT,SORT_PROJECTS, ALL_PROJECTS,EDIT_PROJECT, CREATE_FAIL, EDIT_TASK, CREATE_PROJECT, GET_PROJECT, SPRINT_ERROR, ALL_SPRINT, UPDATE_PROJECT, GET_SPRINT, GET_TOKEN, ADD_TASKS, FINISH_TASK, DELETE_PROJECT, FINISH_SPRINT, JOIN_TEAM,ADD_SPRINT_TO_CHOSEN,FINISH_PROJECT, ADD_INFO_SPRINT, CLEAR_MSG, CLEAR_ERROR, GET_URN, DELETE_SPRINT, CLEAR_URN, SELECTED_PROJECT, ADD_USER_TO_TASK, CLEAR_OPENED_PROJECT, CLEAR_OPENED_SPRINT, GET_TASKS } from '../types'

// const console = () => {
//     // useEffect(()=>{
//         console.log('state',initialState.tasks)
//     // },[initialState])
// }

const initialState = {
    projects: null,
    project: null,
    loadProject: false,
    loadedAllProj: false,
    sprints: [],
    loadSprints: false,
    sprint: null,
    tasks: [],
    tasksLoad: false,
    error: '',
    reload: false,
    trick: false,
    sprintLoad: false,
    outh: null,
    msg:'',
    sprint_msg:'',
    hey:'',

    selectedProject: null,
}


export default function(state = initialState, action) {

    const {
        type, payload
    } = action;

    switch(type){
       

            case ALL_PROJECTS:
            case SORT_PROJECTS:
                return {
                    ...state,
                    loadedAllProj: true,
                    projects: payload,
                    loadProject: false,
                    sprint_load: false,
                    sprintLoad: false,
                    sprints: [],
                    trick: false,

                    error: ''
                }
                
                case CREATE_PROJECT:
                return {
                    ...state,
                    // project: payload,
                    loadedAllProj: false,
                    loadProject: true,
                    sprint_load: false,
                    sprintLoad: false,
                    reload: true,
                    error: '',
                    msg: payload.msg
                }
                case CLEAR_ERROR:
                    return {
                        ...state,
                       error:''  
                    }
                case EDIT_TASK: 
                console.log('edited task sprint', payload.sprint)
                    return {
                        ...state,
                        sprint: payload.sprint
                    }
                case ADD_USER_TO_TASK:
                    return {
                        ...state,
                        sprint: payload
                    }
                case CLEAR_MSG:
                    return {
                        ...state,
                        msg:'',
                        sprint_msg:'',
                        hey:''
                    }
                case EDIT_PROJECT:
                    return {
                        ...state,
                        loadProject: false,
                        msg: payload.msg
                    }
            case GET_PROJECT:
                console.log(payload)
                return {
                    ...state,
                    project: payload,
                    sprints: payload.sprints,
                    // team: payload.team2,
                    // loadedAllProj: false,
                    // loadProject: true,
                    // sprint_load: false,
                    // sprintLoad: false,
                    // reload: false,
                    // error: ''
                }
            case ADD_SPRINT:
                console.log('new sprint',payload.sprint)
                return {
                    ...state,
                    project: payload.project,
                    sprint: payload.sprint,
                    sprint_load: true,
                    loadProject: false,
                    reload: true,
                    error: '',
                    sprint_msg:payload.msg,
                }
            case ADD_INFO_SPRINT: 
                return {
                    ...state,
                    sprint: payload,
                    sprintLoad: false,
                }

                case GET_TOKEN:
                    return {
                        ...state,
                        oauth: payload
                    }
                case CLEAR_URN: 
                    return {
                        ...state,
                        oauth: null
                    }
                case DELETE_SPRINT:
                    return {
                        ...state,
                        project: payload.project
                    }
                case ADD_TASKS:
                return {
                    ...state,
                    // tasks: payload,
                    sprint: payload,
                    error: '',
                    msg:payload.msg
                }
                case GET_TASKS:
                    console.log('tasks',payload)
                return {
                    ...state,
                    tasks: payload,
                    
                }
                case JOIN_TEAM:
                    return {
                        ...state,
                        project: payload.project,
                        msg: payload.msg,
                        error: ''
                    }
            case ALL_SPRINT:
                return {
                    ...state,
                    sprints: payload,
                    trick: true,
                    loadSprints: true,
                    sprintLoad: false,
                    sprint: null,
                    error: ''
                }
            case GET_SPRINT:
                console.log('sprint',payload)

                return {
                    ...state,
                    sprint: payload,
                    // reload: false,
                    // loadProject: false,
                    // sprintLoad: true,
                    // loadSprints: true,
                    // error: ''
                }
            case UPDATE_PROJECT:
                return {
                    ...state,
                    loadedAllProj: true,
                    project: payload.sprint,
                    error: ''
                }
            case GET_URN:
                return {
                    ...state,
                    project: payload.project,
                    msg: payload.msg
                }
                case FINISH_PROJECT:
                    return {
                        ...state,
                        msg: payload.msg,
                        loadedAllProj: false,
                    }
            case FINISH_SPRINT:
                // console.log('finish',payload.project.sprints)
                return {
                    ...state,
                    msg: payload.msg,
                    project: payload.project,
                    error: ''
                }
                // case ADD_SPRINT_TO_CHOSEN:
                //     return {
                //         ...state,
                    
                //         msg: payload
                //     }
            case CREATE_FAIL:
                return {
                    ...state,
                    error: payload,
                    // loadProject: false,
                    // loadedAllProj: false
                }
                case FINISH_TASK:
                    console.log('finish task', payload)
                    return {
                    ...state,
                    // sprint: payload.sprint,
                    hey: payload
                }   
            case SPRINT_ERROR:
                return {
                    ...state,
                    error: payload,
                    loadProject: false,
                    loadedAllProj: false
                }
            case DELETE_PROJECT: 
                return {
                    ...state,
                    loadedAllProj: false,
                    msg: payload.msg
                }

               case SELECTED_PROJECT:
                   return {
                       ...state,
                       selectedProject: payload,
                   }
                   case CLEAR_OPENED_PROJECT:
                    return {
                        ...state,
                        project: null,
                    }
                    case CLEAR_OPENED_SPRINT:
                    return {
                        ...state,
                        sprint: null,
                        tasks: null,
                    }
            default: 
                return state;
    }

} 
