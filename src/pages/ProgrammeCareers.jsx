

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProgrammeCareers } from "../services/programmeService";
import "./ProgrammeCareers.css";

function ProgrammeCareers() {



    const { state } = useLocation();
    const programme = state?.programme;
    const [careers, setCareers] = useState([]);

    useEffect(() => {

        async function loadCareers() {

            if (!programme) return;

            try {
                const data = await getProgrammeCareers(programme.id);
                setCareers(data);
            } catch (err) {
                console.error(err);
            }
        }

        loadCareers();

    }, [programme]);

    if (!programme) {
        return <h2>No programme selected.</h2>;
    }



    return (
        <div className="programme-page">
            <div className="programme-container">

            <div className="programme-card">
                <h1>{programme.programmeName}</h1>

                <p className="university">
                    {programme.institutionName}
                </p>

                <p className="faculty">
                    {programme.faculty}
                </p>

                <div className="aps">
                    APS Required: <strong>{programme.minimumAps}</strong>
                </div>

                <p className="description">
                    {programme.description}
                </p>
            </div>

            <h2 className="career-title">
                Careers this programme can lead to
            </h2>

            <div className="career-list">



                    {careers.length === 0 ? (
                        <p>No careers have been linked to this programme yet.</p>
                    ) : (
                        careers.map((career) => (
                            <div key={career.id} className="career-card">

                                <h3>✓ {career.careerName}</h3>

                                <p>
                                    <strong>Description:</strong><br />
                                    {career.description}
                                </p>

                                <p>
                                    <strong>Responsibilities:</strong><br />
                                    {career.responsibilities}
                                </p>

                                <p>
                                    <strong>Required Skills:</strong><br />
                                    {career.requiredSkills}
                                </p>

                                <p>
                                    <strong>Industry:</strong><br />
                                    {career.industries}
                                </p>

                                <p>
                                    <strong>Average Salary:</strong><br />
                                    {career.averageSalary}
                                </p>

                                <p>
                                    <strong>Study Path:</strong><br />
                                    {career.studyPath}
                                </p>

                            </div>
                        ))
                    )}


            </div>

        </div>
        </div>

    );
}

export default ProgrammeCareers;