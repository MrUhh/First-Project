/* ==========================================================================
   LockdIn Tutoring - Core Application Logic
   Dynamic rendering, filter engine, cost calculator, and LocalStorage management
   ========================================================================== */

// --- Initial Subject Database ---
const SUBJECTS_DATA = [
    {
        id: 'math-calc',
        category: 'math',
        title: 'AP Calculus AB / BC',
        icon: '📐',
        desc: 'Master limits, derivatives, integrals, series, and analytical problem-solving with AP-certified mentors.',
        topics: ['Derivatives', 'Integration Techniques', 'Taylor Series', 'FRQ Prep'],
        rate: '$50/hr'
    },
    {
        id: 'math-alg',
        category: 'math',
        title: 'Algebra I & II / Geometry',
        icon: '📊',
        desc: 'Build rock-solid mathematical foundations, conquer quadratic equations, functions, and geometric proofs.',
        topics: ['Linear Equations', 'Polynomials', 'Trigonometry', 'Proofs'],
        rate: '$44/hr'
    },
    {
        id: 'sci-chem',
        category: 'science',
        title: 'AP Chemistry & Honors Chem',
        icon: '⚗️',
        desc: 'Demystify stoichiometry, thermodynamics, kinetics, and equilibrium with intuitive real-world visual models.',
        topics: ['Thermodynamics', 'Equilibrium', 'Kinetics', 'Lab Reports'],
        rate: '$54/hr'
    },
    {
        id: 'sci-phys',
        category: 'science',
        title: 'AP Physics (1, 2 & C)',
        icon: '⚡',
        desc: 'Develop deep conceptual intuition in classical mechanics, electromagnetism, fluids, and rotational dynamics.',
        topics: ['Newtonian Mechanics', 'Circuits & Magnetism', 'Waves', 'Calculus-Based Physics'],
        rate: '$56/hr'
    },
    {
        id: 'code-py',
        category: 'coding',
        title: 'Python & Data Structures',
        icon: '🐍',
        desc: 'From first lines of code to algorithms, OOP, debugging, and building real portfolio projects and scripts.',
        topics: ['Syntax & Logic', 'OOP', 'Data Structures', 'Mini-Projects'],
        rate: '$55/hr'
    },
    {
        id: 'code-java',
        category: 'coding',
        title: 'AP Computer Science A (Java)',
        icon: '💻',
        desc: 'Crush the AP CSA exam with targeted instruction on 2D arrays, recursion, inheritance, and past free-response questions.',
        topics: ['Java Fundamentals', 'Inheritance', 'Algorithms', 'AP Exam Prep'],
        rate: '$55/hr'
    },
    {
        id: 'test-sat',
        category: 'test-prep',
        title: 'SAT & ACT Comprehensive Prep',
        icon: '🎯',
        desc: 'High-yield test-taking strategies, pacing drills, digital SAT platform mastery, and personalized diagnostic score reviews.',
        topics: ['Digital SAT Math', 'Reading Comprehension', 'Grammar Rules', 'Pacing Mastery'],
        rate: '$62/hr'
    },
    {
        id: 'eng-write',
        category: 'english',
        title: 'Essay Writing & AP Lit',
        icon: '✍️',
        desc: 'Refine thesis statements, rhetorical analysis, persuasive argumentation, and polished college admissions essays.',
        topics: ['Rhetorical Analysis', 'Thesis Construction', 'College Essays', 'Research Papers'],
        rate: '$48/hr'
    }
];

