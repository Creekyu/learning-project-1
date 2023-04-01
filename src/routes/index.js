import AuthRoute from "../components/AuthRoute";
import Home from '../pages/MainPage/Home';
import RoleList from "../pages/MainPage/Role/RoleList";
import CharacterList from "../pages/MainPage/Role/CharacterList";
import Users from "../pages/MainPage/Users";
import Login from "../pages/Login";
import MainPage from "../pages/MainPage";

const routes = [
    {
        path:'/login',
        element: <AuthRoute path="/login"><Login/></AuthRoute>
    },
    {
        path:'/logout',
        element: <Login/>
    },
    {
        path: '/',
        element: <AuthRoute path="/"><MainPage/></AuthRoute>,
        children: [
            {
                path: 'home',
                element: <Home/>
            },
            {
                path: 'users',
                element: null,
                children:[
                    {
                        path:'user_list',
                        element: <AuthRoute path="/users/user_list"><Users/></AuthRoute>
                    }
                ]
            },
            {
                path: 'role',
                element: null,
                children:[
                    {
                        path:'role_list',
                        element:<AuthRoute path="/role/role_list"><RoleList/></AuthRoute>
                    },
                    {
                        path:'character_list',
                        element: <AuthRoute path="/role/character_list"><CharacterList/></AuthRoute>
                    }
                ]
            },
            {
                path: 'news',
                element: null
            },
            {
                path: 'audit',
                element: null
            },
            {
                path: 'publish',
                element: null
            },
        ]
    },
];

export default routes