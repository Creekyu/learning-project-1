import React, {Suspense,lazy} from "react";

import AuthRoute from "../components/AuthRoute";



const routes = [
    {
        path:'/login',
        element: lazy(()=>import('../pages/Login'))
    },
    {
        path: '/',
        element: lazy(()=>import('../pages/MainPage')),
        children: [
            {
                path: 'home',
                element: lazy(()=>import('../pages/MainPage/Home'))
            },
            {
                path: 'users',
                element: lazy(()=>import('../pages/MainPage/Home')),
                children:[
                    {
                        path:'user_list',
                        element: lazy(()=>import('../pages/MainPage/Users')),
                    }
                ]
            },
            {
                path: 'role',
                element: lazy(()=>import('../pages/MainPage/Role/RoleList')),
                children:[
                    {
                        path:'role_list',
                        element:lazy(()=>import('../pages/MainPage/Role/RoleList'))
                    },
                    {
                        path:'character_list',
                        element: lazy(()=>import('../pages/MainPage/Role/CharacterList'))
                    }
                ]
            }
        ]
    },
];

// 对路由表元素进行批量操作
const syncRouter = (table) => {
    let mRouteTable = []
    table.forEach(route => {
        mRouteTable.push({
            path: route.path,
            element: (
                <Suspense fallback={ <div>路由加载ing...</div> }>
                    <AuthRoute>
                        <route.element/>
                    </AuthRoute>
                </Suspense>
            ),
            children: route.children && syncRouter(route.children)
        })

    })
    return mRouteTable
}

export default syncRouter(routes);