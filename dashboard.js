const defaultCourses = [
    {
        id: 'web-dev',
        title: 'Web Development Fundamentals',
        mark: 75,
        passMark: 70,
        topic: 'web development',
        description: 'Build responsive pages and master the basics of HTML, CSS, and JavaScript.'
    },
    {
        id: 'python',
        title: 'Python Basics',
        mark: 88,
        passMark: 70,
        topic: 'python',
        description: 'Learn Python syntax, data types, and essential programming logic.'
    },
    {
        id: 'web-design',
        title: 'Web Design Principles',
        mark: 42,
        passMark: 70,
        topic: 'design',
        description: 'Understand visual layout, color theory, and usability for better design.'
    },
    {
        id: 'cybersecurity',
        title: 'Cybersecurity Basics',
        mark: 58,
        passMark: 70,
        topic: 'cybersecurity',
        description: 'Study how to protect systems, passwords, and online data.'
    }
];

const resources = [
    {
        topic: 'web development',
        title: 'Mozilla Developer Network',
        description: 'A comprehensive reference for HTML, CSS, and JavaScript.',
        link: 'https://developer.mozilla.org/'
    },
    {
        topic: 'python',
        title: 'Python.org Tutorials',
        description: 'Official Python tutorials for beginner and intermediate learners.',
        link: 'https://docs.python.org/3/tutorial/'
    },
    {
        topic: 'design',
        title: 'Coursera Design Courses',
        description: 'Get guided lessons on web design and user experience best practices.',
        link: 'https://www.coursera.org/browse/arts-and-humanities/design'
    },
    {
        topic: 'cybersecurity',
        title: 'Cybrary',
        description: 'Free cybersecurity training and practice labs.',
        link: 'https://www.cybrary.it/'
    }
];

const trackerGrid = document.getElementById('tracker-grid');
const advisorSummary = document.getElementById('advisor-summary');
const advisorCards = document.getElementById('advisor-cards');
const resourceList = document.getElementById('resource-list');

function getSavedCourses() {
    const saved = localStorage.getItem('eduTrackerCourses');
    return saved ? JSON.parse(saved) : defaultCourses;
}

function saveCourses(courses) {
    localStorage.setItem('eduTrackerCourses', JSON.stringify(courses));
}

function getStudyAdvice(course) {
    const score = course.mark;
    const needed = course.passMark - score;
    const resourcesForTopic = studyApi.getResources(course.topic);

    if (score >= course.passMark) {
        return {
            status: 'On track',
            advice: 'You are passing this course. Keep practicing with review sessions and mock quizzes to stay confident.',
            resources: resourcesForTopic
        };
    }

    if (needed <= 10) {
        return {
            status: 'Almost there',
            advice: 'You only need a small improvement. Focus on the topics you find hardest and complete one practice quiz each day.',
            resources: resourcesForTopic
        };
    }

    return {
        status: 'Needs focus',
        advice: 'Spend extra time on fundamentals, follow a study schedule, and use the resources below to review core ideas before the next exam.',
        resources: resourcesForTopic
    };
}

function renderTracker(courses) {
    trackerGrid.innerHTML = '';

    courses.forEach(course => {
        const advice = getStudyAdvice(course);
        const card = document.createElement('div');
        card.className = 'tracker-card';
        card.innerHTML = `
            <div class="tracker-card-header">
                <div>
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                </div>
                <span class="status-pill ${advice.status.replace(/\s+/g, '-').toLowerCase()}">${advice.status}</span>
            </div>
            <div class="tracker-card-body">
                <div class="mark-info">
                    <p>Current mark</p>
                    <strong>${course.mark}%</strong>
                </div>
                <div class="mark-input-wrapper">
                    <label for="mark-${course.id}">Update mark</label>
                    <input type="number" id="mark-${course.id}" data-course-id="${course.id}" min="0" max="100" value="${course.mark}" class="mark-input">
                </div>
            </div>
            <p class="tracker-note">${advice.advice}</p>
        `;
        trackerGrid.appendChild(card);
    });

    document.querySelectorAll('.mark-input').forEach(input => {
        input.addEventListener('change', function () {
            const courseId = this.dataset.courseId;
            const value = parseInt(this.value, 10);
            updateCourseMark(courseId, value);
        });
    });
}

function renderAdvisor(courses) {
    const lowest = courses.reduce((prev, current) => (prev.mark < current.mark ? prev : current));
    const average = Math.round(courses.reduce((sum, course) => sum + course.mark, 0) / courses.length);

    advisorSummary.textContent = `Your average mark is ${average}%. The course that needs the most attention is ${lowest.title}.`;
    advisorCards.innerHTML = '';

    courses.forEach(course => {
        const advice = getStudyAdvice(course);
        const card = document.createElement('div');
        card.className = 'advisor-card';
        card.innerHTML = `
            <h3>${course.title}</h3>
            <p>${advice.advice}</p>
            <p class="advisor-small">Suggested resources: ${advice.resources.map(item => item.title).join(', ')}</p>
        `;
        advisorCards.appendChild(card);
    });
}

function renderResources() {
    resourceList.innerHTML = '';
    resources.forEach(resource => {
        const item = document.createElement('div');
        item.className = 'resource-item';
        item.innerHTML = `
            <h3>${resource.title}</h3>
            <p>${resource.description}</p>
            <a href="${resource.link}" target="_blank" rel="noopener noreferrer">Open resource</a>
        `;
        resourceList.appendChild(item);
    });
}

function updateCourseMark(courseId, newMark) {
    if (Number.isNaN(newMark) || newMark < 0 || newMark > 100) {
        alert('Please enter a mark between 0 and 100.');
        render();
        return;
    }

    const courses = getSavedCourses().map(course => {
        if (course.id === courseId) {
            return { ...course, mark: newMark };
        }
        return course;
    });

    saveCourses(courses);
    render();
}

function render() {
    const courses = getSavedCourses();
    renderTracker(courses);
    renderAdvisor(courses);
    renderResources();
}

window.addEventListener('load', function() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        window.location.href = 'index.html';
        return;
    }

    document.getElementById('username-display').textContent = loggedInUser;
    render();
});

const logoutLink = document.getElementById('logout-link');
if (logoutLink) {
    logoutLink.addEventListener('click', function(e) {
        e.preventDefault();
        sessionStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    });
}
