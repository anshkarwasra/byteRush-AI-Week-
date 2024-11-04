
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Heading from './components/Heading';
import About from './components/About';
import BuildModel from './components/BuildModel';
import GetStarted from './components/GetStarted';
import Footer from './components/Footer';
import Contact from './components/Contact';
import { routes as dashboardRoutes } from './components/Dashboard';
import CreateModel from './components/CreateModel';
import { modelRoutes } from './components/CreateModel';
// import Discord from './components/Discord';

// Create a layout component that includes common elements
function RootLayout() {
  return (
    <>
      <Navbar />
      <Outlet /> {/* This is where the route-specific content will render */}
      <GetStarted/>
      <Footer/>
    </>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          path: '/',
          element: <Heading />,
        },
        {
          path: '/about',
          element: <About />,
        },
        {
          path: '/getStarted',
          element: <BuildModel />,
        },
        {
          path: '/contact',
          element: <Contact />,
        },
        {
          path:'/model',
          element:<CreateModel/>
        },
        ...dashboardRoutes,
        ...modelRoutes
      ],
    },
  ]);

  return <RouterProvider router={router} />;
  // return <Discord/>
}

export default App;



