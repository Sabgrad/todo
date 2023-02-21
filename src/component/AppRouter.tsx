import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Todos from '../Pages/Todos';
import { routes } from '../router/router.js';

const AppRouter = () => {
    return (
        <Routes>
            {routes.map(route =>
                <Route
                    path={route.path}
                    element={route.element}
                    key={route.path}
                />
            )}
            <Route path='/*' element={<Todos/>}/>
        </Routes>
    )
}

export default AppRouter;