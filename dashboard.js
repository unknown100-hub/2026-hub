// Check if user is logged in
window.addEventListener('load', function() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    
    if (!loggedInUser) {
        // Redirect to login if not logged in
        window.location.href = 'index.html';
    } else {
        // Display username on dashboard
        document.getElementById('username-display').textContent = loggedInUser;
    }
});

// Logout functionality
const logoutLink = document.getElementById('logout-link');
if (logoutLink) {
    logoutLink.addEventListener('click', function(e) {
        e.preventDefault();
        sessionStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    });
}
