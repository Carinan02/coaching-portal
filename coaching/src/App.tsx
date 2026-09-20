
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import FormIndex from './FormIndex'
import Carousel from './CarouselPage'
import FormCreate from './FormCreate'

function AppLayout(){
  return(
    <div className="grid grid-cols-[16rem_1fr] min-h-screen">
    <Sidebar/>
    <Outlet />
    </div>
  )
}

const routes = createBrowserRouter([
  {element : <AppLayout />, children : [
    {path : '/form', element : <FormIndex />},
    {path : '/form/:user', element : <FormCreate />},
    {path : '/dashboard', element : <h1>Dashboard Page</h1>},
    {path : '/carousel', element : <Carousel />},
    {path : '*', element : <h1>Not Found</h1>}]}
])
function App() {
  return (
    <RouterProvider router = {routes} />
  )
}

export default App
