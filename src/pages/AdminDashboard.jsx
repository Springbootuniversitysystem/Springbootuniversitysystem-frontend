import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    // Basic security check to ensure only admins can see this page
    useEffect(() => {
        const role = localStorage.getItem('role');
        if (role !== 'ADMIN' && role !== 'ROLE_ADMIN') {
            navigate('/sign-in');
        }
    }, [navigate]);

    // State containers for backend data
    const [stats, setStats] = useState({
        totalLearners: 124,
        pendingMessages: 8,
        totalProgrammes: 18,
    });

    const [programmes, setProgrammes] = useState([
        { id: 1, programmeName: 'BSc Computer Science', institutionName: 'University of Johannesburg', faculty: 'Science', minimumAps: 30 }
    ]);

    const [learners, setLearners] = useState([
        { id: 1, fullName: 'Sibusiso Mokoena', email: 'sibu@gmail.com', grade: 'Grade 12', status: 'Active' },
        { id: 2, fullName: 'Lerato Ndlovu', email: 'lerato@gmail.com', grade: 'Grade 11', status: 'Active' }
    ]);

    const [messages, setMessages] = useState([
        { id: 1, date: '2026-07-27', sender: 'Thabo Molefe', email: 'thabo@gmail.com', subject: 'APS Score Enquiry', message: 'How do I calculate technical subject points?', status: 'Pending' }
    ]);

    const [newProgramme, setNewProgramme] = useState({
        programmeName: '', institutionName: '', faculty: '', minimumAps: '', applicationDeadline: '', description: '',
    });

    // --- Action Handlers ---
    const handleAddProgramme = (e) => {
        e.preventDefault();
        if (!newProgramme.programmeName || !newProgramme.institutionName) return;
        setProgrammes([...programmes, { ...newProgramme, id: Date.now() }]);
        setStats({ ...stats, totalProgrammes: stats.totalProgrammes + 1 });
        setNewProgramme({ programmeName: '', institutionName: '', faculty: '', minimumAps: '', applicationDeadline: '', description: '' });
    };

    const handleDeleteProgramme = (id) => {
        if (window.confirm("Are you sure you want to delete this programme?")) {
            setProgrammes(programmes.filter(prog => prog.id !== id));
            setStats({ ...stats, totalProgrammes: stats.totalProgrammes - 1 });
        }
    };

    const handleDeleteLearner = (id) => {
        if (window.confirm("Are you sure you want to delete this learner account permanently?")) {
            setLearners(learners.filter(learner => learner.id !== id));
            setStats({ ...stats, totalLearners: stats.totalLearners - 1 });
        }
    };

    const handleToggleSupportStatus = (id) => {
        setMessages(messages.map(msg => {
            if (msg.id === id) {
                // Toggle between Pending, Involved, and Resolved
                const newStatus = msg.status === 'Pending' ? 'Involved' : msg.status === 'Involved' ? 'Resolved' : 'Pending';
                return { ...msg, status: newStatus };
            }
            return msg;
        }));
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/sign-in');
    };

    return (
        <div className="admin-container">
            {/* Sidebar Navigation */}
            <aside className="admin-sidebar">
                <div className="admin-brand">
                    <h2>PathFinder</h2>
                    <span className="admin-badge">Admin Portal</span>
                </div>
                <nav className="admin-nav">
                    <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
                        📊 Overview
                    </button>
                    <button className={`nav-item ${activeTab === 'programmes' ? 'active' : ''}`} onClick={() => setActiveTab('programmes')}>
                        🎓 Programmes
                    </button>
                    <button className={`nav-item ${activeTab === 'learners' ? 'active' : ''}`} onClick={() => setActiveTab('learners')}>
                        👥 Learners
                    </button>
                    <button className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => setActiveTab('messages')}>
                        📩 Support Inbox
                    </button>

                    <button className="nav-item" onClick={handleLogout} style={{ marginTop: 'auto', color: '#ff4d4f' }}>
                        🚪 Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="admin-main">
                <header className="admin-header">
                    <h1>
                        {activeTab === 'overview' && 'System Overview'}
                        {activeTab === 'programmes' && 'University Programme Management'}
                        {activeTab === 'learners' && 'Learner Accounts'}
                        {activeTab === 'messages' && 'Contact Form Messages'}
                    </h1>
                    <p className="subtitle">Manage and monitor PathFinder operations</p>
                </header>

                {/* --- TAB 1: OVERVIEW STATS --- */}
                {activeTab === 'overview' && (
                    <div className="stats-grid">
                        <div className="stat-card">
                            <span className="stat-icon">👥</span>
                            <div>
                                <h3>{stats.totalLearners}</h3>
                                <p>Registered Learners</p>
                            </div>
                        </div>
                        <div className="stat-card">
                            <span className="stat-icon">🎓</span>
                            <div>
                                <h3>{stats.totalProgrammes}</h3>
                                <p>Active Programmes</p>
                            </div>
                        </div>
                        <div className="stat-card warning">
                            <span className="stat-icon">📩</span>
                            <div>
                                <h3>{stats.pendingMessages}</h3>
                                <p>Support Tickets</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* --- TAB 2: PROGRAMME MANAGEMENT --- */}
                {activeTab === 'programmes' && (
                    <div className="admin-section">
                        <div className="card form-card">
                            <h3>Add New University Programme</h3>
                            <form onSubmit={handleAddProgramme} className="admin-form">
                                <div className="form-row">
                                    <input type="text" placeholder="Programme Name" value={newProgramme.programmeName} onChange={(e) => setNewProgramme({ ...newProgramme, programmeName: e.target.value })} required />
                                    <input type="text" placeholder="Institution Name" value={newProgramme.institutionName} onChange={(e) => setNewProgramme({ ...newProgramme, institutionName: e.target.value })} required />
                                </div>
                                <div className="form-row">
                                    <input type="text" placeholder="Faculty" value={newProgramme.faculty} onChange={(e) => setNewProgramme({ ...newProgramme, faculty: e.target.value })} />
                                    <input type="number" placeholder="Min. APS Score" value={newProgramme.minimumAps} onChange={(e) => setNewProgramme({ ...newProgramme, minimumAps: e.target.value })} />
                                    <input type="date" value={newProgramme.applicationDeadline} onChange={(e) => setNewProgramme({ ...newProgramme, applicationDeadline: e.target.value })} />
                                </div>
                                <textarea placeholder="Programme Description..." rows="2" value={newProgramme.description} onChange={(e) => setNewProgramme({ ...newProgramme, description: e.target.value })} />
                                <button type="submit" className="primary-btn">Save Programme</button>
                            </form>
                        </div>

                        <div className="table-wrapper" style={{ marginTop: '2rem' }}>
                            <h3>Current Programmes</h3>
                            <table className="admin-table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Programme</th>
                                    <th>Institution</th>
                                    <th>Min APS</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {programmes.map((prog) => (
                                    <tr key={prog.id}>
                                        <td>{prog.id}</td>
                                        <td>{prog.programmeName}</td>
                                        <td>{prog.institutionName}</td>
                                        <td>{prog.minimumAps}</td>
                                        <td>
                                            <button onClick={() => handleDeleteProgramme(prog.id)} className="action-btn danger">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {programmes.length === 0 && (
                                    <tr><td colSpan="5" style={{textAlign: 'center'}}>No programmes found.</td></tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* --- TAB 3: LEARNER MANAGEMENT --- */}
                {activeTab === 'learners' && (
                    <div className="admin-section">
                        <div className="table-wrapper">
                            <table className="admin-table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Grade</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {learners.map((learner) => (
                                    <tr key={learner.id}>
                                        <td>{learner.id}</td>
                                        <td>{learner.fullName}</td>
                                        <td>{learner.email}</td>
                                        <td>{learner.grade}</td>
                                        <td>
                                            <button onClick={() => handleDeleteLearner(learner.id)} className="action-btn danger">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                                {learners.length === 0 && (
                                    <tr><td colSpan="5" style={{textAlign: 'center'}}>No learners found.</td></tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* --- TAB 4: SUPPORT INBOX --- */}
                {activeTab === 'messages' && (
                    <div className="admin-section">
                        <div className="table-wrapper">
                            <table className="admin-table">
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Sender Name</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {messages.map((msg) => (
                                    <tr key={msg.id}>
                                        <td>{msg.date}</td>
                                        <td>{msg.sender}</td>
                                        <td>{msg.subject}</td>
                                        <td>{msg.message}</td>
                                        <td>
                                            <span className={`badge ${msg.status.toLowerCase()}`}>{msg.status}</span>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleToggleSupportStatus(msg.id)}
                                                className="action-btn primary"
                                            >
                                                Mark {msg.status === 'Pending' ? 'Involved' : msg.status === 'Involved' ? 'Resolved' : 'Pending'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}