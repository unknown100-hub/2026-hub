window.studyApi = (function() {
    const resourceMap = {
        'web development': [
            { title: 'MDN Web Docs', link: 'https://developer.mozilla.org/', description: 'Detailed guides for HTML, CSS, and JavaScript.' },
            { title: 'freeCodeCamp', link: 'https://www.freecodecamp.org/', description: 'Hands-on web development projects and exercises.' }
        ],
        'python': [
            { title: 'Python.org Tutorial', link: 'https://docs.python.org/3/tutorial/', description: 'Official Python tutorials and examples.' },
            { title: 'Real Python', link: 'https://realpython.com/', description: 'Guides and practice problems for Python learners.' }
        ],
        'design': [
            { title: 'Coursera Design', link: 'https://www.coursera.org/browse/arts-and-humanities/design', description: 'Design course recommendations and insights.' },
            { title: 'UX Design', link: 'https://www.interaction-design.org/', description: 'Principles of web design and usability.' }
        ],
        'cybersecurity': [
            { title: 'Cybrary', link: 'https://www.cybrary.it/', description: 'Free cybersecurity training and labs.' },
            { title: 'Khan Academy Security', link: 'https://www.khanacademy.org/computing/computer-science', description: 'Security and computer science fundamentals.' }
        ]
    };

    function getStudyAdvice(course) {
        const score = course.mark;
        const passMark = course.passMark || 70;
        const gap = passMark - score;

        if (gap <= 0) {
            return {
                summary: 'You are currently passing this course. Keep reviewing key topics and practicing sample questions.',
                resources: getResources(course.topic)
            };
        }

        if (gap <= 10) {
            return {
                summary: 'You are close to passing. Focus on the weakest topics, take at least one practice quiz, and review your notes daily.',
                resources: getResources(course.topic)
            };
        }

        return {
            summary: 'You need to strengthen your foundation before the next exam. Study with guided lessons, summarise each topic, and complete review worksheets.',
            resources: getResources(course.topic)
        };
    }

    function getResources(topic) {
        return resourceMap[topic] || [
            { title: 'Study Guides', link: 'https://www.khanacademy.org/', description: 'General study guides and practice exercises.' }
        ];
    }

    return {
        getStudyAdvice,
        getResources
    };
})();
