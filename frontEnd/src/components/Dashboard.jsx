import React, { createContext, useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Edit, Trash, Cross, Menu } from 'lucide-react';
import DashBoardSection from './DashBoardSection';
import MyLineChart from './MyBarChart';
import './Dashboard.css'
import ChatUi from './ChatUI';
import FaceDetect from './FaceDetect';
// First, create the context
const LayoutContext = createContext();

// Create the Layout Provider
export function LayoutProvider({ children }) {
    const [Left, setLeft] = useState(false);
    return (
        <LayoutContext.Provider value={{ Left, setLeft }}>
            {children}
        </LayoutContext.Provider>
    );
}

// Custom hook to use the layout context
export function useLayout() {
    const context = useContext(LayoutContext);
    return context;
}

// Define the DashboardLayout component
function DashboardLayout() {
    const { Left, setLeft } = useLayout();
    
    return(
        <>
            <span className="btn" style={{position:'absolute',zIndex:'999'}}>
                <button onClick={()=> setLeft(!Left)}>
                    {Left ? <Cross/> : <Menu/>}
                </button>
            </span>
            <DashBoardSection Left={Left} />
            <Outlet />
        </>
    );
}

// Define the CryptoPage component
function CryptoPage() {
    const { Left } = useLayout();
    
    return (
        <div className="dashboard" style={{left:Left ? '20vw':'0vw', width:Left ? '80vw':'100vw'}}>
            

            <div className="dashboard__content">

                <section className="dashboard__section">
                    <h3>Expected Trends in BitCoin</h3>
                    <div className="dashboard__analytics">
                        <div className="analytics__chart">
                            <p>price(in $)</p>
                            <div className="chart-placeholder"></div>
                        </div>
                        <div className="analytics__chart">
                           
                            <div className="chart-placeholder">
                                <MyLineChart />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}


// Define routes
const routes = [
    
    {
        path: '/dashboard',
        element: <LayoutProvider><DashboardLayout /></LayoutProvider>,
        children: [
            {
                path: 'crypto',
                element: <CryptoPage />
            },
            {
                path: '',
                element: <ChatUi heading='Chat with Ai' isUpload={false} />
            },
            {
                path: 'tutor',
                element: <ChatUi heading='Get Some Learnings' isUpload={true}/>
            },
            {
                path: 'travel',
                element: <div>travel agent is here!</div>
            },
            {
                path: 'musicRecomandation',
                element: <FaceDetect/>
            }
        ]
    }
];

// Export the routes
export { routes };

// The Dashboard component is now simpler
function Dashboard() {
    return <DashboardLayout />;
}

export default Dashboard;