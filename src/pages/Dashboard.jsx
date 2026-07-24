import { useEffect, useState } from "react";
import { getProfile } from "../services/learnerService";
import "./Dashboard.css";

function Dashboard() {
    const [learner, setLearner] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        try {
            const response = await getProfile();
            setLearner(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    if (!learner) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="dashboard">

            {/* Hero Card */}

            <div className="profile-card">

                <div className="profile-left">

                    <div className="avatar">
                        {learner.firstName.charAt(0)}
                        {learner.lastName.charAt(0)}
                    </div>

                    <div>

                        <h1>
                            {learner.firstName} {learner.lastName}
                        </h1>

                        <h3>
                            {learner.grade.replace("_", " ")} • {learner.schoolName}
                        </h3>

                        <p>{learner.email}</p>

                    </div>

                </div>

                <button className="session-btn">
                    New Guidance Session
                </button>

            </div>


            {/* Statistics */}

            <div className="stats">

                <div className="stat-card">
                    <h2>3</h2>
                    <p>Guidance Sessions</p>
                </div>

                <div className="stat-card">
                    <h2>7</h2>
                    <p>Saved Courses</p>
                </div>

                <div className="stat-card">
                    <h2>80%</h2>
                    <p>CV Completion</p>
                </div>

            </div>


            {/* Bottom */}

            <div className="bottom">

                <div className="recommendations">

                    <h2>Saved Course Recommendations</h2>

                    <div className="course-card">
                        <h3>BSc Computer Science</h3>
                        <p>University of Johannesburg</p>
                        <span>88% Match</span>
                    </div>

                    <div className="course-card">
                        <h3>BSc Information Technology</h3>
                        <p>University of Pretoria</p>
                        <span>84% Match</span>
                    </div>

                    <div className="course-card">
                        <h3>BCom Information Systems</h3>
                        <p>University of Cape Town</p>
                        <span>79% Match</span>
                    </div>

                </div>


                <div className="profile-settings">

                    <h2>Profile Settings</h2>

                    <label>Full Name</label>

                    <input
                        value={`${learner.firstName} ${learner.lastName}`}
                        readOnly
                    />

                    <label>School</label>

                    <input
                        value={learner.schoolName}
                        readOnly
                    />

                    <label>Grade</label>

                    <input
                        value={learner.grade.replace("_"," ")}
                        readOnly
                    />

                    <label>Email</label>

                    <input
                        value={learner.email}
                        readOnly
                    />

                    <button>Save Changes</button>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;