// --- Vetted Tutors Database ---
const TUTORS_DATA = [
    {
        name: 'David Kim',
        avatarClass: 'avatar-1',
        initials: 'DK',
        school: 'MIT — B.S. Mathematics',
        subjects: 'AP Calculus BC, Linear Algebra, SAT Math',
        bio: 'Over 600 hours of 1-on-1 coaching. Passionate about turning abstract math concepts into easy-to-digest steps.',
        rating: '5.0',
        reviewsCount: 142,
        experience: '4+ Years'
    },
    {
        name: 'Elena Rostova',
        avatarClass: 'avatar-2',
        initials: 'ER',
        school: 'Stanford — B.S. Chemistry & Bio',
        subjects: 'AP Chemistry, AP Biology, Organic Chem',
        bio: 'Published biochemistry researcher with a talent for helping visual learners ace difficult science exams.',
        rating: '4.9',
        reviewsCount: 98,
        experience: '3+ Years'
    },
    {
        name: 'Marcus Vance',
        avatarClass: 'avatar-3',
        initials: 'MV',
        school: 'Caltech — B.S. Computer Science',
        subjects: 'Python, AP Computer Science A, Algorithms',
        bio: 'Software engineer & competitive programmer who makes coding playful, engaging, and practically applicable.',
        rating: '5.0',
        reviewsCount: 116,
        experience: '5+ Years'
    },
    {
        name: 'Sarah Jenkins',
        avatarClass: 'avatar-4',
        initials: 'SJ',
        school: 'Harvard — B.A. English Literature',
        subjects: 'SAT Reading/Writing, AP Lit, College Essays',
        bio: 'Helped 80+ students score in the 99th percentile on the SAT verbal section and gain admission into top universities.',
        rating: '4.9',
        reviewsCount: 165,
        experience: '6+ Years'
    }
];

// --- Initial Demo Bookings Seed ---
const DEFAULT_BOOKINGS = [
    {
        id: 'lockdin-' + Date.now(),
        studentName: 'Alex Rivera',
        parentEmail: 'm.rivera@example.com',
        phoneNum: '(555) 234-5678',
        subject: 'AP Calculus & Advanced Math',
        tutor: 'David Kim (MIT - Math)',
        format: 'Online 1-on-1 (Interactive Whiteboard)',
        date: getNextDate(2),
        time: 'Evening (4:00 PM - 7:00 PM)',
        goals: 'Needs help with derivative optimization problems before the midterm next Thursday.',
        createdAt: new Date().toLocaleDateString()
    }
];

// Helper to get formatted relative date (YYYY-MM-DD)
function getNextDate(daysAhead = 1) {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
}

// --- DOM Elements ---
const subjectsContainer = document.getElementById('subjectsContainer');
const tutorsContainer = document.getElementById('tutorsContainer');
const subjectFilters = document.getElementById('subjectFilters');

const bookingModal = document.getElementById('bookingModal');
const bookingsDrawer = document.getElementById('bookingsDrawer');
const tutorApplyModal = document.getElementById('tutorApplyModal');

const bookingForm = document.getElementById('bookingForm');
const tutorApplyForm = document.getElementById('tutorApplyForm');

const bookingsCountBadge = document.getElementById('bookingsCount');
const bookingsListContainer = document.getElementById('bookingsList');

const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Calculator Elements
const gradeLevelSelect = document.getElementById('gradeLevel');
const hoursSlider = document.getElementById('hoursSlider');
const hoursDisplay = document.getElementById('hoursDisplay');
const packageToggle = document.getElementById('packageToggle');
const hourlyRateDisplay = document.getElementById('hourlyRateDisplay');
const savingsDisplay = document.getElementById('savingsDisplay');
const monthlyTotalDisplay = document.getElementById('monthlyTotalDisplay');

// Mobile Nav
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    initLocalStorage();
    renderSubjects('all');
    renderTutors();
    setupFilters();
    setupCalculator();
    setupModalListeners();
    updateBookingsBadge();
    
    // Set min date for booking to today
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        dateInput.min = new Date().toISOString().split('T')[0];
        dateInput.value = getNextDate(1);
    }
});

// --- LocalStorage Management ---
function initLocalStorage() {
    // Migrate legacy key if present
    if (localStorage.getItem('brightpath_bookings') && !localStorage.getItem('lockdin_bookings')) {
        localStorage.setItem('lockdin_bookings', localStorage.getItem('brightpath_bookings'));
    }
    if (!localStorage.getItem('lockdin_bookings')) {
        localStorage.setItem('lockdin_bookings', JSON.stringify(DEFAULT_BOOKINGS));
    }
}

