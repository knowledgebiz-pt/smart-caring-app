import HomePage from "../views/HomePage"
import Login from "../views/Login"
export default [
    {
        name:'Homepage',
        iconType:'Material',
        iconName:'face-man',
        component: Login
    },
    {
        name:'Login',
        iconType:'Feather',
        iconName:'settings',
        component: Login

    },
    {
        name:'Saved Items',
        iconType:'Material',
        iconName:'bookmark-check-outline',
        component: Login
    },
    {
        name:'Refer a Friend!',
        iconType:'FontAwesome5',
        iconName:'user-friends',
        component: Login
    },
    {
        name: 'Nuke',
        iconType: 'Material',
        iconName: 'nuke',
        component: Login
    }
 ]