// Function to hide all sections and show the requested one
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

// Function to check if the user is allowed to access a section
function checkAccess(sectionId) {
    if (sectionId === 'login' || sectionId === 'register') {
        showSection(sectionId);
    } else if (localStorage.getItem('isLoggedIn') === 'true') {
        showSection(sectionId);
    } else {
        alert("Please log in to access this page.");
        showSection('login');
    }
}

// Start with the correct section based on login status when the site loads
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showSection('home');
    } else {
        showSection('login');
    }
});

// Handle the login functionality with validation
document.querySelector('#login form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (validateLogin(username, password)) {
        localStorage.setItem('isLoggedIn', 'true');
        showSection('home');
    }
});

// Handle the register functionality with validation
document.querySelector('#register form').addEventListener('submit', function (e) {
    e.preventDefault();

    const regUsername = document.getElementById('regUsername').value;
    const regEmail = document.getElementById('regEmail').value;
    const regPassword = document.getElementById('regPassword').value;

    if (validateRegister(regUsername, regEmail, regPassword)) {
        alert("Registration successful!");
        showSection('login');
    }
});

// Function to validate login form
function validateLogin(username, password) {
    const usernameRegex = /^[a-zA-Z0-9]{5,}$/;
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,}$/;

    if (!usernameRegex.test(username)) {
        alert("Username must be at least 5 characters long and contain only letters and numbers.");
        return false;
    }

    if (!passwordRegex.test(password)) {
        alert("Password must be at least 6 characters long and contain valid characters.");
        return false;
    }

    return true;
}

// Function to validate register form
function validateRegister(username, email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameValid = validateLogin(username, password);

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    return usernameValid;
}

// Handle the logout functionality
function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    showSection('login');
}

// Attach event listeners to navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const sectionId = this.getAttribute('onclick').match(/'(.+?)'/)[1];
        checkAccess(sectionId);
    });
});

// Slideshow functionality
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