function getStoredBookings() {
    try {
        return JSON.parse(localStorage.getItem('lockdin_bookings')) || [];
    } catch (e) {
        return [];
    }
}

function saveBookings(bookings) {
    localStorage.setItem('lockdin_bookings', JSON.stringify(bookings));
    updateBookingsBadge();
}

function updateBookingsBadge() {
    const bookings = getStoredBookings();
    if (bookingsCountBadge) {
        bookingsCountBadge.textContent = bookings.length;
    }
}

// --- Render Subjects ---
function renderSubjects(filter = 'all') {
    if (!subjectsContainer) return;

    const filtered = filter === 'all' 
        ? SUBJECTS_DATA 
        : SUBJECTS_DATA.filter(item => item.category === filter);

    subjectsContainer.innerHTML = filtered.map(item => `
        <div class="subject-card">
            <div>
                <div class="subject-header">
                    <div class="subject-icon-box">${item.icon}</div>
                    <span class="subject-tag">${item.category.toUpperCase()}</span>
                </div>
                <h3 class="subject-title">${item.title}</h3>
                <p class="subject-desc">${item.desc}</p>
                <div class="subject-topics">
                    ${item.topics.map(topic => `<span class="topic-badge">${topic}</span>`).join('')}
                </div>
            </div>
            <div class="subject-footer">
                <div class="subject-rate">From <strong>${item.rate}</strong></div>
                <button class="btn btn-outline btn-sm" onclick="openBookingForSubject('${item.title}')">
                    Book Trial
                </button>
            </div>
        </div>
    `).join('');
}

// --- Render Tutors ---
function renderTutors() {
    if (!tutorsContainer) return;

    tutorsContainer.innerHTML = TUTORS_DATA.map(tutor => `
        <div class="tutor-card">
            <div class="avatar ${tutor.avatarClass}">${tutor.initials}</div>
            <h3>${tutor.name}</h3>
            <div class="tutor-school">${tutor.school}</div>
            <p class="tutor-bio">${tutor.bio}</p>
            <div class="tutor-meta">
                <div>
                    <strong>★ ${tutor.rating}</strong>
                    <small>(${tutor.reviewsCount} reviews)</small>
                </div>
                <div>
                    <strong>${tutor.experience}</strong>
                    <small>Experience</small>
                </div>
            </div>
            <button class="btn btn-primary btn-block btn-sm" onclick="openBookingForTutor('${tutor.name}')">
                Match with ${tutor.name.split(' ')[0]}
            </button>
        </div>
    `).join('');
}

// --- Setup Subject Filters ---
function setupFilters() {
    if (!subjectFilters) return;

    const buttons = subjectFilters.querySelectorAll('.filter-pill');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSubjects(btn.dataset.category);
        });
    });
}

// --- Interactive Calculator ---
const RATE_MAP = {
    elementary: 40,
    highschool: 48,
    ap: 58,
    testprep: 68
};

function setupCalculator() {
    if (!hoursSlider || !gradeLevelSelect || !packageToggle) return;

    function recalculate() {
        const hours = parseInt(hoursSlider.value, 10);
        const level = gradeLevelSelect.value;
        const baseRate = RATE_MAP[level] || 48;
        const isPackage = packageToggle.checked;
        const discountRate = isPackage ? 0.15 : 0.0;

        hoursDisplay.textContent = `${hours} Hour${hours > 1 ? 's' : ''} / wk`;
        hourlyRateDisplay.textContent = `$${baseRate} / hr`;

        const weeklyBase = hours * baseRate;
        const weeklySavings = weeklyBase * discountRate;
        const weeklyNet = weeklyBase - weeklySavings;
        const monthlyTotal = weeklyNet * 4;

        savingsDisplay.textContent = isPackage ? `-$${weeklySavings.toFixed(2)} / wk` : '$0.00 (None)';
        savingsDisplay.style.color = isPackage ? 'var(--accent)' : 'var(--text-muted)';
        monthlyTotalDisplay.textContent = `$${monthlyTotal.toFixed(2)}`;
    }

    hoursSlider.addEventListener('input', recalculate);
    gradeLevelSelect.addEventListener('change', recalculate);
    packageToggle.addEventListener('change', recalculate);

    recalculate();
}

