const ANALYSIS_KEY = "careerAnalysis";

function getHasAnalyzedMarks() {
  return localStorage.getItem(ANALYSIS_KEY) !== null;
}

function saveRecommendedCourses(analysis) {
  localStorage.setItem(ANALYSIS_KEY, JSON.stringify(analysis));
}

function getRecommendedCourses() {
  const stored = localStorage.getItem(ANALYSIS_KEY);

  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored);
  } catch (err) {
    return null;
  }
}

function clearRecommendedCourses() {
  localStorage.removeItem(ANALYSIS_KEY);
}

export {
  getHasAnalyzedMarks,
  getRecommendedCourses,
  saveRecommendedCourses,
  clearRecommendedCourses,
};