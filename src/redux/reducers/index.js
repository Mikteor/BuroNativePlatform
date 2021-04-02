import { combineReducers } from 'redux';
import auth from './auth'
import tickets from './tickets'
import users from './users'
import projects from './projects'
import news from './news'
import models from './models'
import office from './office'
import departments from './department'
import errors from './errors'
import notifications from './notifications'

export default combineReducers({
    users,
    auth,
    tickets,
    projects,
    news,
    models,
    office,
    departments,
    notifications,
    errors

});