// --- Modal & Drawer Handling ---
function setupModalListeners() {
    // Open Booking modal buttons
    const openBtn = document.getElementById('openBookingModalBtn');
    if (openBtn) {
        openBtn.addEventListener('click', () => openBooking('General Free Trial'));
    }

    // Close Booking modal
    const closeBookingBtn = document.getElementById('closeBookingModalBtn');
    const cancelBookingBtn = document.getElementById('cancelBookingBtn');
    if (closeBookingBtn) closeBookingBtn.addEventListener('click', closeAllModals);
    if (cancelBookingBtn) cancelBookingBtn.addEventListener('click', closeAllModals);

    // Bookings Drawer
    const viewBookingsBtn = document.getElementById('viewBookingsBtn');
    const closeBookingsDrawerBtn = document.getElementById('closeBookingsDrawerBtn');
    const clearAllBookingsBtn = document.getElementById('clearAllBookingsBtn');

    if (viewBookingsBtn) {
        viewBookingsBtn.addEventListener('click', openBookingsDrawer);
    }
    if (closeBookingsDrawerBtn) {
        closeBookingsDrawerBtn.addEventListener('click', closeAllModals);
    }
    if (clearAllBookingsBtn) {
        clearAllBookingsBtn.addEventListener('click', clearAllBookings);
    }

    // Tutor Application Modal
    const openTutorApplyModalBtn = document.getElementById('openTutorApplyModal');
    const closeTutorApplyModalBtn = document.getElementById('closeTutorApplyModalBtn');
    if (openTutorApplyModalBtn) {
        openTutorApplyModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            tutorApplyModal.classList.add('open');
        });
    }
    if (closeTutorApplyModalBtn) {
        closeTutorApplyModalBtn.addEventListener('click', closeAllModals);
    }

    // Close on backdrop click
    [bookingModal, bookingsDrawer, tutorApplyModal].forEach(modal => {
        if (!modal) return;
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Booking form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }

    // Tutor application form submission
    if (tutorApplyForm) {
        tutorApplyForm.addEventListener('submit', handleTutorApplySubmit);
    }

    // Mobile nav toggle
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
        
        // Close mobile nav on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
            });
        });
    }
}

function closeAllModals() {
    [bookingModal, bookingsDrawer, tutorApplyModal].forEach(modal => {
        if (modal) modal.classList.remove('open');
    });
}

function openBooking(context = 'General Consultation') {
    closeAllModals();
    const title = document.getElementById('modalTitle');
    if (title) {
        title.textContent = `Schedule Your Free Session (${context})`;
    }
    bookingModal.classList.add('open');
}

function openBookingForSubject(subjectName) {
    openBooking(subjectName);
    const select = document.getElementById('bookingSubject');
    if (select) {
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].text.includes(subjectName.split(' ')[0])) {
                select.selectedIndex = i;
                break;
            }
        }
    }
}

function openBookingForTutor(tutorName) {
    openBooking(`with ${tutorName}`);
    const tutorSelect = document.getElementById('bookingTutor');
    if (tutorSelect) {
        for (let i = 0; i < tutorSelect.options.length; i++) {
            if (tutorSelect.options[i].text.includes(tutorName)) {
                tutorSelect.selectedIndex = i;
                break;
            }
        }
    }
}

function openBookingWithPreset() {
    const hours = hoursSlider.value;
    const levelText = gradeLevelSelect.options[gradeLevelSelect.selectedIndex].text.split('(')[0].trim();
    openBooking(`${hours} hrs/wk - ${levelText}`);
}

