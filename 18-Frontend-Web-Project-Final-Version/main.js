// Function to hide all sections and show the requested one
function showSection(sectionId) {
    // Get all sections
    const sections = document.querySelectorAll('section');

    // Hide all sectionsz
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}

// Function to check if the user is allowed to access a section
function checkAccess(sectionId) {
    if (sectionId === 'login' || sectionId === 'register') {
        // Always allow access to login and register pages
        showSection(sectionId);
    } else if (localStorage.getItem('isLoggedIn') === 'true') {
        // Allow access if user is logged in
        showSection(sectionId);
    } else {
        // Redirect to login if not logged in
        alert("Please log in to access this page.");
        showSection('login');
    }
}

// Start with the correct section based on login status when the site loads
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        showSection('home'); // Show home if already logged in
    } else {
        showSection('login'); // Show login if not logged in
    }
});

// Function to validate login form
function validateLogin(username, password) {
    const usernameRegex = /^[a-zA-Z0-9]{5,}$/; // At least 5 alphanumeric characters
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,}$/; // At least 6 characters

    const adminTab = document.getElementById("admin-nav");

    if(username == "admin" && password == "admin") {
            adminTab.style = "display: inline";
            return true;
        }
        else {
            adminTab.style = "display: none";
        }

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format
    const usernameValid = validateLogin(username, password); // Reuse login validation for username and password

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    return usernameValid;
}

// Handle the login functionality with validation
document.querySelector('#login form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate login inputs
    if (validateLogin(username, password)) {
        localStorage.setItem('isLoggedIn', 'true'); // Set user as logged in
        showSection('home'); // Redirect to home after successful login
    }
});

// Handle the register functionality with validation
document.querySelector('#register form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission

    const regUsername = document.getElementById('regUsername').value;
    const regEmail = document.getElementById('regEmail').value;
    const regPassword = document.getElementById('regPassword').value;

    // Validate register inputs
    if (validateRegister(regUsername, regEmail, regPassword)) {
        alert("Registration successful!");
        showSection('login'); // Redirect to login after successful registration
    }
});

// Handle the logout functionality
function handleLogout() {
    localStorage.removeItem('isLoggedIn'); // Remove login state

    const adminTab = document.getElementById("admin-nav");
    adminTab.style = "display: none";

    showSection('login'); // Redirect to login page
}
// Add event listener for logout button
document.querySelector('a[href="#"]').addEventListener('click', handleLogout);

// Attach event listeners to navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const sectionId = this.getAttribute('onclick').match(/'(.+?)'/)[1];
        checkAccess(sectionId);
    });
});

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


//admin controls
function removeBooking(button) {

    const row = button.parentElement.parentElement; //to get to the parent <tr>
    row.remove();
}

function addBooking() {

    const table = document.getElementById('bookingTableContent');
    const newRow = table.insertRow();

    const id = document.getElementById('newId').value;
    const date = document.getElementById('newDate').value;
    const description = document.getElementById('newDescription').value;
    const status = document.getElementById('newStatus').value;

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);

    cell1.innerHTML = id;
    cell2.innerHTML = date;
    cell3.innerHTML = description;
    cell4.innerHTML = status;
    cell5.innerHTML = `<button onclick="removeBooking(this)"><img src="./images/delete-icon.png" alt="Remove" style="width: 20px; height: 20px;"></button>`;

    document.getElementById('newId').value = '';
    document.getElementById('newDate').value = '';
    document.getElementById('newDescription').value = '';
    document.getElementById('newStatus').value = 'Pending';
}
function sendMessage() {
    // Display an alert message
    alert('Your message was sent successfully!');
    
    // Optionally, you can add more code here to handle form submission if needed
    
    // Prevent the default link action
    return false;
}

    document.getElementById('menuButton').onclick = function() {
        var menuTable = document.getElementById('menuTable');
        if (menuTable.style.display === "none") {
            menuTable.style.display = "block";
        } else {
            menuTable.style.display = "none";
        }
    }


