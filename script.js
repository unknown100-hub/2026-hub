// Title click animation
const title = document.getElementById("title");
let isAnimated = false;

title.addEventListener("click", function() {
    if (!isAnimated) {
        title.style.animation = "spin 0.6s ease-in-out";
        setTimeout(() => {
            document.getElementById("title").innerHTML = "track your learning journey";
            title.style.animation = "spinBack 0.6s ease-in-out";
        }, 300);
        isAnimated = true;
    }
});

// Toggle between Login and Sign Up
const toggleSignupLink = document.getElementById("toggle-signup");
const toggleLoginLink = document.getElementById("toggle-login");
const loginContainer = document.querySelector(".login-container");
const signupContainer = document.getElementById("signup-container");

toggleSignupLink.addEventListener("click", function(e) {
    e.preventDefault();
    loginContainer.style.display = "none";
    signupContainer.style.display = "flex";
    signupContainer.classList.add("fade-in");
});

toggleLoginLink.addEventListener("click", function(e) {
    e.preventDefault();
    signupContainer.style.display = "none";
    loginContainer.style.display = "flex";
    loginContainer.classList.add("fade-in");
});

// Login Form submission
const loginForm = document.querySelector(".login-box:not(.signup-box)");
loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    
    if (username && password) {
        // Show success animation
        const btn = loginForm.querySelector(".login-btn");
        btn.innerHTML = "✓ Logging in...";
        btn.style.background = "linear-gradient(135deg, #52c41a 0%, #52c41a 100%)";
        
        setTimeout(() => {
            // Store username in session storage
            sessionStorage.setItem("loggedInUser", username);
            // Redirect to dashboard
            window.location.href = "dashboard.html";
        }, 1500);
    } else {
        alert("Please fill in all fields!");
    }
});

// Sign Up Form submission
const signupForm = document.querySelector(".signup-box");
signupForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const fullName = document.getElementById("signup-username").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const username = document.getElementById("signup-username-field").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const confirmPassword = document.getElementById("signup-confirm-password").value.trim();
    const agreeTerms = document.getElementById("agree-terms").checked;
    
    if (!fullName || !email || !username || !password || !confirmPassword) {
        alert("Please fill in all fields!");
        return;
    }
    
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    
    if (!agreeTerms) {
        alert("Please agree to the Terms and Conditions!");
        return;
    }
    
    if (password.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
    }
    
    // Show success animation
    const btn = signupForm.querySelector(".signup-btn");
    btn.innerHTML = "✓ Account Created!";
    btn.style.background = "linear-gradient(135deg, #52c41a 0%, #52c41a 100%)";
    
    setTimeout(() => {
        // Store username in session storage
        sessionStorage.setItem("loggedInUser", username);
        // Redirect to dashboard
        window.location.href = "dashboard.html";
        btn.innerHTML = "Create Account";
        btn.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
        
        // Switch to login form
        signupContainer.style.display = "none";
        loginContainer.style.display = "flex";
    }, 1500);
});

// Add spin animation to CSS dynamically
const style = document.createElement("style");
style.innerHTML = `
    @keyframes spin {
        to { transform: rotateY(90deg); }
    }
    @keyframes spinBack {
        from { transform: rotateY(90deg); }
        to { transform: rotateY(0deg); }
    }
`;
document.head.appendChild(style);