// --- Submit Booking Form ---
function handleBookingSubmit(e) {
    e.preventDefault();

    const studentName = document.getElementById('studentName').value.trim();
    const parentEmail = document.getElementById('parentEmail').value.trim();
    const phoneNum = document.getElementById('phoneNum').value.trim();
    const subject = document.getElementById('bookingSubject').value;
    const tutor = document.getElementById('bookingTutor').value;
    const format = document.getElementById('bookingSessionType').value;
    const date = document.getElementById('preferredDate').value;
    const time = document.getElementById('preferredTime').value;
    const goals = document.getElementById('learningGoals').value.trim();

    if (!studentName || !parentEmail || !phoneNum || !subject || !date) {
        showToast('Please fill in all required fields.', false);
        return;
    }

    const newBooking = {
        id: 'lockdin-' + Date.now(),
        studentName,
        parentEmail,
        phoneNum,
        subject,
        tutor,
        format,
        date,
        time,
        goals: goals || 'General academic improvement',
        createdAt: new Date().toLocaleDateString()
    };

    const currentBookings = getStoredBookings();
    currentBookings.unshift(newBooking);
    saveBookings(currentBookings);

    bookingForm.reset();
    closeAllModals();

    showToast(`🎉 Free trial booked for ${studentName}! You're LockdIn.`, true);
}

// --- Bookings Drawer List Rendering ---
function openBookingsDrawer() {
    closeAllModals();
    renderBookingsList();
    bookingsDrawer.classList.add('open');
}

function renderBookingsList() {
    if (!bookingsListContainer) return;
    const bookings = getStoredBookings();

    if (bookings.length === 0) {
        bookingsListContainer.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <h4>No sessions booked yet</h4>
                <p>Use the "Book Free Trial" button to schedule your first 1-on-1 tutoring consultation.</p>
            </div>
        `;
        return;
    }

    bookingsListContainer.innerHTML = bookings.map(item => `
        <div class="booking-item-card" id="booking-${item.id}">
            <div class="booking-info">
                <h4>${item.subject}</h4>
                <p><strong>Student:</strong> ${item.studentName} &bull; <strong>Tutor:</strong> ${item.tutor}</p>
                <p><strong>Time:</strong> ${item.date} (${item.time}) &bull; ${item.format}</p>
                ${item.goals ? `<p style="font-style: italic; color: var(--text-muted);">"${item.goals}"</p>` : ''}
                <span class="booking-badge">Confirmed Booking</span>
            </div>
            <div>
                <button class="btn btn-outline btn-sm text-danger" onclick="deleteBooking('${item.id}')" title="Cancel this session">
                    Cancel
                </button>
            </div>
        </div>
    `).join('');
}

function deleteBooking(id) {
    let bookings = getStoredBookings();
    bookings = bookings.filter(b => b.id !== id);
    saveBookings(bookings);
    renderBookingsList();
    showToast('Session cancelled and removed.', true);
}

function clearAllBookings() {
    if (confirm('Are you sure you want to clear all booked sessions?')) {
        saveBookings([]);
        renderBookingsList();
        showToast('All bookings have been cleared.', true);
    }
}

// --- Submit Tutor Application ---
function handleTutorApplySubmit(e) {
    e.preventDefault();
    const applicantName = document.getElementById('applicantName').value.trim();
    tutorApplyForm.reset();
    closeAllModals();
    showToast(`Thank you, ${applicantName}! Your tutoring application was received.`, true);
}

// --- Toast Notification Helper ---
let toastTimeout;
function showToast(message, isSuccess = true) {
    if (!toast) return;

    const icon = document.getElementById('toastIcon');
    if (icon) {
        icon.textContent = isSuccess ? '✓' : '!';
        icon.style.background = isSuccess ? 'var(--accent)' : 'var(--danger)';
    }

    toastMessage.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Global functions exposed for inline HTML onclick handlers
window.openBooking = openBooking;
window.openBookingForSubject = openBookingForSubject;
window.openBookingForTutor = openBookingForTutor;
window.openBookingWithPreset = openBookingWithPreset;
window.deleteBooking = deleteBooking;
