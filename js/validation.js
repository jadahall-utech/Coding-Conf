// Validate registration details before creating a ticket

// Get the form, inputs and error spans
const fullnameInput = document.getElementById('fullname');
const fullnameError = document.getElementById('fullname-error');

const registrationForm = document.getElementById('registration-form');

const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');

const githubInput = document.getElementById('github');
const githubError = document.getElementById('github-error');

const avatarInput = document.getElementById('avatar');
const avatarError = document.getElementById('avatar-error');

// Check each field when the form is submitted
registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let isValid = true;

    // Check the full name
    const fullname = fullnameInput.value.trim();

    if (fullname === '') {
        fullnameError.textContent = 'Please enter your full name.';
        isValid = false;
    } else {
        fullnameError.textContent = '';
    }

    // Check the email address
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    } else {
        emailError.textContent = '';
    }

    // Check the GitHub handle
    const github = githubInput.value.trim();

    if (!github.startsWith('@') || github.length <= 1) {
        githubError.textContent = 'Handle must start with @ (e.g. @username).';
        isValid = false;
    } else {
        githubError.textContent = '';
    }

    // Check the uploaded avatar
    const avatarFile = avatarInput.files[0];

    if (!avatarFile) {
        avatarError.textContent = 'Please upload an avatar.';
        isValid = false;
    } else if (avatarFile.type !== 'image/png' && avatarFile.type !== 'image/jpeg') {
        avatarError.textContent = 'Avatar must be a JPEG or PNG image.';
        isValid = false;
    } else if (avatarFile.size > 500 * 1024) {
        avatarError.textContent = 'Avatar must be smaller than 500KB.';
        isValid = false;
    } else {
        avatarError.textContent = '';
    }

    // Save valid details and open the ticket
    if (isValid) {
        const reader = new FileReader();
        reader.onload = function() {
            // Stop if the avatar could not be read
            if (typeof reader.result !== 'string') {
                avatarError.textContent = 'Could not read the avatar. Please try again.';
                return;
            }

            // Save the registration for the ticket page
            localStorage.setItem('fullname', fullname);
            localStorage.setItem('email', email);
            localStorage.setItem('github', github);
            localStorage.setItem('avatar', reader.result);
            localStorage.removeItem('serial');
            window.location.href = 'ticket.html';
        };
        reader.onerror = function() {
            avatarError.textContent = 'Could not read the avatar. Please try again.';
        };
        reader.readAsDataURL(avatarFile);
    }
});
