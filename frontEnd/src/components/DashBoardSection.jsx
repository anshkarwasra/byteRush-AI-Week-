import React from 'react'
import './DashBoardSection.css'
import { Link } from 'react-router-dom'
import { User,Settings,BookOpen,Eye,PenTool,Mail,Plus } from 'lucide-react'


const DashBoardSection = ({ Left }) => {
  return (
    <>
        <div className="dashBoardSection" style={{ left: Left ? '0rem' : '-255rem' }}>
                <div className="profile">
                    <span className="neon1"><User/></span><div className="info">userName <span className="grey">userInfo</span></div><span className="neon1"><Plus/></span>
                </div>
                <div className="bots">
                    <ul>
                        <li><span><Settings/></span><Link to='/dashboard/' state={{hideState: true}}>chatBot</Link></li>
                        <li><span><BookOpen/></span><Link to='/dashboard/crypto' state={{hideState: true}}>Crypto</Link></li>
                        <li><span><Eye/></span><Link to='/dashboard/tutor' state={{hideState: true}}>Tutor</Link></li>
                        
                        <li><span><Mail/></span><Link to='/dashboard/musicRecomandation' state={{hideState: true,hideState2:true}}>MusicReco</Link></li>
                    </ul>
                </div>
                <div className="menu">
                   <ul>
                    <li>Messages</li>
                    <li>Requests</li>
                    <li>Servers</li>
                   </ul>
                </div>
            </div>
    </>
  )
}

export default DashBoardSection