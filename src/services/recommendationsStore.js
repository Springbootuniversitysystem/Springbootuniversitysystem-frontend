const HAS_ANALYZED_KEY = 'pathfinder_has_analyzed_marks';
const COURSES_KEY = 'pathfinder_recommended_courses';

const courseCatalog = [
  { id: 1, name: 'BSc Electrical Engineering', university: 'University of Pretoria', category: 'Engineering & Technology', subjectMatch: 'Mathematics', baseMatch: 55 },
  { id: 2, name: 'BSc Computer Science', university: 'Wits University', category: 'Sciences', subjectMatch: 'Mathematics', baseMatch: 50 },
  { id: 3, name: 'BCom Finance', university: 'UCT', category: 'Commerce & Finance', subjectMatch: 'Accounting', baseMatch: 45 },
  { id: 4, name: 'BSc Physics', university: 'Stellenbosch University', category: 'Sciences', subjectMatch: 'Physical Sciences', baseMatch: 50 },
  { id: 5, name: 'LLB Law', university: 'Rhodes University', category: 'Law', subjectMatch: 'English Home Language', baseMatch: 45 },
];

function getHasAnalyzedMarks() {
  const stored = localStorage.getItem(HAS_ANALYZED_KEY);
  return stored === 'true';
}

function getRecommendedCourses() {
  const stored = localStorage.getItem(COURSES_KEY);
  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored);
  } catch (err) {
    return [];
  }
}

function saveRecommendedCourses(courses) {
  localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
  localStorage.setItem(HAS_ANALYZED_KEY, 'true');
}

function generateRecommendations(subjectMarks) {
  const results = [];

  for (let i = 0; i < courseCatalog.length; i = i + 1) {
    const course = courseCatalog[i];
    let matchScore = course.baseMatch;

    for (let j = 0; j < subjectMarks.length; j = j + 1) {
      const entry = subjectMarks[j];
      if (entry.subject === course.subjectMatch) {
        matchScore = matchScore + Math.round(entry.mark * 0.5);
      }
    }

    if (matchScore > 99) {
      matchScore = 99;
    }

    const recommendation = Object.assign({}, course);
    recommendation.match = matchScore;
    recommendation.saved = false;
    results.push(recommendation);
  }

  results.sort(function (a, b) {
    return b.match - a.match;
  });

  return results;
}

export { getHasAnalyzedMarks, getRecommendedCourses, saveRecommendedCourses, generateRecommendations };