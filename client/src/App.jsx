import { useState } from "react";
import Login from './Pages/Login';
import Register from './Pages/Register';
import Dashboard from './Pages/Dashboard';

export default function App(){
    const [activePage, setActivePage] = useState('login')

    return(
        <div className="app-shell">
            <h1>Finance Tracker</h1>

            <nav className="nav-buttons">
                <button onClick={() => setActivePage('login')}>Login</button>
                <button onClick={() => setActivePage('register')}>Register</button>
                <button onClick={() => setActivePage('dashboard')}>Dashboard</button>
            </nav>

            <main className="page-card">
                {activePage === 'login' && <Login></Login>}
                {activePage === 'register' && <Register></Register>}
                {activePage === 'dashboard' && <Dashboard></Dashboard>}
            </main>

        </div>
    );
};
