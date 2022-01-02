import Home from './pages/Home'
import Main from './pages/Main'
import UserDashboard from './pages/UserDashboard'
export default [
    {
        path: '/',
        component: Home,
        name: 'Home Page'
    },
    {
        path: '/main',
        component: Main,
        name: 'Main Page'
    },
    {
        path: '/user',
        component: UserDashboard,
        name: 'User Dashboard'
    }
]