import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getRecommendedCourses } from '../services/recommendationsStore';
import { getProfile, updateProfile } from "../services/learnerService";

import './Profile.css';


function Profile() {

  const gradeOptions = [
    { value: "GRADE_11", label: "Grade 11" },
    { value: "GRADE_12", label: "Grade 12" }
  ];

  //Grade helper method
  function formatGrade(grade) {
    const option = gradeOptions.find((g) => g.value === grade);
    return option ? option.label : grade;
  }


  const analysis = getRecommendedCourses();
  const [courses, setCourses] = useState(
      analysis?.recommendations?.[0]?.programmes || []
  );


  console.log("Courses:", courses);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [savedProfile, setSavedProfile] = useState({
    fullName: "",
    school: "",
    grade: "",
    email: "",
  });
  const [profileForm, setProfileForm] = useState({
    id: "",
    fullName: "",
    school: "",
    grade: "",
    email: "",
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await getProfile();

        const learner = response.data;

        const profile = {
          id: learner.id,
          fullName: `${learner.firstName} ${learner.lastName}`,
          school: learner.schoolName || "",
          grade: learner.grade || "",
          email: learner.email || "",
        };

        setSavedProfile(profile);
        setProfileForm(profile);
      } catch (err) {
        console.error(err);
      }
    }

    loadProfile();
  }, []);



  function toggleSave(courseId) {
    const updated = courses.map(function (course) {
      if (course.id === courseId) {
        const updatedCourse = Object.assign({}, course);
        updatedCourse.saved = !updatedCourse.saved;
        return updatedCourse;
      }
      return course;
    });
    setCourses(updated);
  }

  function getDisplayedCourses() {
    if (showSavedOnly) {
      return courses.filter(function (course) {
        return course.saved;
      });
    }

    return courses;
  }

  function handleToggleSavedOnly() {
    setShowSavedOnly(!showSavedOnly);
  }

  function updateProfileField(field, value) {
    const updated = Object.assign({}, profileForm);
    updated[field] = value;
    setProfileForm(updated);
  }

  function handleFullNameChange(e) {
    updateProfileField('fullName', e.target.value);
  }

  function handleSchoolChange(e) {
    updateProfileField('school', e.target.value);
  }

  function handleGradeChange(e) {
    updateProfileField('grade', e.target.value);
  }

  function handleEmailChange(e) {
    updateProfileField('email', e.target.value);
  }

  async function handleSaveChanges(e) {
    e.preventDefault();

    try {
      const names = profileForm.fullName.trim().split(" ");

      const payload = {
        firstName: names[0] || "",
        lastName: names.slice(1).join(" "),
        email: profileForm.email,
        phoneNumber: profileForm.phoneNumber,
        grade: profileForm.grade,
        province: profileForm.province,
        schoolName: profileForm.school,
        careerGoal: profileForm.careerGoal,
      };

      const response = await updateProfile(
          profileForm.id,
          payload
      );

      const learner = response.data;

      setSavedProfile({
        id: learner.id,
        fullName: `${learner.firstName} ${learner.lastName}`,
        school: learner.schoolName,
        grade: learner.grade,
        email: learner.email,
        phoneNumber: learner.phoneNumber,
        province: learner.province,
        careerGoal: learner.careerGoal,
      });

      setProfileForm({
        id: learner.id,
        fullName: `${learner.firstName} ${learner.lastName}`,
        school: learner.schoolName,
        grade: learner.grade,
        email: learner.email,
        phoneNumber: learner.phoneNumber,
        province: learner.province,
        careerGoal: learner.careerGoal,
      });

      alert("Profile updated successfully!");
    } catch (err) {
      alert(err.message);
    }
  }

  function getInitials(fullName) {
    const parts = fullName.trim().split(' ');
    let initials = '';
    for (let i = 0; i < parts.length; i = i + 1) {
      if (parts[i].length > 0) {
        initials = initials + parts[i][0];
      }
    }
    return initials.toUpperCase();
  }

  function renderCourseCard(course) {
    let bookmarkIcon = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/bookmark.svg';
    if (course.saved) {
      bookmarkIcon = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/bookmark-fill.svg';
    }
/*
    function handleToggleClick() {
      toggleSave(course.id);

    }
  */
    function handleToggleClick(e) {
      e.preventDefault();      // prevents opening the careers page when clicking bookmark
      e.stopPropagation();
      toggleSave(course.id);
    }


    return (
      //<div key={course.id} className="course-card">

        <Link
            key={course.id}
            to="/programme-careers"
            state={{ programme: course }}
            className="course-card"
            style={{ textDecoration: "none", color: "inherit" }}
        >
        <div className="course-icon-wrap">
          <img
            src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/mortarboard-fill.svg"
            alt=""
            className="course-icon"
          />
        </div>

        <div className="course-info">
          <p className="course-name">{course.programmeName}</p>

          <p className="course-university">
            {course.institutionName}
          </p>

          <p className="course-category">
            {course.faculty}
          </p>
        </div>

        <div className="course-match">
          <p className="match-percent">
            APS {course.minimumAps}
          </p>

          <p className="match-label">
            Required
          </p>
        </div>

        <button
          type="button"
          className="save-btn"
          onClick={handleToggleClick}
          aria-label={course.saved ? 'Unsave course' : 'Save course'}
        >
          <img src={bookmarkIcon} alt="" className="save-icon" />
        </button>
      </Link>
    );
  }

  const displayedCourses = getDisplayedCourses();
  const savedCount = courses.filter(function (course) {
    return course.saved;
  }).length;

  return (
    <div className="profile-screen">
      <nav className="profile-nav">
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
          <Link to="/career-guidance" className="nav-link">Career Guidance</Link>
          <Link to="/about-us" className="nav-link">About Us</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>

        <div className="nav-actions">
          <Link to="/profile" className="nav-profile-btn">
            <img
              src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/person-fill.svg"
              alt=""
              className="nav-icon-dark"
            />
            My Profile
          </Link>
        </div>
      </nav>

      <main className="profile-main">
        <div className="profile-header">
          <div className="profile-avatar">{getInitials(savedProfile.fullName)}</div>
          <div className="profile-header-info">
            <h1>{savedProfile.fullName}</h1>
            <p className="profile-subline">{formatGrade(savedProfile.grade)} — {savedProfile.school}</p>
            <p className="profile-email">{savedProfile.email}</p>
          </div>
          <Link to="/career-guidance" className="new-session-btn">
            <img
              src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/journal-bookmark-fill.svg"
              alt=""
              className="nav-icon-dark"
            />
            New Guidance Session
          </Link>
        </div>

        <div className="stats-row">
          <div className="stat-box">
            <div className="stat-box-icon">
              <img
                src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/mortarboard-fill.svg"
                alt=""
                className="stat-box-icon-img"
              />
            </div>
            <div>
              <p className="stat-number">{analysis?.totalMatches ?? 0}</p>
              <p className="stat-label">Recommended Courses</p>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-box-icon">
              <img
                src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/bookmark-fill.svg"
                alt=""
                className="stat-box-icon-img"
              />
            </div>
            <div>
              <p className="stat-number">{savedCount}</p>
              <p className="stat-label">Saved Courses</p>
            </div>
          </div>

          <div className="stat-box">
            <div className="stat-box-icon">
              <img
                src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/file-earmark-text-fill.svg"
                alt=""
                className="stat-box-icon-img"
              />
            </div>
            <div>
              <p className="stat-number">80%</p>
              <p className="stat-label">CV Completion</p>
            </div>
          </div>
        </div>

        <div className="profile-columns">
          <div className="recommendations-column">
            <div className="recommendations-header">
              <h2> {analysis?.recommendations?.[0]?.courseName || "Recommended Courses"}</h2>
              <button
                type="button"
                className={showSavedOnly ? 'saved-filter-btn saved-filter-btn-active' : 'saved-filter-btn'}
                onClick={handleToggleSavedOnly}
              >
                <img
                  src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/icons/bookmark-fill.svg"
                  alt=""
                  className="saved-filter-icon"
                />
                Saved Courses ({savedCount})
              </button>
            </div>
            {displayedCourses.length === 0 && showSavedOnly && (
              <div className="empty-state">
                <p>No saved courses yet.</p>
                <p className="empty-state-sub">
                  Click the bookmark icon on any course below to save it here.
                </p>
              </div>
            )}
            {displayedCourses.length === 0 && !showSavedOnly && (
              <div className="empty-state">
                <p>No recommendations yet.</p>
                <p className="empty-state-sub">
                  Complete a <Link to="/marks-analysis">Career Guidance session</Link> to see your course matches here.
                </p>
              </div>
            )}
            {displayedCourses.length > 0 && (
              <div className="course-list">
                {displayedCourses.map(renderCourseCard)}
              </div>
            )}
          </div>

          <div className="settings-column">
            <h2>Profile Settings</h2>
            <form className="settings-form" onSubmit={handleSaveChanges}>
              <div className="field">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  type="text"
                  value={profileForm.fullName}
                  onChange={handleFullNameChange}
                />
              </div>

              <div className="field">
                <label htmlFor="school">School</label>
                <input
                  id="school"
                  type="text"
                  value={profileForm.school}
                  onChange={handleSchoolChange}
                />
              </div>

              <div className="field">
                <label htmlFor="grade">Grade</label>

                <select
                    id="grade"
                    value={profileForm.grade}
                    onChange={handleGradeChange}
                >
                  {gradeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  value={profileForm.email}
                  onChange={handleEmailChange}
                />
              </div>

              <button type="submit" className="save-changes-btn">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </main>

      <button type="button" className="help-btn" aria-label="Help">?</button>
    </div>
  );
}

export default Profile;