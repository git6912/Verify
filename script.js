// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const userForm = document.getElementById('userForm');
    const verificationForm = document.getElementById('verificationForm');
    const successMessage = document.querySelector('.success-message');
    const progressSteps = document.querySelectorAll('.progress-step');
    const passwordInput = document.getElementById('password');
    const strengthBars = document.querySelectorAll('.strength-bar');
    const resendLink = document.getElementById('resendCode');
    const joinServerBtn = document.getElementById('joinServer');
    
    // Generated code (for simulation)
    let generatedCode = '';
    
    // Password strength indicator
    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        let strength = 0;
        
        if (password.length > 5) strength++;
        if (password.length > 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        // Update strength bars
        strengthBars.forEach((bar, index) => {
            if (index < strength) {
                bar.style.backgroundColor = getStrengthColor(strength);
            } else {
                bar.style.backgroundColor = '#40444b';
            }
        });
    });
    
    function getStrengthColor(strength) {
        if (strength < 2) return '#ed4245';
        if (strength < 4) return '#faa81a';
        return '#3ba55d';
    }
    
    // User form submission
    userForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simple validation
        if (!username || !email || !password) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate sending code to email
        generatedCode = generateRandomCode();
        console.log(`Verification code for ${email}: ${generatedCode}`); // For testing
        
        // Show verification form
        userForm.classList.remove('active');
        verificationForm.classList.add('active');
        
        // Update progress
        progressSteps[0].classList.remove('active');
        progressSteps[1].classList.add('active');
    });
    
    // Verification form submission
    verificationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const codeInput = document.getElementById('code').value;
        
        if (codeInput === generatedCode) {
            // Show success message
            verificationForm.classList.remove('active');
            successMessage.style.display = 'block';
        } else {
            alert('Invalid verification code. Please try again.');
        }
    });
    
    // Resend code
    resendLink.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Generate new code
        generatedCode = generateRandomCode();
        const email = document.getElementById('email').value;
        console.log(`New verification code for ${email}: ${generatedCode}`); // For testing
        
        // Show message
        alert('New verification code sent to your email!');
    });
    
    // Join server button
    joinServerBtn.addEventListener('click', function() {
        alert('Redirecting to Türkizm Discord server...');
        // In a real implementation, this would redirect to the Discord invite
    });
    
    // Generate random 6-digit code
    function generateRandomCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
});
