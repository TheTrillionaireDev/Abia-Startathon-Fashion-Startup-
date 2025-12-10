
// Store users (in a real app, this would be a backend database)
let users = JSON.parse(localStorage.getItem('stylesense_users') || '[]');

// Password strength checker
document.getElementById('password').addEventListener('input', function (e) {
    const password = e.target.value;
    const strengthDiv = document.getElementById('passwordStrength');

    if (password.length === 0) {
        strengthDiv.classList.add('hidden');
        return;
    }

    strengthDiv.classList.remove('hidden');

    let strength = 0;
    const bars = [
        document.getElementById('strength1'),
        document.getElementById('strength2'),
        document.getElementById('strength3'),
        document.getElementById('strength4')
    ];

    // Reset bars
    bars.forEach(bar => {
        bar.className = 'h-1 flex-1 rounded bg-gray-200';
    });

    // Check strength
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const strengthText = document.getElementById('strengthText');
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];

    for (let i = 0; i < strength; i++) {
        bars[i].className = `h-1 flex-1 rounded ${colors[strength - 1]}`;
    }

    strengthText.textContent = `Password strength: ${labels[strength - 1] || 'Weak'}`;
});

// Toggle password visibility
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    field.type = field.type === 'password' ? 'text' : 'password';
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Password validation
function validatePassword(password) {
    const errors = [];
    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain a lowercase letter');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain an uppercase letter');
    }
    if (!/\d/.test(password)) {
        errors.push('Password must contain a number');
    }
    return errors;
}

// Show error message
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

// Hide error message
function hideError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    errorElement.classList.add('hidden');
}

// Toast notification
function showToast(title, message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toastTitle');
    const toastMessage = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    // Set icon based on type
    if (type === 'success') {
        toastIcon.innerHTML = `
                    <svg class="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                `;
    } else if (type === 'error') {
        toastIcon.innerHTML = `
                    <svg class="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                    </svg>
                `;
    } else {
        toastIcon.innerHTML = `
                    <svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                    </svg>
                `;
    }

    toast.classList.remove('translate-x-full');

    setTimeout(() => {
        hideToast();
    }, 5000);
}

function hideToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('translate-x-full');
}

// Handle form submission
async function handleSignup(event) {
    event.preventDefault();

    // Clear previous errors
    hideError('email');
    hideError('password');
    hideError('confirmPassword');

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const termsAccepted = document.getElementById('terms').checked;

    let hasError = false;

    // Validate email
    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        hasError = true;
    }

    // Check if email already exists
    if (users.some(user => user.email === email)) {
        showError('email', 'This email is already registered');
        hasError = true;
    }

    // Validate password
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
        showError('password', passwordErrors[0]);
        hasError = true;
    }

    // Check password match
    if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        hasError = true;
    }

    // Check terms
    if (!termsAccepted) {
        showToast('Error', 'Please accept the Terms of Service', 'error');
        hasError = true;
    }

    if (hasError) return;

    // Show loading state
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoader = document.getElementById('btnLoader');

    submitBtn.disabled = true;
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Create user account
    const newUser = {
        id: Date.now(),
        email: email,
        password: password, // In real app, this would be hashed
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('stylesense_users', JSON.stringify(users));

    // Set current user session
    localStorage.setItem('stylesense_current_user', JSON.stringify({
        id: newUser.id,
        email: newUser.email
    }));

    // Reset button state
    submitBtn.disabled = false;
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');

    // Show success message
    showToast('Success!', 'Your account has been created successfully', 'success');

    // Reset form
    document.getElementById('signupForm').reset();
    document.getElementById('passwordStrength').classList.add('hidden');

    // Redirect after 2 seconds (in real app, would redirect to dashboard)
    setTimeout(() => {
        showToast('Welcome!', 'Redirecting to your dashboard...', 'info');
    }, 2000);
}

// Handle Google signup
function handleGoogleSignup() {
    showToast('Google Sign Up', 'Google authentication would be integrated here', 'info');
    // In a real app, this would initiate OAuth flow with Google
}

// Handle Apple signup
function handleAppleSignup() {
    showToast('Apple Sign Up', 'Apple authentication would be integrated here', 'info');
    // In a real app, this would initiate OAuth flow with Apple
}

// Real-time validation on blur
document.getElementById('email').addEventListener('blur', function (e) {
    const email = e.target.value.trim();
    if (email && !validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
    } else if (email && users.some(user => user.email === email)) {
        showError('email', 'This email is already registered');
    } else {
        hideError('email');
    }
});

document.getElementById('confirmPassword').addEventListener('blur', function (e) {
    const password = document.getElementById('password').value;
    const confirmPassword = e.target.value;

    if (confirmPassword && password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
    } else {
        hideError('confirmPassword');
    }
});
