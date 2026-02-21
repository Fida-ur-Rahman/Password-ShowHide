     document.addEventListener('DOMContentLoaded', function() {
            // Main password toggle
            const togglePassword = document.getElementById('togglePassword');
            const password = document.getElementById('password');
            const passwordIcon = togglePassword.querySelector('i');
            
            // Confirm password toggle
            const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
            const confirmPassword = document.getElementById('confirmPassword');
            const confirmIcon = toggleConfirmPassword.querySelector('i');
            
            // Example toggles
            const exampleToggles = document.querySelectorAll('.example-toggle');
            
            // Strength bar
            const strengthFill = document.getElementById('strengthFill');
            const matchMessage = document.getElementById('matchMessage');
            
            // Toggle main password visibility
            togglePassword.addEventListener('click', function() {
                toggleVisibility(password, passwordIcon);
            });
            
            // Toggle confirm password visibility
            toggleConfirmPassword.addEventListener('click', function() {
                toggleVisibility(confirmPassword, confirmIcon);
            });
            
            // Toggle example fields visibility
            exampleToggles.forEach((toggle, index) => {
                toggle.addEventListener('click', function() {
                    const exampleInput = this.parentElement.querySelector('input');
                    const icon = this.querySelector('i');
                    toggleVisibility(exampleInput, icon);
                });
            });
            
            // Function to toggle visibility
            function toggleVisibility(inputElement, iconElement) {
                if (inputElement.type === 'password') {
                    inputElement.type = 'text';
                    iconElement.classList.remove('fa-eye');
                    iconElement.classList.add('fa-eye-slash');
                    iconElement.parentElement.setAttribute('aria-label', 'Hide password');
                } else {
                    inputElement.type = 'password';
                    iconElement.classList.remove('fa-eye-slash');
                    iconElement.classList.add('fa-eye');
                    iconElement.parentElement.setAttribute('aria-label', 'Show password');
                }
            }
            
            // Check password strength
            password.addEventListener('input', function() {
                const pass = this.value;
                let strength = 0;
                
                // Length check
                if (pass.length >= 8) strength += 25;
                if (pass.length >= 12) strength += 10;
                
                // Complexity checks
                if (/[A-Z]/.test(pass)) strength += 20;
                if (/[a-z]/.test(pass)) strength += 20;
                if (/[0-9]/.test(pass)) strength += 20;
                if (/[^A-Za-z0-9]/.test(pass)) strength += 15;
                
                // Update strength bar
                strengthFill.style.width = Math.min(strength, 100) + '%';
                
                // Update color based on strength
                if (strength < 40) {
                    strengthFill.style.backgroundColor = '#e74c3c'; // Red
                } else if (strength < 70) {
                    strengthFill.style.backgroundColor = '#f39c12'; // Orange
                } else {
                    strengthFill.style.backgroundColor = '#2ecc71'; // Green
                }
                
                // Check if passwords match
                checkPasswordMatch();
            });
            
            // Check if passwords match
            confirmPassword.addEventListener('input', checkPasswordMatch);
            
            function checkPasswordMatch() {
                const pass = password.value;
                const confirm = confirmPassword.value;
                
                if (confirm.length === 0) {
                    matchMessage.textContent = "Passwords must match";
                    matchMessage.style.color = "#888";
                } else if (pass === confirm) {
                    matchMessage.textContent = "✓ Passwords match";
                    matchMessage.style.color = "#2ecc71";
                } else {
                    matchMessage.textContent = "✗ Passwords do not match";
                    matchMessage.style.color = "#e74c3c";
                }
            }
            
            // Initialize strength bar
            strengthFill.style.width = '0%';
            strengthFill.style.backgroundColor = '#e74c3c';
        });
 
 