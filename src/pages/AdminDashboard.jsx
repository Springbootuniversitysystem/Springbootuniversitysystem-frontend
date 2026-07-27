import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [loading, setLoading] = useState(false);

    // State containers for backend data
    const [stats, setStats] = useState({
        totalLearners: 124,
        totalApplications: 45,
        pendingMessages: 8,
        totalProgrammes: 18,
    });

    const [programmes, setProgrammes] = useState([]);
    const [newProgramme, setNewProgramme] = useState({
        programmeName: '',
        institutionName: '',
        faculty: '',
        minimumAps: '',
        applicationDeadline: '',
        description: '',
    });

    // Mock initial load or API call setup
    useEffect(() => {
        // Replace with real service calls when Emmanuel completes endpoints:
        // axios.get('/api/v1/admin/dashboard/stats').then(res => setStats(res.data));
    }, []);

    const handleAddProgramme = (e) => {
        e.preventDefault();
        if (!newProgramme.programmeName || !newProgramme.institutionName) return;

        setProgrammes([...programmes, { ...newProgramme, id: Date.now() }]);
        setNewProgramme({
            programmeName: '',
            institutionName: '',
            faculty: '',
            minimumAps: '',
            applicationDeadline: '',
            description: '',
        });
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
                    <button
                        className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                    >
                        📊 Overview
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'programmes' ? 'active' : ''}`}
                        onClick={() => setActiveTab('programmes')}
                    >
                        🎓 Programmes
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'learners' ? 'active' : ''}`}
                        onClick={() => setActiveTab('learners')}
                    >
                        👥 Learners
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
                        onClick={() => setActiveTab('messages')}
                    >
                        📩 Support Inbox
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
                        <div className="stat-card">
                            <span className="stat-icon">📄</span>
                            <div>
                                <h3>{stats.totalApplications}</h3>
                                <p>Applications Tracked</p>
                            </div>
                        </div>
                        <div className="stat-card warning">
                            <span className="stat-icon">📩</span>
                            <div>
                                <h3>{stats.pendingMessages}</h3>
                                <p>Pending Support Tickets</p>
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
                                    <input
                                        type="text"
                                        placeholder="Programme Name (e.g. BSc Computer Science)"
                                        value={newProgramme.programmeName}
                                        onChange={(e) => setNewProgramme({ ...newProgramme, programmeName: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Institution Name (e.g. UJ, Wits)"
                                        value={newProgramme.institutionName}
                                        onChange={(e) => setNewProgramme({ ...newProgramme, institutionName: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <input
                                        type="text"
                                        placeholder="Faculty"
                                        value={newProgramme.faculty}
                                        onChange={(e) => setNewProgramme({ ...newProgramme, faculty: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Min. APS Score"
                                        value={newProgramme.minimumAps}
                                        onChange={(e) => setNewProgramme({ ...newProgramme, minimumAps: e.target.value })}
                                    />
                                    <input
                                        type="date"
                                        value={newProgramme.applicationDeadline}
                                        onChange={(e) => setNewProgramme({ ...newProgramme, applicationDeadline: e.target.value })}
                                    />
                                </div>

                                <textarea
                                    placeholder="Programme Description..."
                                    rows="3"
                                    value={newProgramme.description}
                                    onChange={(e) => setNewProgramme({ ...newProgramme, description: e.target.value })}
                                />

                                <button type="submit" className="primary-btn">Save Programme</button>
                            </form>
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
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Sibusiso Mokoena</td>
                                    <td>sibu@gmail.com</td>
                                    <td>Grade 12</td>
                                    <td><span className="badge success">Active</span></td>
                                    <td>
                                        <button className="action-btn danger">Deactivate</button>
                                    </td>
                                </tr>
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
                                    <th>Email</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>2026-07-27</td>
                                    <td>Thabo Molefe</td>
                                    <td>thabo@gmail.com</td>
                                    <td>APS Score Enquiry</td>
                                    <td>How do I calculate technical subject points?</td>
                                    <td>
                                        <button className="action-btn primary">Mark Resolved</button>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}