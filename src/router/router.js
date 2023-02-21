import Home from "../Pages/Home"
import Todos from "../Pages/Todos"

export const routes = [
    {path: '/todo', element: <Todos/>},
    {path: '/home', element: <Home/>},
]