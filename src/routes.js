import { ActivityApp } from './pages/ActivityApp.jsx'
import { ActivityDetails } from './pages/ActivityDetails.jsx'
import { ActivityEdit } from './pages/ActivityEdit.jsx'
import { HomeApp } from './pages/HomeApp.jsx'
// import { About } from './pages/About.jsx'
// import { Login } from './pages/Login.jsx'
// import { Dashboard } from './pages/Dashboard.jsx'

export default [

    {
        path: '/activity',
        component: ActivityApp
    },

    {
        path: '/activity/:activityId/',
        component: ActivityDetails,
    },

    {
        path: '/activity/edit/:activityId/',
        component: ActivityEdit,
    },
    {
        path: '/activity/add',
        component: ActivityEdit,
    },

    {
        path: '/',
        component: HomeApp,
    },
  
]