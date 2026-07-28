import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { saveRecommendedCourses } from "../services/recommendationsStore";
import { analyseMarks } from "../services/analysisService";
import './MarksAnalysis.css';

const subjectOptions = [
  'Mathematics',
  'Mathematical Literacy',
  'English Home Language',
  'English First Additional Language',
  'Afrikaans',
  'Physical Sciences',
  'Life Sciences',
  'Geography',
  'History',
  'Accounting',
  'Business Studies',
  'Economics',
  'Computer Applications Technology',
  'Information Technology',
  'Life Orientation',
  'Technical Mathematics',
  'Technical Sciences',
  'Engineering Graphics & Design',
  'Tourism',
  'Consumer Studies',
  'Dramatic Arts',
];

const gradeOptions = ['Grade 11', 'Grade 12 (Trial)',];

let nextRowId = 5;

function MarksAnalysis() {
  const navigate = useNavigate();
  const [grade, setGrade] = useState('Grade 12 (Trial)');
  const [rows, setRows] = useState([
    { id: 1, subject: '', mark: '' },
    { id: 2, subject: '', mark: '' },
    { id: 3, subject: '', mark: '' },
    { id: 4, subject: '', mark: '' },
  ]);
  const [error, setError] = useState('');

  function handleGradeChange(e) {
    setGrade(e.target.value);
  }

  function updateRowSubject(rowId, subject) {
    const updated = rows.map(function (row) {
      if (row.id === rowId) {
        const updatedRow = Object.assign({}, row);
        updatedRow.subject = subject;
        return updatedRow;
      }
      return row;
    });
    setRows(updated);
  }

  function updateRowMark(rowId, mark) {
    const updated = rows.map(function (row) {
      if (row.id === rowId) {
        const updatedRow = Object.assign({}, row);
        updatedRow.mark = mark;
        return updatedRow;
      }
      return row;
    });
    setRows(updated);
  }

  function decrementMark(rowId) {
    const updated = rows.map(function (row) {
      if (row.id === rowId) {
        const currentValue = Number(row.mark);
        let newValue = 0;
        if (!Number.isNaN(currentValue) && currentValue > 0) {
          newValue = currentValue - 1;
        }
        const updatedRow = Object.assign({}, row);
        updatedRow.mark = String(newValue);
        return updatedRow;
      }
      return row;
    });
    setRows(updated);
  }

  function removeRow(rowId) {
    const updated = rows.filter(function (row) {
      return row.id !== rowId;
    });
    setRows(updated);
  }

  function addRow() {
    const newRow = { id: nextRowId, subject: '', mark: '' };
    nextRowId = nextRowId + 1;
    setRows(rows.concat([newRow]));
  }

  function renderSubjectOption(subject) {
    return (
      <option key={subject} value={subject}>{subject}</option>
    );
  }

  function renderRow(row) {
    function handleSubjectChange(e) {
      updateRowSubject(row.id, e.target.value);
    }

    function handleMarkChange(e) {
      updateRowMark(row.id, e.target.value);
    }

    function handleDecrementClick() {
      decrementMark(row.id);
    }

    function handleRemoveClick() {
      removeRow(row.id);
    }

    return (
      <div key={row.id} className="subject-row">
        <select value={row.subject} onChange={handleSubjectChange} className="subject-select">
          <option value="" disabled>Select subject...</option>
          {subjectOptions.map(renderSubjectOption)}
        </select>

        <input
          type="number"
          min="0"
          max="100"
          placeholder="Mark %"
          value={row.mark}
          onChange={handleMarkChange}
          className="mark-input"
        />

        <button type="button" className="decrement-btn" onClick={handleDecrementClick} aria-label="Decrease mark">
          −
        </button>

        <button type="button" className="delete-row-btn" onClick={handleRemoveClick} aria-label="Remove subject">
          <img
            src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/trash3.svg"
            alt=""
            className="delete-row-icon"
          />
        </button>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    const subjectMarks = [];
    for (let i = 0; i < rows.length; i = i + 1) {
      const row = rows[i];
      if (row.mark !== '' && row.subject !== '') {
        const numericValue = Number(row.mark);

        //Match the back-end fields
        if (!Number.isNaN(numericValue)) {
          subjectMarks.push({
            subjectName: row.subject,
            percentage: numericValue
          });
        }
      }
    }

    if (subjectMarks.length === 0) {
      setError('Select a subject and enter a mark for at least one row.');
      return;
    }

    try {
      const response = await analyseMarks(subjectMarks);

      console.log("Backend response:", response);


      saveRecommendedCourses(response.data);

      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("Failed to analyse your marks. Please try again.");
    }


  }

  return (
    <div className="career-screen">
      <nav className="career-nav">
        <div className="nav-logo-row">
          <div className="nav-logo-icon-wrap">
            <img
              src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/mortarboard-fill.svg"
              alt=""
              className="nav-logo-icon"
            />
          </div>
          <div>
            <span className="nav-logo-text">PathFinder</span>
            <span className="nav-logo-subtext">CAREER GUIDANCE</span>
          </div>
        </div>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/career-guidance" className="nav-link nav-link-active">Career Guidance</Link>
          <Link to="/about-us" className="nav-link">About Us</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="nav-actions">
          <Link to="/sign-in" className="nav-login-link">
            <img
              src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/box-arrow-in-right.svg"
              alt=""
              className="nav-icon-dark"
            />
            Login
          </Link>
          <Link to="/create-account" className="nav-signup-btn">
            <img
              src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/person-plus-fill.svg"
              alt=""
              className="nav-icon-dark"
            />
            Sign Up
          </Link>
        </div>
      </nav>

      <main className="marks-main">
        <Link to="/career-guidance" className="back-link-thin"> Back</Link>
        <h1>Career Guidance</h1>
        <p className="marks-page-subtitle">Enter your exam marks below to receive personalised university course recommendations</p>

        <div className="marks-card">
          <div className="marks-card-header">
            <div>
              <h2>Your Exam Marks</h2>
              <p className="marks-card-subtitle">Enter marks as percentages (0–100)</p>
            </div>
            <div className="grade-select-wrap">
              <label htmlFor="grade">Grade:</label>
              <select id="grade" value={grade} onChange={handleGradeChange} className="grade-select">
                {gradeOptions.map(function (option) {
                  return <option key={option} value={option}>{option}</option>;
                })}
              </select>
            </div>
          </div>

          <div className="upload-dropzone">
            <img
              src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/upload.svg"
              alt=""
              className="upload-icon"
            />
            <p>
              <span className="upload-highlight">Upload your report card</span> (JPG, PNG, or PDF) or enter marks manually below
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="subject-rows">
              {rows.map(renderRow)}
            </div>

            <button type="button" className="add-subject-btn" onClick={addRow}>
              + Add another subject
            </button>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="analyze-btn">
              Analyse My Marks & Find Courses →
            </button>
          </form>
        </div>
      </main>

      <button type="button" className="help-btn" aria-label="Help">?</button>
    </div>
  );
}

export default MarksAnalysis;