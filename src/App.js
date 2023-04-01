import React from 'react';
import {useRoutes} from "react-router";

import 'reset-css';
import './App.css'
import routes from "./routes";
import {ConfigProvider} from "antd";


function App() {
    const elements = useRoutes(routes);
    return (
        <ConfigProvider
            theme={{
                token:{
                    colorPrimary: '#31AAEB',
                }
            }}
        >
            {elements}
        </ConfigProvider>

    );
}

export default App;
