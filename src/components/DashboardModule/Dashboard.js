import React from 'react';
import Sidebar from '../SidebarModule/Sidebar';
import Users from '../UserModule/Users';
import Analytics from '../AnalyticsModule/Analytics';
import Reports from '../ReportModule/Reports';
import UserDetails from '../UserModule/UserDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard">
            <div className='header'>
                <img src='https://engineerinc.io/wp-content/uploads/2023/03/60ed90a5ea27957b1f3c231f_logo-transparentbg-color-small-p-500.png' alt='logo' />
            </div>
            <main id='main'>
                <Router>
                    <div className='sidebar'>
                        <Sidebar />
                    </div>
                    <div id='main-content' className='main'>
                        <div className="main-content">
                            <Routes>
                                <Route path="/users" element={<Users />} />
                                <Route
                                    exact
                                    path="/users/:id"
                                    element={<UserDetails />}
                                />
                                <Route path="/reports" element={<Reports />} />
                                <Route path="/analytics" element={<Analytics />} />
                                <Route path="*" element={<Users />} />
                            </Routes>
                        </div>
                    </div>
                </Router>
            </main>

            <div className='footer'>
                <footer>
                    Footer Content
                </footer>
            </div>
        </div>
    );
}

export default Dashboard;
